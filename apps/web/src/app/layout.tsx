import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import "../index.css";
import { LiveNowPlayingChip } from "@/components/site-nav/live-now-playing-chip";
import { SiteNav } from "@/components/site-nav/site-nav";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Thalles Passos",
		template: "%s · Thalles Passos",
	},
	description: "Founding Engineer at Notus Labs, from Brazil.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={inter.variable}>
			<body>
				<SiteNav>
					<Suspense>
						<LiveNowPlayingChip />
					</Suspense>
				</SiteNav>
				<main>{children}</main>
			</body>
		</html>
	);
}
