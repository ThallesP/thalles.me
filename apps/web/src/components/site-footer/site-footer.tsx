export type SiteFooterProps = {
	sources: React.ReactNode;
};

export function SiteFooter({ sources }: SiteFooterProps) {
	return (
		<footer className="mt-18 flex justify-between gap-6 border-border border-t-[0.5px] px-1 pt-6 pb-22 text-[13px] text-muted-foreground leading-normal">
			<span>Thalles Passos · Suzano, SP</span>
			<span className="text-right">{sources}</span>
		</footer>
	);
}
