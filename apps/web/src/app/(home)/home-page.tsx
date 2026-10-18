import { PageColumn } from "@/components/page/page-column";
import { SiteFooter } from "@/components/site-footer/site-footer";

import { BuildingSection } from "./building-section";
import { Hero } from "./hero";
import { HistorySection } from "./history-section";
import { MusicMatchSection } from "./music-match-section";

export function HomePage() {
	return (
		<>
			<Hero />
			<PageColumn>
				<BuildingSection />
				<HistorySection />
				<MusicMatchSection />
				<SiteFooter
					sources={
						<>
							Music data powered by AudioScrobbler.
							<br />
							Code from GitHub.
						</>
					}
				/>
			</PageColumn>
		</>
	);
}
