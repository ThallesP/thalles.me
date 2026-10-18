import Image from "next/image";

import { GroupedList } from "@/components/grouped-list/grouped-list";
import { Stat, StatGrid } from "@/components/stat-grid/stat-grid";
import type { ServerStats } from "@/entities/server-stats";

export type CodeFlowDiagramProps = {
	stats: ServerStats;
};

export function CodeFlowDiagram({ stats }: CodeFlowDiagramProps) {
	return (
		<GroupedList className="p-6">
			<div className="flex flex-col md:flex-row md:items-center">
				<div className="rounded-2xl bg-card-raised p-4 md:w-[180px] md:shrink-0">
					<NodeIcon src="/setup/macbook.svg" />
					<div className="mt-3 font-semibold text-base">MacBook</div>
					<div className="text-muted-foreground text-sm leading-[1.35]">
						A very nice{" "}
						<a
							href="https://en.wikipedia.org/wiki/Computer_terminal#Dumb_terminal"
							className="text-link"
						>
							dumb terminal
						</a>
						.
					</div>
				</div>
				<div className="flex items-center gap-3 pl-[35px] font-medium text-muted-foreground text-xs md:flex-1 md:flex-col-reverse md:gap-1 md:px-1.5">
					<i className="block h-10 w-0.5 bg-[repeating-linear-gradient(180deg,var(--dot)_0_6px,transparent_6px_11px)] md:h-0.5 md:w-full md:bg-[repeating-linear-gradient(90deg,var(--dot)_0_6px,transparent_6px_11px)]" />
					<span>remote</span>
				</div>
				<div className="flex flex-col gap-3.5 rounded-2xl border border-rail p-4 sm:flex-row sm:items-center md:w-[430px] md:shrink-0">
					<div className="sm:w-[168px] sm:shrink-0">
						<NodeIcon src="/setup/unraid.svg" />
						<div className="mt-3 font-semibold text-base">Unraid server</div>
						<div className="text-muted-foreground text-sm leading-[1.35]">
							The mainframe. Home lab in Suzano.
						</div>
					</div>
					<div className="flex-1 rounded-2xl bg-card-raised p-4 shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.1)]">
						<NodeIcon src="/setup/linux.svg" />
						<div className="mt-3 font-semibold text-base">Linux dev VM</div>
						<div className="text-muted-foreground text-sm leading-[1.35]">
							Every repo, every build.
						</div>
						<div className="mt-2 inline-flex items-center gap-[5px] font-medium text-[13px]">
							<span className="size-[7px] rounded-full bg-online" />
							Online
						</div>
					</div>
				</div>
			</div>
			<StatGrid>
				<Stat label="Uptime" value={`${stats.uptimeInDays} days`} />
				<Stat label="CPU" value={`${stats.cpuUsagePercent}%`} />
				<Stat
					label="Memory"
					value={`${stats.memoryUsedInGB} / ${stats.memoryTotalInGB} GB`}
				/>
				<Stat
					label="Array"
					value={`${stats.arrayUsedInTB} / ${stats.arrayTotalInTB} TB`}
				/>
			</StatGrid>
			<div className="mt-3.5 text-[13px] text-muted-foreground">
				Live from the server. Last updated {stats.updatedMinutesAgo} min ago.
			</div>
		</GroupedList>
	);
}

type NodeIconProps = {
	src: string;
};

function NodeIcon({ src }: NodeIconProps) {
	return (
		<span className="grid size-10 place-items-center rounded-[10px] bg-linear-to-b from-dot to-rail shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.14)]">
			<Image src={src} alt="" width={22} height={22} />
		</span>
	);
}
