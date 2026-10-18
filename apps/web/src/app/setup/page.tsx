import type { Metadata } from "next";

import { SetupPage } from "./setup-page";

export const metadata: Metadata = {
	title: "Setup",
};

export default function Page() {
	return <SetupPage />;
}
