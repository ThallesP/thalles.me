import useSWR from "swr";

import type { MusicMatch } from "@/entities/music-match";
import { getMusicMatch, type MusicMatchError } from "@/http/get-music-match";

type MusicMatchKey = readonly ["/api/music-match", string];

export function useMusicMatch(query: string | null) {
	return useSWR<MusicMatch, MusicMatchError, MusicMatchKey | null>(
		query === null ? null : ["/api/music-match", query],
		([, matchQuery]) => getMusicMatch(matchQuery),
		{ revalidateOnFocus: false, shouldRetryOnError: false },
	);
}
