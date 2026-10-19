import { cacheLife } from "next/cache";

const BRANCH_REDIRECT_USER_AGENT =
	"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
const MAX_REDIRECTS = 5;

export async function resolveSpotifyShortLink(url: string): Promise<string> {
	"use cache";
	cacheLife("weeks");

	let current = url;
	for (let hop = 0; hop < MAX_REDIRECTS; hop++) {
		const response = await fetch(current, {
			redirect: "manual",
			headers: { "User-Agent": BRANCH_REDIRECT_USER_AGENT },
		});
		const location = response.headers.get("location");
		if (location === null) break;

		current = new URL(location, current).href;
		if (new URL(current).hostname === "open.spotify.com") break;
	}

	return current;
}
