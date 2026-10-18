import type { Metadata } from "next";

import { PageColumn } from "@/components/page/page-column";
import { PageHeader } from "@/components/page/page-header";

export const metadata: Metadata = {
	title: "Projects",
};

export default function ProjectsPage() {
	return (
		<PageColumn>
			<PageHeader title="Projects" subtitle="Coming soon." />
		</PageColumn>
	);
}
