import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../index.css";
import { SiteNav } from "@/components/site-nav/site-nav";
import { nowPlaying } from "@/content/listening";

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={inter.variable}>
			<body>
				<SiteNav nowPlaying={nowPlaying} />
				{children}
			</body>
		</html>
	);
}
