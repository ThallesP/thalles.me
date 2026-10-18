export type ServerStats = {
	uptimeInDays: number;
	cpuUsagePercent: number;
	memoryUsedInGB: number;
	memoryTotalInGB: number;
	arrayUsedInTB: number;
	arrayTotalInTB: number;
	runningContainerCount: number;
	updatedMinutesAgo: number;
};
