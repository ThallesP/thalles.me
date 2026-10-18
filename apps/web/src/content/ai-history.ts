import type { ToolHistoryStep } from "@/entities/ai-tool";

export const toolHistory: ToolHistoryStep[] = [
	{
		name: "GitHub Copilot",
		description:
			"Where everyone started. It was revolutionary, and then it barely improved. GitHub fumbled the lead.",
	},
	{
		name: "Supermaven",
		description:
			"Like Copilot, but a lot faster and with much better predictions.",
	},
	{
		name: "Cursor",
		description:
			"Where I really started using AI, and tokens. Quick edit first. I ignored the sidebar at the start, then it became my default.",
	},
	{
		name: "Claude Code",
		description:
			"I flirted with it, but I prefer tools that wrap it. Opus also scored better inside Cursor than inside Claude Code, and I never figured out why.",
	},
	{
		name: "OpenCode",
		description: "My main for a while, because I like jumping between models.",
	},
	{
		name: "Cursor, again",
		description: "Back for their agents in the browser.",
	},
	{
		name: "T3 Code, the first time",
		description:
			"I tried it while looking for something that worked with a remote dev machine, which I was already doing by February. It wasn't there yet.",
	},
	{
		name: "Maestri",
		description:
			"I loved it and daily drove it for about two months. In the end it was too complicated, and I got lost in my own workflows.",
	},
	{
		name: "T3 Code, now",
		description:
			"I came back for the sidebar, which is amazing. It's open source, runs a bunch of harnesses, performs better, and remote dev on it is great. It's what I use every day.",
	},
];
