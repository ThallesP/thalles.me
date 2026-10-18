import { cacheLife } from "next/cache";

type RailwayTemplateDeploys = {
	code: string;
	projects: number;
};

export async function getTemplateDeploysByCode(codes: string[]) {
	"use cache";
	cacheLife("hours");

	const fields = codes.map(
		(code, index) => `t${index}: template(code: "${code}") { code projects }`,
	);
	const response = await fetch("https://backboard.railway.com/graphql/v2", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ query: `query { ${fields.join(" ")} }` }),
	});
	if (!response.ok)
		throw new Error(`Railway templates request failed with ${response.status}`);

	const { data }: { data: Record<string, RailwayTemplateDeploys> } =
		await response.json();

	return Object.fromEntries(
		Object.values(data).map(({ code, projects }) => [code, projects]),
	);
}
