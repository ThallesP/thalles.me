export type ToolLogo = {
	src: string;
	alt: string;
};

export type AIModel = {
	name: string;
	logo: ToolLogo;
};

export type Harness = {
	sourceKey: string | null;
	name: string;
	logo: ToolLogo;
	description: string;
};

export type ToolHistoryStep = {
	name: string;
	description: string;
};
