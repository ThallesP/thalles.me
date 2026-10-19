import { Section } from "@/components/section/section";
import { getTopAlbums } from "@/http/get-top-albums";

import { MusicMatch } from "./music-match";
import { FAN_ALBUMS_LIMIT } from "./taste-avatars";

export async function MusicMatchSection() {
	const topAlbums = await getTopAlbums();
	const fanAlbums = topAlbums
		.filter((album) => album.artworkUrl !== null)
		.slice(0, FAN_ALBUMS_LIMIT);

	return (
		<Section id="music-match" title="Do we like the same music?">
			<MusicMatch fanAlbums={fanAlbums} />
		</Section>
	);
}
