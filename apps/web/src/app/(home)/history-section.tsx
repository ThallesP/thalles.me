import { Section } from "@/components/section/section";
import { timeline } from "@/content/home-timeline";

import { TimelineStep } from "./timeline-step";

export function HistorySection() {
	return (
		<Section
			id="history"
			title="How I got here"
			action={
				<a
					href="https://www.linkedin.com/in/thalles-passos"
					className="text-[15px] text-link"
				>
					LinkedIn
				</a>
			}
		>
			<p className="px-1 pb-4 text-body leading-normal">
				It started with Minecraft, and it didn't go well.
			</p>
			<ol className="rounded-xl bg-card px-3.5 py-2 sm:px-6">
				{timeline.map((step, index) => (
					<TimelineStep
						key={step.title}
						step={step}
						isCurrent={index === timeline.length - 1}
					/>
				))}
			</ol>
		</Section>
	);
}
