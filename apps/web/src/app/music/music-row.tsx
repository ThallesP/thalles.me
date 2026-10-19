import { cn } from "@thalles-me/ui/lib/utils";

export type MusicRowProps = {
	href?: string;
	leading: React.ReactNode;
	title: React.ReactNode;
	description: React.ReactNode;
	trailing: React.ReactNode;
};

export function MusicRow({
	href,
	leading,
	title,
	description,
	trailing,
}: MusicRowProps) {
	const rowClassName = "group/row flex items-center gap-3.5 px-5";
	const content = (
		<>
			{leading}
			<span className="flex min-w-0 flex-1 items-center gap-4 border-border border-b-[0.5px] py-3 group-last/row:border-b-0">
				<span className="min-w-0 flex-1">
					<span className="block truncate font-semibold text-base tracking-[-0.01em]">
						{title}
					</span>
					<span className="block truncate text-muted-foreground text-sm leading-[1.4]">
						{description}
					</span>
				</span>
				{trailing}
			</span>
		</>
	);

	if (!href) return <div className={rowClassName}>{content}</div>;

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener"
			className={cn(
				rowClassName,
				"outline-none transition-colors hover:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
			)}
		>
			{content}
		</a>
	);
}
