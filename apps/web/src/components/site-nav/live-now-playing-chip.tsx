import { connection } from "next/server";

import { getRecentTracks } from "@/http/get-recent-tracks";

import { NowPlayingChip } from "./now-playing-chip";

export async function LiveNowPlayingChip() {
	await connection();

	return <NowPlayingChip listening={await getRecentTracks()} />;
}
