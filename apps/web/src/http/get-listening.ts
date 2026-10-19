import type { Listening } from "@/entities/listening";

export async function getListening(): Promise<Listening> {
	const response = await fetch("/api/listening");
	if (!response.ok)
		throw new Error(`Listening request failed with ${response.status}`);

	return response.json();
}
