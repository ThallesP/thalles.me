import Image from "next/image";

import { AppIcon } from "@/components/grouped-list/app-icon";
import { GroupedList } from "@/components/grouped-list/grouped-list";
import { ListRow } from "@/components/grouped-list/list-row";
import type { ServerStats } from "@/entities/server-stats";

export type RunningOnTheBoxProps = {
	stats: ServerStats;
};

export function RunningOnTheBox({ stats }: RunningOnTheBoxProps) {
	return (
		<GroupedList>
			<ListRow
				leading={
					<AppIcon>
						<Image src="/setup/linux.svg" alt="" width={28} height={28} />
					</AppIcon>
				}
				title="Linux dev VM"
				description="Every repo, every build, every agent session."
			/>
			<ListRow
				leading={
					<AppIcon>
						<Image src="/setup/docker.svg" alt="" width={28} height={28} />
					</AppIcon>
				}
				title="Docker containers"
				description={`${stats.runningContainerCount} running.`}
			/>
			<ListRow
				leading={
					<AppIcon>
						<Image src="/setup/storage.svg" alt="" width={28} height={28} />
					</AppIcon>
				}
				title="Storage array"
				description="Backups and everything else."
			/>
		</GroupedList>
	);
}
