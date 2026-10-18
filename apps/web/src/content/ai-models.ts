import type { AIModel, ToolLogo } from "@/entities/ai-tool";

const anthropicLogo: ToolLogo = { src: "/ai/anthropic.svg", alt: "Anthropic" };
const openAILogo: ToolLogo = { src: "/ai/openai.svg", alt: "OpenAI" };

export const models = {
	"claude-opus-5-5": { name: "Claude Opus 5.5", logo: anthropicLogo },
	"claude-opus-5": { name: "Claude Opus 5", logo: anthropicLogo },
	"claude-fable-5-1": { name: "Claude Fable 5.1", logo: anthropicLogo },
	"claude-sonnet-5-5": { name: "Claude Sonnet 5.5", logo: anthropicLogo },
	"gpt-6.1-sol": { name: "GPT-6.1 Sol", logo: openAILogo },
	"gpt-6-sol": { name: "GPT-6 Sol", logo: openAILogo },
	"gpt-6-astra": { name: "GPT-6 Astra", logo: openAILogo },
	"gpt-5.6-sol": { name: "GPT-5.6 Sol", logo: openAILogo },
} satisfies Record<string, AIModel>;

export type ModelKey = keyof typeof models;

export function isModelKey(key: string): key is ModelKey {
	return Object.hasOwn(models, key);
}

export const featuredModels: { key: ModelKey; description: string }[] = [
	{ key: "claude-opus-5-5", description: "My default for almost everything." },
	{
		key: "claude-fable-5-1",
		description: "My second most used model this month.",
	},
	{ key: "gpt-6.1-sol", description: "Most of my Codex tokens." },
];
