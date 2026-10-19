import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../index.css";
import { SiteNav } from "@/components/site-nav/site-nav";
import { getRecentTracks } from "@/http/get-recent-tracks";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Thalles Passos",
		template: "%s · Thalles Passos",
	},
	description: "Founding Engineer at Notus Labs, from Suzano, Brazil.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const listening = await getRecentTracks("page");

	return (
		<html lang="en" className={inter.variable}>
			<body>
				<SiteNav listening={listening} />
				<main>{children}</main>
			</body>
		</html>
	);
}
