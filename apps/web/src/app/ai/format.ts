const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function getLastDates(dayCount: number) {
	const today = new Intl.DateTimeFormat("en-CA", {
		timeZone: "America/Sao_Paulo",
	}).format(new Date());
	const todayInMs = Date.parse(today);

	return Array.from({ length: dayCount }, (_, index) =>
		new Date(todayInMs - (dayCount - 1 - index) * DAY_IN_MS)
			.toISOString()
			.slice(0, 10),
	);
}

export function formatShortDate(dateYYYYMMDD: string) {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	}).format(Date.parse(dateYYYYMMDD));
}

export function formatCompactNumber(value: number) {
	return new Intl.NumberFormat("en-US", {
		notation: "compact",
		maximumFractionDigits: 1,
	}).format(value);
}

export function formatShare(share: number) {
	return new Intl.NumberFormat("en-US", {
		style: "percent",
		minimumFractionDigits: 1,
		maximumFractionDigits: 1,
	}).format(share);
}
