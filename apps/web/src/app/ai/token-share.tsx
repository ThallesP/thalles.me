import { formatShare } from "./format";

export type TokenShareProps = {
	share: number;
};

export function TokenShare({ share }: TokenShareProps) {
	return (
		<span className="flex shrink-0 items-center gap-3">
			<span className="hidden h-1 w-[88px] overflow-hidden rounded-[2px] bg-secondary sm:block">
				<i
					className="block h-full min-w-0.5 rounded-[2px] bg-foreground"
					style={{ width: `${share * 100}%` }}
				/>
			</span>
			<span className="min-w-12 text-right font-semibold text-[15px] tabular-nums">
				{formatShare(share)}
			</span>
		</span>
	);
}
