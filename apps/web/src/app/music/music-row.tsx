export type MusicRowProps = {
	leading: React.ReactNode;
	title: React.ReactNode;
	description: React.ReactNode;
	trailing: React.ReactNode;
};

export function MusicRow({
	leading,
	title,
	description,
	trailing,
}: MusicRowProps) {
	return (
		<div className="group/row flex items-center gap-3.5 px-5">
			{leading}
			<div className="flex min-w-0 flex-1 items-center gap-4 border-border border-b-[0.5px] py-3 group-last/row:border-b-0">
				<div className="min-w-0 flex-1">
					<div className="truncate font-semibold text-base tracking-[-0.01em]">
						{title}
					</div>
					<div className="truncate text-muted-foreground text-sm leading-[1.4]">
						{description}
					</div>
				</div>
				{trailing}
			</div>
		</div>
	);
}
