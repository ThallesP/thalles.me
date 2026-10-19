import type { BrowserWorkProject } from "@/content/projects-work";

import { AddressBar } from "./address-bar";
import { TrafficLights } from "./traffic-lights";

export type BrowserPreviewProps = {
	project: BrowserWorkProject;
	onClose: () => void;
	onMinimize: () => void;
	onZoom: () => void;
	children: React.ReactNode;
};

export function BrowserPreview({
	project,
	onClose,
	onMinimize,
	onZoom,
	children,
}: BrowserPreviewProps) {
	return (
		<div className="flex h-60 w-[360px] max-w-full flex-col overflow-hidden rounded-2xl bg-card-raised shadow-[0_0_0_0.5px_rgb(255_255_255/0.16),0_24px_60px_rgb(0_0_0/0.65),0_4px_14px_rgb(0_0_0/0.45)]">
			<div className="flex h-[30px] shrink-0 items-center border-border border-b-[0.5px] bg-[#323234] px-2.5">
				<TrafficLights
					onClose={onClose}
					onMinimize={onMinimize}
					onZoom={onZoom}
				/>
				<span className="mr-[47px] ml-2.5 flex min-w-0 flex-1">
					<AddressBar domain={project.domain} />
				</span>
			</div>
			<div className="min-h-0 flex-1 overflow-hidden">{children}</div>
		</div>
	);
}
