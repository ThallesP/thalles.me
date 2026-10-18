type WorkProjectBase = {
	name: string;
	description: string;
	url: string;
	domain: string;
};

export type PhoneWorkProject = WorkProjectBase & {
	kind: "phone";
	appIconSrc: string;
	screens: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
};

export type BrowserWorkProject = WorkProjectBase & {
	kind: "browser";
	glyphSrc: string;
	screenshot: {
		src: string;
		width: number;
		height: number;
	};
};

export type WorkProject = PhoneWorkProject | BrowserWorkProject;

export const workProjects: WorkProject[] = [
	{
		kind: "phone",
		name: "Chainless",
		description:
			"Self-custody finance app for crypto, US stocks and bitcoin-backed loans, with Pix in and out. Won an Avalanche hackathon. I'm a Founding Engineer on the app and its backend.",
		url: "https://chainless.finance",
		domain: "chainless.finance",
		appIconSrc: "/projects/work/chainless-icon.jpg",
		screens: {
			src: "/projects/work/chainless-screens.jpg",
			alt: "Chainless app screens: home, portfolio, Bitcoin, liquidity pools, Pix deposit and card",
			width: 540,
			height: 6591,
		},
	},
	{
		kind: "browser",
		name: "Notus Labs dashboard",
		description:
			"Admin dashboard and backend for the Notus API, including a pay-as-you-go billing system. Built as the main full-stack developer.",
		url: "https://dashboard.notus.team",
		domain: "dashboard.notus.team",
		glyphSrc: "/projects/work/notus-dashboard-icon.svg",
		screenshot: {
			src: "/projects/work/notus-dashboard.jpg",
			width: 1440,
			height: 1166,
		},
	},
	{
		kind: "browser",
		name: "Rede de Planejamento",
		description:
			"Content-managed site for Florianópolis City Hall, with a GraphQL API over complex data. Built with a team.",
		url: "https://redeplanejamento.pmf.sc.gov.br",
		domain: "redeplanejamento.pmf.sc.gov.br",
		glyphSrc: "/projects/work/rede-de-planejamento-icon.svg",
		screenshot: {
			src: "/projects/work/rede-de-planejamento.jpg",
			width: 1440,
			height: 5141,
		},
	},
];
