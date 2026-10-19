const DAY_IN_MS = 86_400_000;

export function formatUptime(uptimeMs: number) {
	const days = Math.floor(uptimeMs / DAY_IN_MS);
	if (days === 0) return `${Math.floor(uptimeMs / 3_600_000)} hours`;

	return days === 1 ? "1 day" : `${days} days`;
}

export function formatGigabytes(bytes: number) {
	return Math.round(bytes / 1e9);
}

export function formatTerabytes(bytes: number) {
	return (bytes / 1e12).toFixed(1);
}
