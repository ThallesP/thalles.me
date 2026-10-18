export type TokenUsageDay = {
	date: string;
	key: string;
	outputTokens: number;
	spendUsd: number;
	totalTokens: number;
};

export type TokenProfileStats = {
	activeDays: number;
	avgSpendPerActiveDay: number;
	currentStreakDays: number;
	deviceCount: number;
	firstDate: string;
	lastDate: string;
	leaderboardRank: number;
	longestStreakDays: number;
	peakDay: {
		date: string;
		spendUsd: number;
	};
	sessionCount: number;
	sources: string[];
	spendUsd: number;
	topModel: {
		model: string;
		spendUsd: number;
	};
	totalTokens: number;
};

export function isTrackedUsageKey(key: string) {
	return (
		!key.startsWith("model_placeholder_") &&
		key !== "Other" &&
		key !== "unknown"
	);
}

export function sumTotalTokens(days: TokenUsageDay[]) {
	return days.reduce((total, day) => total + day.totalTokens, 0);
}

export function sumOutputTokens(days: TokenUsageDay[]) {
	return days.reduce((total, day) => total + day.outputTokens, 0);
}

export function getTokenShare(days: TokenUsageDay[], key: string) {
	const trackedDays = days.filter((day) => isTrackedUsageKey(day.key));

	return (
		sumTotalTokens(trackedDays.filter((day) => day.key === key)) /
		sumTotalTokens(trackedDays)
	);
}

export function getTotalTokensPerDay(days: TokenUsageDay[], dates: string[]) {
	return dates.map((date) =>
		sumTotalTokens(days.filter((day) => day.date === date)),
	);
}
