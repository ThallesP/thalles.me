export type SpotifyLink =
	| { kind: "playlist"; id: string }
	| { kind: "user"; id: string };

const playlistIdPattern = /^[A-Za-z0-9]{22}$/;
const userIdPattern = /^[A-Za-z0-9._-]+$/;

function getPathSegments(link: string) {
	const uri = link.match(/^spotify:([a-z]+):([^:]+)$/);
	if (uri !== null) return uri.slice(1);
	if (!URL.canParse(link)) return null;

	const { hostname, pathname } = new URL(link);
	if (hostname !== "open.spotify.com") return null;

	return pathname
		.replace(/^\/intl-[a-z-]+(?=\/)/i, "")
		.split("/")
		.filter((segment) => segment !== "");
}

function decodeUserId(rawId: string) {
	try {
		return decodeURIComponent(rawId);
	} catch {
		return null;
	}
}

export function isSpotifyLink(input: string) {
	const link = input.trim();
	if (link.startsWith("spotify:")) return true;
	if (!URL.canParse(link)) return false;

	const { hostname } = new URL(link);
	return hostname === "open.spotify.com" || hostname === "spotify.link";
}

export function parseSpotifyLink(input: string): SpotifyLink | null {
	const segments = getPathSegments(input.trim());
	if (segments === null || segments.length !== 2) return null;

	const [kind, rawId] = segments;
	if (kind === "playlist")
		return playlistIdPattern.test(rawId) ? { kind, id: rawId } : null;
	if (kind !== "user") return null;

	const id = decodeUserId(rawId);
	return id !== null && userIdPattern.test(id) ? { kind, id } : null;
}
