import type { TasteProfile } from "@/entities/taste-profile";
import { getLastFmUser } from "@/http/get-lastfm-user";
import { getTopArtists } from "@/http/get-top-artists";
import { getTopTracks } from "@/http/get-top-tracks";
import { LastFmUserNotFoundError } from "@/http/lastfm";

const VISITOR_ARTISTS_LIMIT = 200;
const VISITOR_TRACKS_LIMIT = 100;

export async function getLastFmTasteProfile(
	username: string,
): Promise<TasteProfile> {
	const user = await getLastFmUser(username);
	if (user === null) throw new LastFmUserNotFoundError(username);

	const [artists, tracks] = await Promise.all([
		getTopArtists({
			username,
			period: "overall",
			limit: VISITOR_ARTISTS_LIMIT,
		}),
		getTopTracks({ username, period: "overall", limit: VISITOR_TRACKS_LIMIT }),
	]);

	return {
		source: "lastfm",
		name: user.name,
		url: user.url,
		avatarUrl: user.avatarUrl,
		playUnit: "plays",
		artists,
		tracks,
	};
}
