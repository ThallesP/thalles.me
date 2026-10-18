import {
	getTotalTokensPerDay,
	type TokenUsageDay,
} from "@/entities/token-usage";

export type TokenSparklineProps = {
	days: TokenUsageDay[];
	dates: string[];
};

export function TokenSparkline({ days, dates }: TokenSparklineProps) {
	const totalTokensPerDay = getTotalTokensPerDay(days, dates);
	const maxTotalTokens = Math.max(...totalTokensPerDay);

	return (
		<div
			role="img"
			aria-label="Tokens per day over the last 30 days"
			className="flex h-16 items-end gap-[3px] sm:gap-1"
		>
			{totalTokensPerDay.map((totalTokens, index) => (
				<i
					key={dates[index]}
					className="flex-1 rounded-[3px] bg-foreground opacity-70 data-[empty=true]:bg-secondary data-[empty=true]:opacity-100"
					data-empty={totalTokens === 0}
					style={{
						height: Math.max(
							2,
							Math.round((totalTokens / maxTotalTokens) * 64),
						),
					}}
				/>
			))}
		</div>
	);
}
