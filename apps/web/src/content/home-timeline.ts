export type TimelineTerm = {
	label: string;
	title: string;
	definition: string;
};

export type TimelineProject = {
	name: string;
	description: string;
};

export type TimelineStep = {
	period: string;
	title: string;
	description: Array<string | TimelineTerm>;
	projects: TimelineProject[];
};

export const timeline: TimelineStep[] = [
	{
		period: "2016",
		title: "A Minecraft plugin that never worked",
		description: [
			"My first line of code was Java, trying to make a plugin that let players fly. I got it to load and that's it. ",
			{
				label: "My PC",
				title: "My PC back then",
				definition:
					"An Intel Celeron at about 2.4 GHz, 2 GB of DDR3, a 1 TB hard drive and no graphics card, just Intel's integrated GPU. From around 2013. It was rough.",
			},
			" couldn't run Eclipse and Minecraft at the same time, so I quit.",
		],
		projects: [],
	},
	{
		period: "2017–18",
		title: "Sites about my friends",
		description: [
			"Plain HTML and CSS, mostly written on my phone. I can't say what they were about or I'd get cancelled.",
		],
		projects: [],
	},
	{
		period: "2019–20",
		title: "Discord bots",
		description: [
			"A friend made a bot that created channels, pinged someone and deleted them. I thought it was hilarious and tried to rebuild it. That's where I learned JavaScript and Node, and where I started taking this seriously.",
		],
		projects: [],
	},
	{
		period: "2021–22",
		title: "FoxyB's Minecraft server",
		description: [
			"A site where FoxyB's subscribers linked their Twitch account. If they were subscribed, they got into her Minecraft server.",
		],
		projects: [],
	},
	{
		period: "2022",
		title: "Tech Pro Bem",
		description: [
			"Volunteer back-end work on Saúde da Rua. I learned a lot there.",
		],
		projects: [],
	},
	{
		period: "2023–now",
		title: "Notus Labs",
		description: [
			"I joined before Notus had product-market fit, when we were building whatever kept us alive. Chainless was the first thing that found it, and we took off from there.",
		],
		projects: [
			{
				name: "Heimdall",
				description:
					"The first project I got my hands on. A prediction market for meme coins that used machine learning to score the hype around each coin from posts on X. Then X started charging for its API, and that was the end of it.",
			},
			{
				name: "Rede de Planejamento",
				description:
					"Florianópolis City Hall's site, which I built as a contractor through Notus. It came in right as Heimdall died.",
			},
			{
				name: "Chainless",
				description:
					"Our first product-market fit. It won an Avalanche hackathon.",
			},
			{
				name: "Notus API",
				description:
					"Chainless worked so well that people wanted its core as a B2B product. I moved over to build it, including the dashboard and billing.",
			},
			{
				name: "Chainless, again",
				description:
					"Making Chainless great was what brought in the customers we wanted for the Notus API. So I moved back: if Chainless gets better, the API comes with it. It's what I work on now.",
			},
		],
	},
];
