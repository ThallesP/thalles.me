import { Section } from "@/components/section/section";
import { workProjects } from "@/content/projects-work";

import { WorkList } from "./work-list";

export function WorkSection() {
	return (
		<Section title="Work">
			<WorkList projects={workProjects} />
		</Section>
	);
}
