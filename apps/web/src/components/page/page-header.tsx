export type PageHeaderProps = {
	title: string;
	subtitle: React.ReactNode;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
	return (
		<header className="pt-14">
			<h1 className="font-bold text-[40px] leading-[1.08] tracking-[-0.028em]">
				{title}
			</h1>
			<p className="mt-2 text-[21px] text-muted-foreground tracking-[-0.01em]">
				{subtitle}
			</p>
		</header>
	);
}
