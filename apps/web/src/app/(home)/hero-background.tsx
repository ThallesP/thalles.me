"use client";

const DOT_SPACING_PX = 9;
const STILL_FRAME_S = 34;
const BEAM_COS = Math.cos(-0.52);
const BEAM_SIN = Math.sin(-0.52);
const POINTER_GLOW_RADIUS_PX = 120;
const POINTER_PUSH_PX = 7;
const POINTER_EASING = 0.12;

type Pointer = {
	x: number;
	y: number;
	strength: number;
};

function hash(x: number, y: number) {
	const seed = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
	return seed - Math.floor(seed);
}

function smoothstep(t: number) {
	return t * t * (3 - 2 * t);
}

function valueNoise(x: number, y: number) {
	const xi = Math.floor(x);
	const yi = Math.floor(y);
	const xf = smoothstep(x - xi);
	const yf = smoothstep(y - yi);
	const a = hash(xi, yi);
	const b = hash(xi + 1, yi);
	const c = hash(xi, yi + 1);
	const d = hash(xi + 1, yi + 1);
	return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
}

function fractalNoise(x: number, y: number) {
	return (
		valueNoise(x, y) * 0.6 +
		valueNoise(x * 2.1, y * 2.1) * 0.3 +
		valueNoise(x * 4.3, y * 4.3) * 0.1
	);
}

function textBoxProximity(
	x: number,
	y: number,
	widthPx: number,
	heightPx: number,
) {
	const dx = Math.max(widthPx / 2 - 400 - x, 0, x - widthPx / 2 - 330);
	const dy = Math.max(70 - y, 0, y - heightPx + 42);
	return Math.max(0, 1 - Math.hypot(dx, dy) / 140);
}

function drawHalftone(
	context: CanvasRenderingContext2D,
	widthPx: number,
	heightPx: number,
	timeS: number,
	pointer: Pointer,
) {
	context.clearRect(0, 0, widthPx, heightPx);
	const beamCenterPx = (((timeS * 0.03) % 1.7) - 0.35) * widthPx;

	for (let y = DOT_SPACING_PX / 2; y < heightPx; y += DOT_SPACING_PX) {
		const fade = Math.min(1, Math.max(0, 1 - (y / heightPx - 0.45) / 0.5));
		for (let x = DOT_SPACING_PX / 2; x < widthPx; x += DOT_SPACING_PX) {
			const across = x * BEAM_COS + y * BEAM_SIN - beamCenterPx;
			const along = -x * BEAM_SIN + y * BEAM_COS;
			const streak = fractalNoise(along * 0.0025 + timeS * 0.1, across * 0.02);
			const beam = Math.exp(-((across / 160) ** 2));
			const glow = Math.exp(-((across / 460) ** 2));
			const pointerDx = x - pointer.x;
			const pointerDy = y - pointer.y;
			const pointerDistancePx = Math.hypot(pointerDx, pointerDy) || 1;
			const pointerFalloff =
				Math.exp(-((pointerDistancePx / POINTER_GLOW_RADIUS_PX) ** 2)) *
				pointer.strength;
			const intensity = Math.min(
				1,
				(beam * (0.2 + streak * 0.9) + glow * (0.1 + streak * 0.3)) *
					fade *
					(1 - 0.65 * textBoxProximity(x, y, widthPx, heightPx)) +
					pointerFalloff * 0.55 * Math.max(fade, 0.35),
			);
			const radiusPx = Math.sqrt(intensity) * DOT_SPACING_PX * 0.48;
			if (radiusPx < 0.35) continue;

			const pushPx = pointerFalloff * POINTER_PUSH_PX;
			context.fillStyle = `rgba(229, 229, 234, ${0.22 + intensity * 0.55})`;
			context.beginPath();
			context.arc(
				x + (pointerDx / pointerDistancePx) * pushPx,
				y + (pointerDy / pointerDistancePx) * pushPx,
				radiusPx,
				0,
				Math.PI * 2,
			);
			context.fill();
		}
	}
}

function animateHalftone(canvas: HTMLCanvasElement) {
	const context = canvas.getContext("2d");
	if (!context) return;

	const isMotionReduced = matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;
	const startedAtMs = performance.now() - STILL_FRAME_S * 1_000;
	const pointer: Pointer = { x: 0, y: 0, strength: 0 };
	const target = { x: 0, y: 0, isInside: false };
	let frameId = 0;

	const draw = (nowMs: number) => {
		const timeS = isMotionReduced
			? STILL_FRAME_S
			: (nowMs - startedAtMs) / 1_000;
		drawHalftone(
			context,
			canvas.clientWidth,
			canvas.clientHeight,
			timeS,
			pointer,
		);
	};
	const tick = (nowMs: number) => {
		pointer.x += (target.x - pointer.x) * POINTER_EASING;
		pointer.y += (target.y - pointer.y) * POINTER_EASING;
		pointer.strength +=
			((target.isInside ? 1 : 0) - pointer.strength) * POINTER_EASING;
		draw(nowMs);
		frameId = requestAnimationFrame(tick);
	};
	const resizeObserver = new ResizeObserver(() => {
		const { devicePixelRatio } = window;
		canvas.width = canvas.clientWidth * devicePixelRatio;
		canvas.height = canvas.clientHeight * devicePixelRatio;
		context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
		draw(performance.now());
	});

	const handlePointerMove = (event: PointerEvent) => {
		const rect = canvas.getBoundingClientRect();
		target.x = event.clientX - rect.left;
		target.y = event.clientY - rect.top;
		target.isInside =
			target.x >= 0 &&
			target.y >= 0 &&
			target.x <= rect.width &&
			target.y <= rect.height;
		if (pointer.strength < 0.01) {
			pointer.x = target.x;
			pointer.y = target.y;
		}
	};
	const handlePointerLeave = () => {
		target.isInside = false;
	};

	resizeObserver.observe(canvas);
	if (!isMotionReduced) {
		frameId = requestAnimationFrame(tick);
		window.addEventListener("pointermove", handlePointerMove, {
			passive: true,
		});
		document.documentElement.addEventListener(
			"pointerleave",
			handlePointerLeave,
		);
	}

	return () => {
		cancelAnimationFrame(frameId);
		resizeObserver.disconnect();
		window.removeEventListener("pointermove", handlePointerMove);
		document.documentElement.removeEventListener(
			"pointerleave",
			handlePointerLeave,
		);
	};
}

export function HeroBackground() {
	return (
		<canvas
			ref={animateHalftone}
			aria-hidden
			className="absolute inset-0 block size-full"
		/>
	);
}
