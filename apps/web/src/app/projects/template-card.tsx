import { buttonVariants } from "@thalles-me/ui/components/button";
import { cn } from "@thalles-me/ui/lib/utils";
import Image from "next/image";

import type { RailwayTemplate } from "@/content/projects-templates";

export type TemplateCardProps = {
	template: RailwayTemplate;
	deploys: number;
};

export function TemplateCard({ template, deploys }: TemplateCardProps) {
	return (
		<a
			href={`https://railway.com/deploy/${template.code}`}
			className="flex h-[156px] w-[220px] flex-col rounded-[18px] bg-card p-3.5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
		>
			<span className="flex items-center gap-2.5">
				<span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-card-raised shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.12)]">
					<Image
						src={template.logoSrc}
						alt=""
						width={24}
						height={24}
						className="size-6 object-contain"
					/>
				</span>
				<span className="font-semibold text-[15px] leading-[1.25] tracking-[-0.01em]">
					{template.name}
				</span>
			</span>
			<span className="mt-2.5 line-clamp-2 text-[13px] text-muted-foreground leading-[1.38]">
				{template.description}
			</span>
			<span className="mt-auto flex items-center justify-between text-[13px] text-muted-foreground tabular-nums">
				{deploys.toLocaleString("en-US")} deploys
				<span
					className={cn(
						buttonVariants({ variant: "secondary", size: "sm" }),
						"px-[13px] font-semibold text-foreground",
					)}
				>
					Deploy
				</span>
			</span>
		</a>
	);
}
