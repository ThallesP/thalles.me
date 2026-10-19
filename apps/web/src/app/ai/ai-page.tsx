import { cacheLife } from "next/cache";

import { PageColumn } from "@/components/page/page-column";
import { PageHeader } from "@/components/page/page-header";
import { Section } from "@/components/section/section";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { getTokenDaily } from "@/http/get-token-daily";
import { getTokenProfile } from "@/http/get-token-profile";

import { formatShortDate, getLastDates } from "./format";
import { HarnessesList } from "./harnesses-list";
import { ModelsList } from "./models-list";
import { TokenUsageCard } from "./token-usage-card";
import { ToolHistory } from "./tool-history";
import { TstackCard } from "./tstack-card";

export async function AIPage() {
	"use cache";
	cacheLife("hours");

	const dates = getLastDates(30);
	const since = dates[0];
	const until = dates[dates.length - 1];
	const [profile, modelDays, sourceDays] = await Promise.all([
		getTokenProfile(),
		getTokenDaily({ since, until, groupBy: "model" }),
		getTokenDaily({ since, until, groupBy: "source" }),
	]);
	const range = `${formatShortDate(since)} to ${formatShortDate(until)}`;
	const shareNote = (
		<span className="text-muted-foreground text-sm">
			Token share, last 30 days
		</span>
	);

	return (
		<PageColumn>
			<PageHeader title="AI" subtitle="What I use every day, and how much." />
			<Section title="Models" action={shareNote}>
				<ModelsList days={modelDays} />
			</Section>
			<Section title="Harnesses" action={shareNote}>
				<HarnessesList days={sourceDays} />
			</Section>
			<Section
				title="tstack"
				action={
					<span className="text-muted-foreground text-sm">Private for now</span>
				}
			>
				<TstackCard />
			</Section>
			<Section title="What I used before">
				<ToolHistory />
			</Section>
			<Section title="How much AI I use">
				<p className="mx-1 mb-[18px] text-body leading-[1.55]">
					Most of my code is written with agents now. This is how many tokens
					that takes.
				</p>
				<TokenUsageCard
					profile={profile}
					days={modelDays}
					dates={dates}
					range={range}
				/>
			</Section>
			<SiteFooter sources={"Token data from tokenmaxxing.sh."} />
		</PageColumn>
	);
}
