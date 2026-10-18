import {
	KeyRound,
	type LucideIcon,
	Sailboat,
	ScreenShare,
	Webhook,
} from "lucide-react";

export type BuildingProject = {
	repo: string;
	name: string;
	description: string;
	icon: LucideIcon;
};

export const buildingProjects: BuildingProject[] = [
	{
		repo: "keel",
		name: "keel",
		description: "Self-hosted deploy platform, multi-server by default.",
		icon: Sailboat,
	},
	{
		repo: "nestjs-better-auth",
		name: "nestjs-better-auth",
		description: "Better Auth for NestJS. My most-used open source project.",
		icon: KeyRound,
	},
	{
		repo: "nao-me-prenda-janja",
		name: "não me prenda, janja",
		description: "Screen sharing for Discord, as an Activity. Rust and WebRTC.",
		icon: ScreenShare,
	},
	{
		repo: "typedhook",
		name: "typedhook",
		description: "Webhooks done the right way, with types all the way through.",
		icon: Webhook,
	},
];
