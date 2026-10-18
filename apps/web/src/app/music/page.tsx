import type { Metadata } from "next";

import { PageColumn } from "@/components/page/page-column";
import { PageHeader } from "@/components/page/page-header";

export const metadata: Metadata = {
	title: "Music",
};

export default function MusicPage() {
	return (
		<PageColumn>
			<PageHeader title="Music" subtitle="Coming soon." />
		</PageColumn>
	);
}
