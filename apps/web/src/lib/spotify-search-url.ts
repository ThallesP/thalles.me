export function getSpotifySearchUrl(query: string) {
	return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
}
