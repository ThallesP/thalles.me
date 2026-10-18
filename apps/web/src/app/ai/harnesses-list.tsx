import { GroupedList } from "@/components/grouped-list/grouped-list";
import { harnesses } from "@/content/ai-harnesses";
import { getTokenShare, type TokenUsageDay } from "@/entities/token-usage";

import { ToolRow } from "./tool-row";

export type HarnessesListProps = {
	days: TokenUsageDay[];
};

export function HarnessesList({ days }: HarnessesListProps) {
	return (
		<GroupedList>
			{harnesses.map(({ sourceKey, name, logo, description }) => (
				<ToolRow
					key={name}
					name={name}
					logo={logo}
					description={description}
					share={sourceKey === null ? null : getTokenShare(days, sourceKey)}
				/>
			))}
		</GroupedList>
	);
}
