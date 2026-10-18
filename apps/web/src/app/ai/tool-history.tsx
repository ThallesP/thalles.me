import { toolHistory } from "@/content/ai-history";

export function ToolHistory() {
	return (
		<>
			<p className="px-1 pb-4 text-body leading-normal">
				How I got to the setup above, in order.
			</p>
			<ol className="rounded-xl bg-card px-6 py-2">
				{toolHistory.map((step) => (
					<li
						key={step.name}
						className="group/step grid grid-cols-[22px_1fr] gap-x-3.5"
					>
						<div className="relative flex justify-center before:absolute before:inset-y-0 before:w-0.5 before:bg-rail group-first/step:before:top-[22px] group-last/step:before:bottom-[calc(100%-22px)]">
							<span className="relative mt-[17px] size-2.5 rounded-full bg-dot shadow-[0_0_0_4px_var(--card)] group-last/step:bg-foreground group-last/step:shadow-[0_0_0_4px_var(--card),0_0_0_6px_rgb(245_245_247/0.25)]" />
						</div>
						<div className="border-border border-b-[0.5px] py-3 group-last/step:border-b-0">
							<div className="font-semibold text-[17px] tracking-[-0.01em]">
								{step.name}
							</div>
							<div className="mt-0.5 text-[15px] text-muted-foreground leading-[1.45]">
								{step.description}
							</div>
						</div>
					</li>
				))}
			</ol>
		</>
	);
}
