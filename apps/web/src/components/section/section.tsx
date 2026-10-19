export type SectionProps = {
	id?: string;
	title: string;
	action?: React.ReactNode;
	children: React.ReactNode;
};

export function Section({ id, title, action, children }: SectionProps) {
	return (
		<section id={id} className="mt-14 scroll-mt-20">
			<div className="mb-3.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1">
				<h2 className="font-bold text-2xl tracking-[-0.02em]">{title}</h2>
				{action && <div className="shrink-0">{action}</div>}
			</div>
			{children}
		</section>
	);
}
