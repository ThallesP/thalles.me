import Image from "next/image";

import { AppIcon } from "@/components/grouped-list/app-icon";
import { GroupedList } from "@/components/grouped-list/grouped-list";
import { ListRow } from "@/components/grouped-list/list-row";
import type { HomeLabSnapshot } from "@/entities/home-lab-stats";

export type RunningOnTheBoxProps = {
	snapshot: HomeLabSnapshot | null;
};

export function RunningOnTheBox({ snapshot }: RunningOnTheBoxProps) {
	const containersDescription =
		snapshot === null
			? "Counting…"
			: `${snapshot.runningContainerCount} running.`;

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
				description={containersDescription}
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
