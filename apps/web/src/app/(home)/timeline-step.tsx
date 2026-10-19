import { cn } from "@thalles-me/ui/lib/utils";

import type { TimelineStep as TimelineStepContent } from "@/content/home-timeline";

import { TermTooltip } from "./term-tooltip";

export type TimelineStepProps = {
	step: TimelineStepContent;
	isCurrent: boolean;
};

export function TimelineStep({ step, isCurrent }: TimelineStepProps) {
	const { period, title, description, projects } = step;
	const hasProjects = projects.length > 0;

	return (
		<li className="group/step grid grid-cols-[66px_22px_1fr] gap-x-2 sm:grid-cols-[92px_22px_1fr] sm:gap-x-3.5">
			<div className="whitespace-nowrap py-[18px] text-right text-[13px] text-muted-foreground tabular-nums sm:text-sm">
				{period}
			</div>
			<div
				aria-hidden
				className="relative flex justify-center before:absolute before:inset-y-0 before:w-0.5 before:bg-rail group-first/step:before:top-[26px] group-last/step:before:bottom-[calc(100%-26px)]"
			>
				<span
					className={cn(
						"relative mt-[21px] size-2.5 rounded-full bg-dot shadow-[0_0_0_4px_var(--color-card)]",
						isCurrent &&
							"bg-foreground shadow-[0_0_0_4px_var(--color-card),0_0_0_6px_rgb(245_245_247/0.25)]",
					)}
				/>
			</div>
			<div className="min-w-0 border-border border-b-[0.5px] py-4 group-last/step:border-b-0">
				<h3 className="font-semibold text-[17px] tracking-[-0.01em]">
					{title}
				</h3>
				<p className="mt-0.5 text-[15px] text-muted-foreground leading-[1.45]">
					{description.map((segment) =>
						typeof segment === "string" ? (
							segment
						) : (
							<TermTooltip key={segment.label} {...segment} />
						),
					)}
				</p>
				{hasProjects && (
					<ul className="mt-3 rounded-[14px] bg-card-raised px-3.5 py-1">
						{projects.map(({ name, description }) => (
							<li
								key={name}
								className="flex flex-col border-border border-b-[0.5px] py-2.5 last:border-b-0"
							>
								<span className="font-semibold text-[15px]">{name}</span>
								<span className="text-muted-foreground text-sm leading-[1.4]">
									{description}
								</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</li>
	);
}
