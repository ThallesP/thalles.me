export type ListRowProps = {
	leading: React.ReactNode;
	title: React.ReactNode;
	description: React.ReactNode;
	trailing?: React.ReactNode;
};

export function ListRow({
	leading,
	title,
	description,
	trailing,
}: ListRowProps) {
	return (
		<div className="group/row flex items-center gap-4 px-5">
			{leading}
			<div className="flex min-w-0 flex-1 items-center gap-4 border-border border-b-[0.5px] py-4 group-last/row:border-b-0">
				<div className="min-w-0 flex-1">
					<div className="font-semibold text-[17px] tracking-[-0.01em]">
						{title}
					</div>
					<div className="mt-0.5 text-[15px] text-muted-foreground leading-snug">
						{description}
					</div>
				</div>
				{trailing}
			</div>
		</div>
	);
}
