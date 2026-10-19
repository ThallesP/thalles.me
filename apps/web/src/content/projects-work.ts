type WorkProjectBase = {
	name: string;
	description: string;
	url: string;
	domain: string;
	screen: "chainless" | "notus-dashboard" | "rede-de-planejamento";
};

export type PhoneWorkProject = WorkProjectBase & {
	kind: "phone";
	appIconSrc: string;
};

export type BrowserWorkProject = WorkProjectBase & {
	kind: "browser";
	glyphSrc: string;
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
		screen: "chainless",
		appIconSrc: "/projects/work/chainless-icon.jpg",
	},
	{
		kind: "browser",
		name: "Notus Labs dashboard",
		description:
			"Admin dashboard and backend for the Notus API, including a pay-as-you-go billing system. Built as the main full-stack developer.",
		url: "https://dashboard.notus.team",
		domain: "dashboard.notus.team",
		screen: "notus-dashboard",
		glyphSrc: "/projects/work/notus-dashboard-icon.svg",
	},
	{
		kind: "browser",
		name: "Rede de Planejamento",
		description:
			"Content-managed site for Florianópolis City Hall, with a GraphQL API over complex data. Built with a team.",
		url: "https://redeplanejamento.pmf.sc.gov.br",
		domain: "redeplanejamento.pmf.sc.gov.br",
		screen: "rede-de-planejamento",
		glyphSrc: "/projects/work/rede-de-planejamento-icon.svg",
	},
];
