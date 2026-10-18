"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import type { PhoneWorkProject } from "@/content/projects-work";

export type PhonePreviewProps = {
	project: PhoneWorkProject;
};

export function PhonePreview({ project }: PhonePreviewProps) {
	const scrollerRef = useRef<HTMLElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const [thumb, setThumb] = useState({ heightPx: 30, offsetPx: 0 });

	function syncThumb() {
		const scroller = scrollerRef.current;
		const track = trackRef.current;
		if (!scroller || !track) return;

		const { scrollTop, scrollHeight, clientHeight } = scroller;
		const heightPx = Math.max(
			24,
			track.clientHeight * (clientHeight / Math.max(1, scrollHeight)),
		);
		const progress = scrollTop / Math.max(1, scrollHeight - clientHeight);
		setThumb({
			heightPx,
			offsetPx: (track.clientHeight - heightPx) * progress,
		});
	}

	return (
		<div className="h-[548px] w-[264px] rounded-[46px] bg-[#0a0a0b] p-[7px] shadow-[inset_0_0_0_1.5px_#3a3a3c,0_0_0_0.5px_rgb(255_255_255/0.08),0_30px_80px_rgb(0_0_0/0.7),0_6px_18px_rgb(0_0_0/0.5)]">
			<div className="relative size-full overflow-hidden rounded-[37px] bg-black">
				<div
					aria-hidden
					className="absolute inset-x-0 top-0 z-2 flex h-11 items-center justify-between bg-black pt-0.5 pr-6 pl-[30px] font-semibold text-sm text-white tracking-[-0.01em]"
				>
					<span>9:41</span>
					<span className="flex items-center gap-1.5">
						<span className="flex h-2.5 items-end gap-[1.5px]">
							<i className="h-1 w-[3px] rounded-[1px] bg-white" />
							<i className="h-1.5 w-[3px] rounded-[1px] bg-white" />
							<i className="h-2 w-[3px] rounded-[1px] bg-white" />
							<i className="h-2.5 w-[3px] rounded-[1px] bg-white" />
						</span>
						<span className="relative h-[11px] w-[22px] rounded-[3.5px] border border-white/45 p-[1.5px] after:absolute after:top-[3px] after:-right-[3.5px] after:h-1 after:w-[1.5px] after:rounded-r-[1px] after:bg-white/45">
							<span className="block h-full w-4/5 rounded-[1.5px] bg-white" />
						</span>
					</span>
				</div>
				<div
					aria-hidden
					className="absolute top-2.5 left-1/2 z-3 h-[26px] w-[88px] -translate-x-1/2 rounded-[14px] bg-black shadow-[0_0_0_0.5px_rgb(255_255_255/0.06)]"
				/>
				<section
					ref={scrollerRef}
					aria-label={`${project.name} iPhone app, scrollable`}
					onScroll={syncThumb}
					className="absolute inset-x-0 top-11 bottom-0 overflow-y-auto overscroll-contain outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset [&::-webkit-scrollbar]:hidden"
				>
					<Image
						src={project.screens.src}
						alt={project.screens.alt}
						width={project.screens.width}
						height={project.screens.height}
						sizes="250px"
						onLoad={syncThumb}
						className="block h-auto w-full"
					/>
				</section>
				<div
					ref={trackRef}
					aria-hidden
					className="pointer-events-none absolute top-[52px] right-[3px] bottom-6 z-3 w-[3px]"
				>
					<i
						className="absolute inset-x-0 top-0 rounded-[2px] bg-white/55"
						style={{
							height: thumb.heightPx,
							transform: `translateY(${thumb.offsetPx}px)`,
						}}
					/>
				</div>
				<div
					aria-hidden
					className="absolute bottom-2 left-1/2 z-3 h-1 w-[100px] -translate-x-1/2 rounded-[2px] bg-white/75"
				/>
			</div>
		</div>
	);
}
