import { cn } from "@thalles-me/ui/lib/utils";

export type GroupedListProps = {
	className?: string;
	children: React.ReactNode;
};

export function GroupedList({ className, children }: GroupedListProps) {
	return (
		<div className={cn("overflow-hidden rounded-xl bg-card", className)}>
			{children}
		</div>
	);
}
