import { Suspense } from "react";
import { PageColumn } from "@/components/page/page-column";
import { PageHeader } from "@/components/page/page-header";
import { SiteFooter } from "@/components/site-footer/site-footer";

import { HomeLabSections } from "./home-lab-sections";
import { LiveHomeLabSections } from "./live-home-lab-sections";

export function SetupPage() {
	return (
		<PageColumn>
			<PageHeader
				title="Setup"
				subtitle="A Mac on the desk. Linux where the work happens."
			/>
			<section className="mt-10 space-y-4 text-[19px] text-body leading-[1.58] tracking-[-0.005em]">
				<p>
					I'm a Linux person who uses a Mac. I used to run Linux full time, but
					Apple's M-series chips are too good to leave. I'll go back when
					someone makes a laptop as good as a MacBook, and I pray everyday for
					that.
				</p>
				<p>
					So my Mac is basically a{" "}
					<a
						href="https://en.wikipedia.org/wiki/Computer_terminal#Dumb_terminal"
						className="text-link"
					>
						dumb terminal
					</a>
					. All my dev work runs on a Linux VM inside my Unraid home lab.
				</p>
			</section>
			<Suspense fallback={<HomeLabSections snapshot={null} nowMs={0} />}>
				<LiveHomeLabSections />
			</Suspense>
			<SiteFooter
				sources={
					<>
						Server stats from the home lab,
						<br />
						pushed every minute.
					</>
				}
			/>
		</PageColumn>
	);
}
