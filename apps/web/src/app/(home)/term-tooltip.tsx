"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@thalles-me/ui/components/tooltip";
import { useId, useState } from "react";

export type TermTooltipProps = {
	label: string;
	title: string;
	definition: string;
};

export function TermTooltip({ label, title, definition }: TermTooltipProps) {
	const [isOpen, setIsOpen] = useState(false);
	const definitionId = useId();

	return (
		<Tooltip open={isOpen} onOpenChange={setIsOpen}>
			<TooltipTrigger
				delay={0}
				closeOnClick={false}
				onClick={() => setIsOpen(true)}
				aria-describedby={definitionId}
				className="cursor-help rounded-xs font-semibold text-foreground underline decoration-[1.5px] decoration-foreground/55 decoration-dotted underline-offset-4 focus-visible:outline-2 focus-visible:outline-link focus-visible:outline-offset-3"
			>
				{label}
			</TooltipTrigger>
			<span id={definitionId} hidden>
				{definition}
			</span>
			<TooltipContent
				side="bottom"
				align="start"
				alignOffset={-8}
				sideOffset={12}
				className="block w-80 max-w-[calc(100vw-2rem)] rounded-[14px] bg-card-raised px-3.5 py-3 font-normal text-[15px] text-body leading-[1.45] tracking-normal shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.14),0_14px_36px_rgb(0_0_0/0.55)] backdrop-blur-xl [&>[data-side]]:bg-card-raised [&>[data-side]]:fill-card-raised"
			>
				<b className="mb-0.75 block font-semibold text-[13px] text-muted-foreground">
					{title}
				</b>
				{definition}
			</TooltipContent>
		</Tooltip>
	);
}
