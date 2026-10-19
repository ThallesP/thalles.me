import { connection } from "next/server";

import { getHomeLabSnapshot } from "@/lib/home-lab-store";

import { HomeLabSections } from "./home-lab-sections";

export async function LiveHomeLabSections() {
	await connection();

	return <HomeLabSections snapshot={getHomeLabSnapshot()} nowMs={Date.now()} />;
}
