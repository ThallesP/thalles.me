import { cacheLife } from "next/cache";

import { ENV } from "@/env.server";

import { getLargestImageUrl, type LastFmImage } from "./lastfm";

type UserInfoResponse = {
	user: {
		name: string;
		url: string;
		playcount: string;
		image: LastFmImage[];
	};
};

export type LastFmUser = {
	name: string;
	url: string;
	avatarUrl: string | null;
	playCount: number;
};

export async function getLastFmUser(
	username: string,
): Promise<LastFmUser | null> {
	"use cache";
	cacheLife("hours");

	const search = new URLSearchParams({
		method: "user.getinfo",
		user: username,
		api_key: ENV.LASTFM_API_KEY,
		format: "json",
	});
	const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${search}`);
	if (response.status === 404) return null;
	if (!response.ok)
		throw new Error(`Last.fm user request failed with ${response.status}`);

	const { user }: UserInfoResponse = await response.json();

	return {
		name: user.name,
		url: user.url,
		avatarUrl: getLargestImageUrl(user.image),
		playCount: Number(user.playcount),
	};
}
