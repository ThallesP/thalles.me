import type { Metadata } from "next";

import { AIPage } from "./ai-page";

export const metadata: Metadata = {
	title: "AI",
};

export default function Page() {
	return <AIPage />;
}
