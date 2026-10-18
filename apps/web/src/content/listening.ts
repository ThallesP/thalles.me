import type { RecentTrack } from "@/entities/recent-track";
import type { TopAlbum } from "@/entities/top-album";
import type { TopArtist } from "@/entities/top-artist";
import type { Track } from "@/entities/track";

export const nowPlaying: Track = {
	title: "O Trem Azul",
	artist: "Lô Borges & Milton Nascimento",
	album: "Clube da Esquina",
	artworkUrl:
		"https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/16/fe/be/16febeb7-b081-c66c-a26b-1f7cd097bd45/19UMGIM66061.rgb.jpg/600x600bb.jpg",
};

export const nowPlayingReleaseYear = 1972;

export const lastFmProfileUrl = "https://www.last.fm";

export const listeningUpdatedMinutesAgo = 4;

export const topArtists: TopArtist[] = [
	{
		name: "Milton Nascimento",
		imageUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music1/v4/27/0c/8d/270c8d86-2df5-5246-cd78-c2820772755a/dj.qcqtrmps.jpg/600x600bb.jpg",
		playCount: 214,
	},
	{
		name: "Arctic Monkeys",
		imageUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/69/9c/b5/699cb5d6-115c-ff73-9d26-e57ea4350d72/887828031795.png/600x600bb.jpg",
		playCount: 168,
	},
	{
		name: "Os Mutantes",
		imageUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d7/fd/d1/d7fdd1ea-9025-6346-0834-48ed931dd62f/00602537449460.rgb.jpg/600x600bb.jpg",
		playCount: 131,
	},
	{
		name: "Legião Urbana",
		imageUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/da/72/ed/da72edf4-27c8-2d20-a870-3259f853a866/13UABIM70454.rgb.jpg/600x600bb.jpg",
		playCount: 97,
	},
	{
		name: "Tim Maia",
		imageUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/87/54/0b/87540b30-b102-4f62-e1fa-312bb574e106/8429006371495.jpg/600x600bb.jpg",
		playCount: 74,
	},
	{
		name: "Novos Baianos",
		imageUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/81/f0/78/81f0780b-c2d5-52bd-d80e-0c429eeebc36/196873466569.jpg/600x600bb.jpg",
		playCount: 61,
	},
];

export const onRepeat: TopAlbum[] = [
	{
		title: "Clube da Esquina",
		artist: "Milton Nascimento",
		artworkUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/16/fe/be/16febeb7-b081-c66c-a26b-1f7cd097bd45/19UMGIM66061.rgb.jpg/600x600bb.jpg",
		playCount: 214,
	},
	{
		title: "AM",
		artist: "Arctic Monkeys",
		artworkUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/69/9c/b5/699cb5d6-115c-ff73-9d26-e57ea4350d72/887828031795.png/600x600bb.jpg",
		playCount: 168,
	},
	{
		title: "Os Mutantes",
		artist: "Os Mutantes",
		artworkUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/eb/50/40/eb50401c-3ec9-a672-5303-358451239397/14UMGIM44806.rgb.jpg/600x600bb.jpg",
		playCount: 131,
	},
	{
		title: "Dois",
		artist: "Legião Urbana",
		artworkUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/da/72/ed/da72edf4-27c8-2d20-a870-3259f853a866/13UABIM70454.rgb.jpg/600x600bb.jpg",
		playCount: 97,
	},
	{
		title: "Racional, Vol. 1",
		artist: "Tim Maia",
		artworkUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/87/54/0b/87540b30-b102-4f62-e1fa-312bb574e106/8429006371495.jpg/600x600bb.jpg",
		playCount: 74,
	},
];

export const recentTracks: RecentTrack[] = [
	{
		title: "Do I Wanna Know?",
		artist: "Arctic Monkeys",
		album: "AM",
		artworkUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/69/9c/b5/699cb5d6-115c-ff73-9d26-e57ea4350d72/887828031795.png/600x600bb.jpg",
		playedMinutesAgo: 4,
	},
	{
		title: "Panis et Circenses",
		artist: "Os Mutantes",
		album: "Os Mutantes",
		artworkUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/eb/50/40/eb50401c-3ec9-a672-5303-358451239397/14UMGIM44806.rgb.jpg/600x600bb.jpg",
		playedMinutesAgo: 9,
	},
	{
		title: "Tempo Perdido",
		artist: "Legião Urbana",
		album: "Dois",
		artworkUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/da/72/ed/da72edf4-27c8-2d20-a870-3259f853a866/13UABIM70454.rgb.jpg/600x600bb.jpg",
		playedMinutesAgo: 13,
	},
	{
		title: "Ovelha Negra",
		artist: "Rita Lee & Tutti Frutti",
		album: "Fruto Proibido",
		artworkUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d9/7f/a7/d97fa7ff-fac9-e0df-b218-740cd6961a02/13UABIM50287.rgb.jpg/600x600bb.jpg",
		playedMinutesAgo: 17,
	},
	{
		title: "Mas Que Nada",
		artist: "Jorge Ben Jor",
		album: "Samba Esquema Novo",
		artworkUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/94/46/58/94465854-cafb-ec16-ce23-afbdae80d47c/06UMGIM46403.rgb.jpg/600x600bb.jpg",
		playedMinutesAgo: 21,
	},
	{
		title: "Fake Plastic Trees",
		artist: "Radiohead",
		album: "The Bends",
		artworkUrl:
			"https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1b/a9/5c/1ba95cac-b245-d386-63fb-6b857aa9dce8/634904078065.png/600x600bb.jpg",
		playedMinutesAgo: 26,
	},
];
