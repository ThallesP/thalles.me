import { cn } from "@thalles-me/ui/lib/utils";

export type ListRowProps = {
	href?: string;
	leading: React.ReactNode;
	title: React.ReactNode;
	description: React.ReactNode;
	trailing?: React.ReactNode;
};

export function ListRow({
	href,
	leading,
	title,
	description,
	trailing,
}: ListRowProps) {
	const rowClassName = "group/row flex items-center gap-4 px-5";
	const content = (
		<>
			{leading}
			<span className="flex min-w-0 flex-1 items-center gap-4 border-border border-b-[0.5px] py-4 group-last/row:border-b-0">
				<span className="min-w-0 flex-1">
					<span className="block font-semibold text-[17px] tracking-[-0.01em]">
						{title}
					</span>
					<span className="mt-0.5 block text-[15px] text-muted-foreground leading-snug">
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
			className={cn(
				rowClassName,
				"outline-none transition-colors hover:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
			)}
		>
			{content}
		</a>
	);
}
