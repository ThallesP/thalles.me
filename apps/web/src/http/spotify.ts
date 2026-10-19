export const SPOTIFY_USER_AGENT = "Mozilla/5.0";

export type SpotifyImageSource = {
	url: string;
	width: number | null;
	height: number | null;
};

export function getLargestSourceUrl(sources: SpotifyImageSource[]) {
	const [largest] = [...sources].sort(
		(a, b) => (b.width ?? 0) - (a.width ?? 0),
	);

	return largest === undefined || largest.url === "" ? null : largest.url;
}

export function readScriptContent(html: string, id: string) {
	const match = html.match(
		new RegExp(`<script id="${id}"[^>]*>([\\s\\S]*?)</script>`),
	);
	if (match === null) throw new Error(`Spotify page has no ${id} script`);

	return match[1];
}
