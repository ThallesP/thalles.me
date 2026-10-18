import { GroupedList } from "@/components/grouped-list/grouped-list";
import { featuredModels, models } from "@/content/ai-models";
import { getTokenShare, type TokenUsageDay } from "@/entities/token-usage";

import { ToolRow } from "./tool-row";

export type ModelsListProps = {
	days: TokenUsageDay[];
};

export function ModelsList({ days }: ModelsListProps) {
	return (
		<GroupedList>
			{featuredModels.map(({ key, description }) => (
				<ToolRow
					key={key}
					name={models[key].name}
					logo={models[key].logo}
					description={description}
					share={getTokenShare(days, key)}
				/>
			))}
		</GroupedList>
	);
}
