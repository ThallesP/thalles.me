"use client";

import { cn } from "@thalles-me/ui/lib/utils";
import dynamic from "next/dynamic";

import type { WorkProject } from "@/content/projects-work";

import { ScaledScreen } from "./scaled-screen";

type ScreenEntry = {
	Screen: React.ComponentType;
	designWidthPx: number;
	surfaceClassName: string;
};

const screens: Record<WorkProject["screen"], ScreenEntry> = {
	chainless: {
		Screen: dynamic(
			() => import("./chainless-screen").then((mod) => mod.ChainlessScreen),
			{ ssr: false },
		),
		designWidthPx: 390,
		surfaceClassName: "bg-[#fcc934]",
	},
	"notus-dashboard": {
		Screen: dynamic(
			() =>
				import("./notus-dashboard-screen").then(
					(mod) => mod.NotusDashboardScreen,
				),
			{ ssr: false },
		),
		designWidthPx: 1280,
		surfaceClassName: "bg-[#0a0a0a]",
	},
	"rede-de-planejamento": {
		Screen: dynamic(
			() =>
				import("./rede-de-planejamento-screen").then(
					(mod) => mod.RedeDePlanejamentoScreen,
				),
			{ ssr: false },
		),
		designWidthPx: 1280,
		surfaceClassName: "bg-[#0b1238]",
	},
};

export type WorkScreenProps = {
	screen: WorkProject["screen"];
};

export function WorkScreen({ screen }: WorkScreenProps) {
	const { Screen, designWidthPx, surfaceClassName } = screens[screen];

	return (
		<div className={cn("min-h-full", surfaceClassName)}>
			<ScaledScreen designWidthPx={designWidthPx}>
				<Screen />
			</ScaledScreen>
		</div>
	);
}
