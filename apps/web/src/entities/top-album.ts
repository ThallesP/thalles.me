export type TopAlbum = {
	title: string;
	artist: string;
	artworkUrl: string | null;
	playCount: number;
};

export function findArtworkUrlByArtist(albums: TopAlbum[], artist: string) {
	const album = albums.find(
		(album) => album.artist === artist && album.artworkUrl !== null,
	);

	return album === undefined ? null : album.artworkUrl;
}
