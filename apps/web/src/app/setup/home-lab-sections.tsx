import { Section } from "@/components/section/section";
import type { HomeLabSnapshot } from "@/entities/home-lab-stats";

import { CodeFlowDiagram } from "./code-flow-diagram";
import { getHomeLabStatus } from "./home-lab-status";
import { RunningOnTheBox } from "./running-on-the-box";

export type HomeLabSectionsProps = {
	snapshot: HomeLabSnapshot | null;
	nowMs: number;
};

export function HomeLabSections({ snapshot, nowMs }: HomeLabSectionsProps) {
	const status = getHomeLabStatus(snapshot, nowMs);

	return (
		<>
			<Section title="Where my code actually runs">
				<CodeFlowDiagram snapshot={snapshot} status={status} nowMs={nowMs} />
			</Section>
			<Section title="Running on the box">
				<RunningOnTheBox snapshot={snapshot} />
			</Section>
		</>
	);
}
