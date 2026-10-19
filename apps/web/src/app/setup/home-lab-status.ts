import type { HomeLabSnapshot } from "@/entities/home-lab-stats";

export type HomeLabStatus = "waiting" | "online" | "offline";

const STALE_AFTER_MS = 3 * 60_000;

export function getHomeLabStatus(
	snapshot: HomeLabSnapshot | null,
	nowMs: number,
): HomeLabStatus {
	if (snapshot === null) return "waiting";
	if (nowMs - snapshot.receivedAtMs > STALE_AFTER_MS) return "offline";

	return "online";
}
