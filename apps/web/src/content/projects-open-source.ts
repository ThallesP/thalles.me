export type OpenSourceProject = {
	repoName: string;
	title: string;
	description: string;
	iconSrc: string;
	note?: string;
};

export const openSourceProjects: OpenSourceProject[] = [
	{
		repoName: "nestjs-better-auth",
		title: "nestjs-better-auth",
		description: "Better Auth for NestJS. Add authentication in a few lines.",
		iconSrc: "/projects/repos/nestjs-better-auth.svg",
		note: "About 64,000 npm downloads a week",
	},
	{
		repoName: "keel",
		title: "keel",
		description:
			"Self-hosted, canvas-first deploy platform. Multi-server by default.",
		iconSrc: "/projects/repos/keel.svg",
	},
	{
		repoName: "typedhook",
		title: "typedhook",
		description: "Webhooks done the right way, effortlessly.",
		iconSrc: "/projects/repos/typedhook.svg",
	},
	{
		repoName: "nao-me-prenda-janja",
		title: "não me prenda, janja",
		description: "Screen sharing for Discord as an Activity. Rust and WebRTC.",
		iconSrc: "/projects/repos/nao-me-prenda-janja.svg",
	},
	{
		repoName: "durable",
		title: "durable",
		description: "Go workflows with pluggable persistence and an upgrade gate.",
		iconSrc: "/projects/repos/durable.svg",
	},
	{
		repoName: "dispatcher",
		title: "dispatcher",
		description: "Earnings and health alerts for Railway template publishers.",
		iconSrc: "/projects/repos/dispatcher.svg",
	},
	{
		repoName: "webhookit",
		title: "webhookit",
		description: "Webhooks as a library, on a Postgres transactional outbox.",
		iconSrc: "/projects/repos/webhookit.svg",
	},
	{
		repoName: "just-github",
		title: "just-github",
		description: "An fs-like API for reading GitHub repos without cloning.",
		iconSrc: "/projects/repos/just-github.svg",
	},
	{
		repoName: "idea-remote-oracle-deploy",
		title: "idea-remote-oracle-deploy",
		description: "Run a remote IntelliJ IDEA server on Oracle's free ARM tier.",
		iconSrc: "/projects/repos/idea-remote-oracle-deploy.svg",
	},
	{
		repoName: "whatsapp-cloud.js",
		title: "whatsapp-cloud.js",
		description: "A library for WhatsApp's Cloud API.",
		iconSrc: "/projects/repos/whatsapp-cloud-js.svg",
	},
];
