import type { Harness } from "@/entities/ai-tool";

export const harnesses: Harness[] = [
	{
		sourceKey: null,
		name: "T3 Code",
		logo: { src: "/ai/t3-code.png", alt: "T3 Code" },
		description:
			"Where I run my agents. Its tokens count under Claude Code and Codex.",
	},
	{
		sourceKey: "claude",
		name: "Claude Code",
		logo: { src: "/ai/claude.svg", alt: "Claude" },
		description: "Anthropic's coding agent.",
	},
	{
		sourceKey: "codex",
		name: "Codex",
		logo: { src: "/ai/openai.svg", alt: "OpenAI" },
		description: "OpenAI's coding agent.",
	},
];
