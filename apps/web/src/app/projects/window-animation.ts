export type Box = Pick<DOMRect, "left" | "top" | "width" | "height">;

const EASING = "cubic-bezier(.2,.8,.2,1)";

function getAnimationOptions(): KeyframeAnimationOptions {
	const prefersReducedMotion = matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;
	return { duration: prefersReducedMotion ? 1 : 250, easing: EASING };
}

function getTransformBetween(target: Box, origin: Box) {
	return `translate(${target.left - origin.left}px, ${target.top - origin.top}px) scale(${target.width / origin.width}, ${target.height / origin.height})`;
}

export function growFrom(element: HTMLElement, source: Box) {
	element.animate(
		[
			{
				transform: getTransformBetween(source, element.getBoundingClientRect()),
				opacity: 0.6,
			},
			{ transform: "none", opacity: 1 },
		],
		getAnimationOptions(),
	);
}

export function shrinkTo(element: HTMLElement, target: Box, opacity: number) {
	return element.animate(
		[
			{ transform: "none", opacity: 1 },
			{
				transform: getTransformBetween(target, element.getBoundingClientRect()),
				opacity,
			},
		],
		{ ...getAnimationOptions(), fill: "forwards" },
	).finished;
}

export function shrinkInPlace(element: HTMLElement) {
	const { left, top, width, height } = element.getBoundingClientRect();
	return shrinkTo(
		element,
		{
			left: left + width * 0.02,
			top: top + height * 0.02,
			width: width * 0.96,
			height: height * 0.96,
		},
		0,
	);
}

export function fadeIn(element: HTMLElement) {
	element.animate([{ opacity: 0 }, { opacity: 1 }], getAnimationOptions());
}

export function fadeOut(element: HTMLElement) {
	return element.animate([{ opacity: 1 }, { opacity: 0 }], {
		...getAnimationOptions(),
		fill: "forwards",
	}).finished;
}

export function cancelAnimations(...elements: HTMLElement[]) {
	for (const element of elements) {
		for (const animation of element.getAnimations()) animation.cancel();
	}
}
