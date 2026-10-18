import { cn } from "@thalles-me/ui/lib/utils";
import { Lock } from "lucide-react";

const sizeClass = {
	sm: "h-[18px] flex-1 rounded-md px-2 text-[11px] text-muted-foreground",
	md: "h-[26px] min-w-[300px] max-w-full rounded-lg px-3.5 text-[13px] text-body max-sm:min-w-0",
} as const;

export type AddressBarProps = {
	size?: keyof typeof sizeClass;
	domain: string;
};

export function AddressBar({ size = "sm", domain }: AddressBarProps) {
	return (
		<span
			className={cn(
				"inline-flex min-w-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap bg-secondary font-medium",
				sizeClass[size],
			)}
		>
			<Lock aria-hidden className="size-2.5 shrink-0 text-muted-foreground" />
			<span className="truncate">{domain}</span>
		</span>
	);
}
