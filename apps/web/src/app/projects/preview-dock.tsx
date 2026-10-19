import { cn } from "@thalles-me/ui/lib/utils";
import Image from "next/image";

import { AppIcon } from "@/components/grouped-list/app-icon";
import type { BrowserWorkProject } from "@/content/projects-work";

export type PreviewDockProps = {
	ref: React.Ref<HTMLButtonElement>;
	project: BrowserWorkProject | undefined;
	isShown: boolean;
	onRestore: () => void;
};

export function PreviewDock({
	ref,
	project,
	isShown,
	onRestore,
}: PreviewDockProps) {
	return (
		<button
			ref={ref}
			type="button"
			inert={!isShown}
			aria-label={project ? `Restore ${project.domain}` : "Restore window"}
			onClick={onRestore}
			className={cn(
				"fixed inset-x-0 bottom-6 z-40 mx-auto flex h-[46px] w-max cursor-pointer items-center gap-2.5 rounded-full bg-[rgb(44_44_46/0.82)] py-1.5 pr-[18px] pl-1.5 font-medium text-foreground text-sm shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.16),0_12px_32px_rgb(0_0_0/0.5)] outline-link outline-offset-3 backdrop-blur-[24px] backdrop-saturate-160 transition-[opacity,translate,scale] duration-[200ms,250ms,250ms] ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:outline-2 motion-reduce:transition-none",
				isShown
					? "opacity-100"
					: "pointer-events-none translate-y-4 scale-90 opacity-0",
			)}
		>
			{project && (
				<>
					<AppIcon size="sm">
						<Image src={project.glyphSrc} alt="" width={20} height={20} />
					</AppIcon>
					{project.domain}
				</>
			)}
		</button>
	);
}
