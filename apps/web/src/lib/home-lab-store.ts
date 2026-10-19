import type { HomeLabSnapshot } from "@/entities/home-lab-stats";

declare global {
	var homeLabSnapshot: HomeLabSnapshot | undefined;
}

export function saveHomeLabSnapshot(snapshot: HomeLabSnapshot) {
	globalThis.homeLabSnapshot = snapshot;
}

export function getHomeLabSnapshot() {
	return globalThis.homeLabSnapshot ?? null;
}
