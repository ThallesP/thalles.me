import type { TasteProfile } from "@/entities/taste-profile";
import { getLastFmUser } from "@/http/get-lastfm-user";
import { getTopArtists } from "@/http/get-top-artists";
import { LastFmUserNotFoundError } from "@/http/lastfm";

const VISITOR_ARTISTS_LIMIT = 200;

export async function getLastFmTasteProfile(
	username: string,
): Promise<TasteProfile> {
	const user = await getLastFmUser(username);
	if (user === null) throw new LastFmUserNotFoundError(username);

	const artists = await getTopArtists({
		username,
		period: "overall",
		limit: VISITOR_ARTISTS_LIMIT,
	});

	return {
		source: "lastfm",
		name: user.name,
		url: user.url,
		avatarUrl: user.avatarUrl,
		playUnit: "plays",
		artists,
	};
}
