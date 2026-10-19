import type { MusicMatch } from "@/entities/music-match";

type MusicMatchErrorResponse = {
	message: string;
};

export class MusicMatchError extends Error {}

export async function getMusicMatch(query: string): Promise<MusicMatch> {
	const search = new URLSearchParams({ q: query });
	const response = await fetch(`/api/music-match?${search}`);
	if (!response.ok) {
		const { message }: MusicMatchErrorResponse = await response.json();
		throw new MusicMatchError(message);
	}

	return response.json();
}
