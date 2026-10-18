const units: [Intl.RelativeTimeFormatUnit, number][] = [
	["year", 365 * 86_400_000],
	["month", 30 * 86_400_000],
	["week", 7 * 86_400_000],
	["day", 86_400_000],
	["hour", 3_600_000],
	["minute", 60_000],
];

const relativeTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatTimeAgo(elapsedMs: number) {
	const match = units.find(([, unitMs]) => elapsedMs >= unitMs);
	if (!match) return "just now";

	const [unit, unitMs] = match;
	return relativeTime.format(-Math.round(elapsedMs / unitMs), unit);
}
