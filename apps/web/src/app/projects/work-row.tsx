import { cn } from "@thalles-me/ui/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { AppIcon } from "@/components/grouped-list/app-icon";
import type { BrowserWorkProject, WorkProject } from "@/content/projects-work";

import { BrowserPreview } from "./browser-preview";
import { PhonePreview } from "./phone-preview";
import { WorkScreen } from "./work-screen";

export type WorkRowAnchors = {
	card: HTMLElement;
	title: HTMLAnchorElement;
};

const popoverPlacement: Record<WorkProject["kind"], string> = {
	browser:
		"md:right-5 md:bottom-[calc(100%-12px)] md:origin-bottom-right md:translate-y-1.5 md:scale-98 md:data-[state=open]:translate-y-0 md:data-[state=open]:scale-100",
	phone:
		"md:top-1/2 md:right-5 md:origin-right md:translate-y-[calc(-50%+6px)] md:scale-98 md:data-[state=open]:-translate-y-1/2 md:data-[state=open]:scale-100 min-[1300px]:right-[-252px] min-[1300px]:origin-left",
};

type WindowAction = (
	project: BrowserWorkProject,
	anchors: WorkRowAnchors,
) => void;

export type WorkRowProps = {
	project: WorkProject;
	isPreviewShown: boolean;
	isPinned: boolean;
	onHoverChange: (name: string, isHovered: boolean) => void;
	onFocusChange: (name: string, isFocused: boolean) => void;
	onTogglePin: (name: string) => void;
	onZoom: WindowAction;
	onMinimize: WindowAction;
	onClose: WindowAction;
};

export function WorkRow({
	project,
	isPreviewShown,
	isPinned,
	onHoverChange,
	onFocusChange,
	onTogglePin,
	onZoom,
	onMinimize,
	onClose,
}: WorkRowProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLAnchorElement>(null);
	const [isScreenRequested, setIsScreenRequested] = useState(false);

	const screen = isScreenRequested && <WorkScreen screen={project.screen} />;

	function handleWindowAction(
		browserProject: BrowserWorkProject,
		action: "zoom" | "minimize" | "close",
	) {
		const card = cardRef.current;
		const title = titleRef.current;
		if (!card || !title) return;

		const handleAction = { zoom: onZoom, minimize: onMinimize, close: onClose }[
			action
		];
		handleAction(browserProject, { card, title });
	}

	function handlePointerEnter(event: React.PointerEvent) {
		setIsScreenRequested(true);
		if (event.pointerType === "mouse") onHoverChange(project.name, true);
	}

	function handlePointerLeave(event: React.PointerEvent) {
		if (event.pointerType === "mouse") onHoverChange(project.name, false);
	}

	function handleFocus(event: React.FocusEvent) {
		setIsScreenRequested(true);
		if (event.target.matches(":focus-visible"))
			onFocusChange(project.name, true);
	}

	function handleBlur(event: React.FocusEvent<HTMLElement>) {
		if (!event.currentTarget.contains(event.relatedTarget))
			onFocusChange(project.name, false);
	}

	return (
		<article
			aria-label={project.name}
			onPointerEnter={handlePointerEnter}
			onPointerLeave={handlePointerLeave}
			onFocus={handleFocus}
			onBlur={handleBlur}
			className="group/work relative flex items-center gap-4 px-5"
		>
			<button
				type="button"
				aria-label={`Preview ${project.name}`}
				aria-expanded={isPinned}
				onClick={() => onTogglePin(project.name)}
				className="absolute inset-0 cursor-default rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
			/>
			{project.kind === "phone" ? (
				<Image
					src={project.appIconSrc}
					alt=""
					width={52}
					height={52}
					className="size-[52px] shrink-0 rounded-[12px] shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.14)]"
				/>
			) : (
				<AppIcon>
					<Image src={project.glyphSrc} alt="" width={28} height={28} />
				</AppIcon>
			)}
			<div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 border-border border-b-[0.5px] py-4 group-last/work:border-b-0 sm:flex-row sm:items-center sm:gap-6">
				<div className="min-w-0 flex-1">
					<a
						ref={titleRef}
						href={project.url}
						className="relative block w-fit font-semibold text-[17px] tracking-[-0.01em] underline-offset-3 hover:underline"
					>
						{project.name}
					</a>
					<p className="mt-0.5 text-[15px] text-muted-foreground leading-[1.4]">
						{project.description}
					</p>
				</div>
				<a
					href={project.url}
					className="relative inline-flex shrink-0 items-center gap-1 text-link text-sm underline-offset-3 hover:underline"
				>
					{project.domain}
					<ArrowUpRight aria-hidden className="size-4" />
				</a>
			</div>
			<div
				ref={cardRef}
				inert={!isPreviewShown}
				data-state={isPreviewShown ? "open" : "closed"}
				className={cn(
					"pointer-events-none absolute z-20 opacity-0 transition-[opacity,translate,scale] duration-180 ease-out data-[state=open]:pointer-events-auto data-[state=open]:opacity-100 motion-reduce:transition-none",
					"max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:z-[70] max-md:flex max-md:translate-y-full max-md:justify-center max-md:rounded-t-[28px] max-md:bg-card max-md:px-5 max-md:pt-6 max-md:pb-[max(2rem,env(safe-area-inset-bottom))] max-md:data-[state=open]:translate-y-0",
					popoverPlacement[project.kind],
				)}
			>
				{project.kind === "phone" ? (
					<PhonePreview project={project}>{screen}</PhonePreview>
				) : (
					<BrowserPreview
						project={project}
						onClose={() => handleWindowAction(project, "close")}
						onMinimize={() => handleWindowAction(project, "minimize")}
						onZoom={() => handleWindowAction(project, "zoom")}
					>
						{screen}
					</BrowserPreview>
				)}
			</div>
			{isPreviewShown && (
				<button
					type="button"
					aria-label="Close preview"
					onClick={() => onTogglePin(project.name)}
					className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-[6px] md:hidden"
				/>
			)}
		</article>
	);
}
