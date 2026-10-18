import { Section } from "@/components/section/section";
import { railwayTemplates } from "@/content/projects-templates";

import { TemplateCard } from "./template-card";

export type TemplatesSectionProps = {
	deploysByCode: Record<string, number>;
};

export function TemplatesSection({ deploysByCode }: TemplatesSectionProps) {
	const templates = railwayTemplates
		.map((template) => ({ ...template, deploys: deploysByCode[template.code] }))
		.toSorted((a, b) => b.deploys - a.deploys);
	const totalDeploys = templates.reduce((sum, { deploys }) => sum + deploys, 0);

	return (
		<Section
			title="Railway templates"
			action={
				<a
					href="https://github.com/ThallesP/railway-templates"
					className="text-[15px] text-link"
				>
					Source on GitHub
				</a>
			}
		>
			<p className="mx-1 -mt-1.5 mb-4 text-[15px] text-muted-foreground">
				{templates.length} templates, deployed{" "}
				{totalDeploys.toLocaleString("en-US")} times.
			</p>
			<div className="relative mr-[calc(-1*max(1.25rem,(100vw_-_760px)/2_+_1.25rem))] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-10 after:bg-linear-to-r after:from-transparent after:to-background sm:after:w-[140px]">
				<ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto pr-10 [scrollbar-width:none] sm:pr-[140px] [&::-webkit-scrollbar]:hidden">
					{templates.map((template) => (
						<li key={template.code} className="shrink-0 snap-start">
							<TemplateCard template={template} deploys={template.deploys} />
						</li>
					))}
				</ul>
			</div>
		</Section>
	);
}
