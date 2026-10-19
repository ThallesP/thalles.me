export const LASTFM_USERNAME = "thallesp";

export class LastFmUserNotFoundError extends Error {
	constructor(readonly username: string) {
		super(`Last.fm user ${username} not found`);
	}
}

const PLACEHOLDER_IMAGE_HASH = "2a96cbd8b46e442fc41c2b86b821562f";

export type LastFmImage = {
	size: "small" | "medium" | "large" | "extralarge";
	"#text": string;
};

export function getLargestImageUrl(images: LastFmImage[]) {
	const { "#text": url } = images[images.length - 1];
	const isMissing = url === "" || url.includes(PLACEHOLDER_IMAGE_HASH);

	return isMissing ? null : url;
}
