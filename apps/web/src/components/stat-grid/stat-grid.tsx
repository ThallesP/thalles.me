import { cn } from "@thalles-me/ui/lib/utils";

export type StatGridProps = {
	children: React.ReactNode;
};

export function StatGrid({ children }: StatGridProps) {
	return (
		<dl className="mt-5 grid grid-cols-2 gap-y-4 border-border border-t-[0.5px] pt-[18px] md:grid-cols-4">
			{children}
		</dl>
	);
}

export type StatProps = {
	label: string;
	value: string;
	valueClassName?: string;
};

export function Stat({ label, value, valueClassName }: StatProps) {
	return (
		<div className="min-w-0 border-border even:border-l-[0.5px] even:pl-[18px] md:not-first:border-l-[0.5px] md:not-first:pl-[18px]">
			<dt className="font-medium text-[13px] text-muted-foreground">{label}</dt>
			<dd
				className={cn(
					"mt-0.5 font-bold text-[22px] tracking-[-0.02em]",
					valueClassName,
				)}
			>
				{value}
			</dd>
		</div>
	);
}
