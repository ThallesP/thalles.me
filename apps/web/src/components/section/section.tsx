export type SectionProps = {
	id?: string;
	title: string;
	action?: React.ReactNode;
	children: React.ReactNode;
};

export function Section({ id, title, action, children }: SectionProps) {
	return (
		<section id={id} className="mt-14 scroll-mt-20">
			<div className="mb-3.5 flex items-baseline justify-between gap-4 px-1">
				<h2 className="font-bold text-2xl tracking-[-0.02em]">{title}</h2>
				{action}
			</div>
			{children}
		</section>
	);
}
