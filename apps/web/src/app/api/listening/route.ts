import { getRecentTracks } from "@/http/get-recent-tracks";

export async function GET() {
	return Response.json(await getRecentTracks("live"));
}
