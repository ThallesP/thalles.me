const UNRAID_GRAPHQL_URL = "http://127.0.0.1:9000/graphql";
const PUSH_INTERVAL_MS = 60_000;
const KILOBYTE_IN_BYTES = 1024;

const STATS_QUERY = `{
	info { os { uptime } }
	metrics { cpu { percentTotal } memory { total available } }
	array { capacity { kilobytes { used total } } }
	vms { domains { name state } }
	docker { containers { state } }
}`;

type StatsResponse = {
	data: {
		info: { os: { uptime: string } };
		metrics: {
			cpu: { percentTotal: number };
			memory: { total: number; available: number };
		};
		array: { capacity: { kilobytes: { used: string; total: string } } };
		vms: { domains: { name: string; state: string }[] };
		docker: { containers: { state: string }[] };
	};
};

function requireEnv(name: string) {
	const value = process.env[name];
	if (!value) throw new Error(`${name} is required`);

	return value;
}

const unraidApiKey = requireEnv("UNRAID_API_KEY");
const pushUrl = requireEnv("PUSH_URL");
const pushToken = requireEnv("PUSH_TOKEN");
const devVmName = requireEnv("DEV_VM_NAME");

async function collectStats() {
	const response = await fetch(UNRAID_GRAPHQL_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json", "x-api-key": unraidApiKey },
		body: JSON.stringify({ query: STATS_QUERY }),
	});
	if (!response.ok)
		throw new Error(`Unraid stats request failed with ${response.status}`);

	const { data }: StatsResponse = await response.json();
	const { memory, cpu } = data.metrics;
	const { kilobytes } = data.array.capacity;

	return {
		bootedAtMs: Date.parse(data.info.os.uptime),
		cpuUsagePercent: cpu.percentTotal,
		memoryUsedBytes: memory.total - memory.available,
		memoryTotalBytes: memory.total,
		arrayUsedBytes: Number(kilobytes.used) * KILOBYTE_IN_BYTES,
		arrayTotalBytes: Number(kilobytes.total) * KILOBYTE_IN_BYTES,
		runningContainerCount: data.docker.containers.filter(
			(container) => container.state === "RUNNING",
		).length,
		isDevVmOnline: data.vms.domains.some(
			(domain) => domain.name === devVmName && domain.state === "RUNNING",
		),
	};
}

async function pushStats() {
	const response = await fetch(pushUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${pushToken}`,
		},
		body: JSON.stringify(await collectStats()),
	});
	if (!response.ok) throw new Error(`Push failed with ${response.status}`);
}

while (true) {
	await pushStats().catch((error: unknown) => console.error(error));
	await Bun.sleep(PUSH_INTERVAL_MS);
}
