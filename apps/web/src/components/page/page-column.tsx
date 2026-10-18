import { cn } from "@thalles-me/ui/lib/utils";

export type PageColumnProps = {
	className?: string;
	children: React.ReactNode;
};

export function PageColumn({ className, children }: PageColumnProps) {
	return (
		<main className={cn("mx-auto w-full max-w-[760px] px-5", className)}>
			{children}
		</main>
	);
}
