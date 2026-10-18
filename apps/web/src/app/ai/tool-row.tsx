import Image from "next/image";

import { AppIcon } from "@/components/grouped-list/app-icon";
import { ListRow } from "@/components/grouped-list/list-row";
import type { ToolLogo } from "@/entities/ai-tool";

import { TokenShare } from "./token-share";

export type ToolRowProps = {
	name: string;
	logo: ToolLogo;
	description: string;
	share: number | null;
};

export function ToolRow({ name, logo, description, share }: ToolRowProps) {
	return (
		<ListRow
			leading={
				<AppIcon>
					<Image
						src={logo.src}
						alt={logo.alt}
						width={28}
						height={28}
						className="rounded-[6px]"
					/>
				</AppIcon>
			}
			title={name}
			description={description}
			trailing={share === null ? null : <TokenShare share={share} />}
		/>
	);
}
