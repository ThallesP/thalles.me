import { z } from "zod";

export const homeLabStatsSchema = z.object({
	bootedAtMs: z.number().int().positive(),
	cpuUsagePercent: z.number().min(0).max(100),
	memoryUsedBytes: z.number().nonnegative(),
	memoryTotalBytes: z.number().positive(),
	arrayUsedBytes: z.number().nonnegative(),
	arrayTotalBytes: z.number().positive(),
	runningContainerCount: z.number().int().nonnegative(),
	isDevVmOnline: z.boolean(),
});

export type HomeLabStats = z.infer<typeof homeLabStatsSchema>;

export type HomeLabSnapshot = HomeLabStats & {
	receivedAtMs: number;
};
