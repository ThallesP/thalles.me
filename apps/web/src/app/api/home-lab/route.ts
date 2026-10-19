import { timingSafeEqual } from "node:crypto";

import { homeLabStatsSchema } from "@/entities/home-lab-stats";
import { ENV } from "@/env.server";
import { saveHomeLabSnapshot } from "@/lib/home-lab-store";

function isAuthorized(authorization: string | null) {
	const expected = Buffer.from(`Bearer ${ENV.HOME_LAB_PUSH_TOKEN}`);
	const received = Buffer.from(authorization ?? "");

	return (
		received.length === expected.length && timingSafeEqual(received, expected)
	);
}

export async function POST(request: Request) {
	if (!isAuthorized(request.headers.get("authorization")))
		return Response.json({ error: "UNAUTHORIZED" }, { status: 401 });

	const parsed = homeLabStatsSchema.safeParse(await request.json());
	if (!parsed.success)
		return Response.json({ error: "INVALID_STATS" }, { status: 400 });

	saveHomeLabSnapshot({ ...parsed.data, receivedAtMs: Date.now() });

	return new Response(null, { status: 204 });
}
