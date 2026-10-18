import type { Metadata } from "next";

import { PageColumn } from "@/components/page/page-column";
import { PageHeader } from "@/components/page/page-header";

export const metadata: Metadata = {
	title: "AI",
};

export default function AIPage() {
	return (
		<PageColumn>
			<PageHeader title="AI" subtitle="Coming soon." />
		</PageColumn>
	);
}
