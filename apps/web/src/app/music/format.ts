export function formatPlayedAgo(playedAtMs: number, nowMs: number) {
	const minutesAgo = Math.round((nowMs - playedAtMs) / 60_000);
	if (minutesAgo < 60) return `${minutesAgo} min ago`;

	const hoursAgo = Math.round(minutesAgo / 60);
	if (hoursAgo < 24) return `${hoursAgo} hr ago`;

	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		timeZone: "America/Sao_Paulo",
	}).format(playedAtMs);
}
