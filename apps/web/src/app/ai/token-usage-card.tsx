import { GroupedList } from "@/components/grouped-list/grouped-list";
import { Stat, StatGrid } from "@/components/stat-grid/stat-grid";
import { isModelKey, models } from "@/content/ai-models";
import {
	sumOutputTokens,
	type TokenProfileStats,
	type TokenUsageDay,
} from "@/entities/token-usage";
import { formatCompactNumber } from "./format";
import { TokenSparkline } from "./token-sparkline";

export type TokenUsageCardProps = {
	profile: TokenProfileStats;
	days: TokenUsageDay[];
	dates: string[];
	range: string;
};

export function TokenUsageCard({
	profile,
	days,
	dates,
	range,
}: TokenUsageCardProps) {
	const { model: topModelKey } = profile.topModel;
	const topModelName = isModelKey(topModelKey)
		? models[topModelKey].name
		: topModelKey;
	const spendInUSD = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(profile.spendUsd);

	return (
		<GroupedList className="p-6">
			<TokenSparkline days={days} dates={dates} />
			<div className="mt-2.5 flex justify-between text-[13px] text-muted-foreground">
				<span>Tokens per day</span>
				<span>{range}</span>
			</div>
			<StatGrid>
				<Stat
					label="Tokens, all time"
					value={formatCompactNumber(profile.totalTokens)}
				/>
				<Stat
					label="Output, 30 days"
					value={formatCompactNumber(sumOutputTokens(days))}
				/>
				<Stat
					label="Sessions, all time"
					value={profile.sessionCount.toLocaleString("en-US")}
				/>
				<Stat
					label="Top model, all time"
					value={topModelName}
					valueClassName="text-[19px] leading-[29px] md:whitespace-nowrap"
				/>
			</StatGrid>
			<div className="mt-3.5 text-[13px] text-muted-foreground">
				Cost at API list price would be {spendInUSD}. I pay a subscription, not
				that. Tracked with{" "}
				<a href="https://tokenmaxxing.sh/thallesp" className="text-link">
					tokenmaxxing.sh
				</a>
				.
			</div>
		</GroupedList>
	);
}
