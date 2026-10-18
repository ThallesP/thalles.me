import type { Metadata } from "next";

import { PageColumn } from "@/components/page/page-column";
import { PageHeader } from "@/components/page/page-header";

export const metadata: Metadata = {
	title: "Setup",
};

export default function SetupPage() {
	return (
		<PageColumn>
			<PageHeader title="Setup" subtitle="Coming soon." />
		</PageColumn>
	);
}
