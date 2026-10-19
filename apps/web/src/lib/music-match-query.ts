import { isSpotifyLink } from "./spotify-link";

const LASTFM_PROFILE_URL_PATTERN =
	/^(?:https?:\/\/)?(?:www\.)?last\.fm\/user\//i;

export type MusicMatchQuery =
	| { kind: "lastfm"; username: string }
	| { kind: "spotify"; input: string };

export function parseMusicMatchQuery(raw: string): MusicMatchQuery {
	const input = raw.trim();
	if (isSpotifyLink(input)) return { kind: "spotify", input };

	const [username] = input.replace(LASTFM_PROFILE_URL_PATTERN, "").split("/");

	return { kind: "lastfm", username };
}
