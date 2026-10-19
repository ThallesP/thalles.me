import { cn } from "@thalles-me/ui/lib/utils";
import {
	BookOpen,
	ChartNoAxesColumn,
	ChevronDown,
	ChevronsUpDown,
	Coins,
	Moon,
	Wallet,
	WandSparkles,
} from "lucide-react";

const tabs = [
	"Analytics",
	"Wallets",
	"Webhooks",
	"API Key",
	"Whitelist",
	"Settings",
];

const ranges = ["7 days", "30 days", "90 days", "365 days"];

const stats = [
	{ title: "Total Swaps", value: "23,521", Icon: Wallet },
	{
		title: "Total Swap Volume",
		value: "$10,382,019.68",
		Icon: ChartNoAxesColumn,
	},
	{ title: "Total Collected Swap Fee", value: "$50,431.38", Icon: Coins },
];

const chains = [
	{ name: "Base", className: "bg-[#0052ff]" },
	{ name: "Polygon", className: "bg-[#8247e5]" },
	{ name: "Avalanche", className: "bg-[#e5413e]" },
	{ name: "Arbitrum", className: "bg-[#28a0f0]" },
	{ name: "Ethereum", className: "bg-[#6276e8]" },
	{ name: "BNB Chain", className: "bg-[#f3ba2f]" },
];

const days = [
	{
		label: "Nov 1, 2025",
		swaps: [64, 1124, 524, 417, 182, 214],
		volume: [25e3, 434e3, 202e3, 161e3, 70e3, 83e3],
	},
	{
		label: "Nov 2, 2025",
		swaps: [64, 1348, 610, 449, 150, 246],
		volume: [25e3, 527e3, 238e3, 175e3, 59e3, 96e3],
	},
	{
		label: "Nov 3, 2025",
		swaps: [64, 1198, 567, 449, 150, 225],
		volume: [28e3, 528e3, 250e3, 198e3, 66e3, 99e3],
	},
	{
		label: "Nov 4, 2025",
		swaps: [64, 1241, 599, 471, 150, 225],
		volume: [30e3, 573e3, 277e3, 218e3, 69e3, 104e3],
	},
	{
		label: "Nov 5, 2025",
		swaps: [64, 1177, 546, 428, 182, 235],
		volume: [27e3, 505e3, 234e3, 184e3, 78e3, 101e3],
	},
	{
		label: "Nov 6, 2025",
		swaps: [64, 1241, 556, 428, 171, 246],
		volume: [26e3, 514e3, 230e3, 177e3, 71e3, 102e3],
	},
	{
		label: "Nov 7, 2025",
		swaps: [64, 1156, 578, 439, 171, 193],
		volume: [30e3, 533e3, 267e3, 203e3, 79e3, 89e3],
	},
	{
		label: "Nov 8, 2025",
		swaps: [64, 995, 482, 396, 139, 203],
		volume: [37e3, 581e3, 281e3, 231e3, 81e3, 118e3],
	},
	{
		label: "Nov 9, 2025",
		swaps: [32, 706, 321, 268, 96, 107],
		volume: [18e3, 397e3, 180e3, 151e3, 54e3, 60e3],
	},
];

const recentSwaps = [
	{
		wallet: "0x3f2a…9c1e",
		chain: "Polygon",
		from: "1,250.00 USDC",
		to: "6,812.40 BRZ",
		fee: "$6.25",
		date: "Nov 9, 14:32",
	},
	{
		wallet: "0x71b4…02ad",
		chain: "Base",
		from: "0.4200 ETH",
		to: "1,398.11 USDC",
		fee: "$7.01",
		date: "Nov 9, 14:05",
	},
	{
		wallet: "0x9d0c…e47f",
		chain: "Avalanche",
		from: "52.00 AVAX",
		to: "1,904.36 USDC",
		fee: "$9.52",
		date: "Nov 9, 13:48",
	},
	{
		wallet: "0x22e8…b3a0",
		chain: "Arbitrum",
		from: "800.00 USDT",
		to: "799.42 USDC",
		fee: "$4.00",
		date: "Nov 9, 13:17",
	},
	{
		wallet: "0xa615…7d9b",
		chain: "Polygon",
		from: "3,000.00 BRZ",
		to: "548.90 USDC",
		fee: "$2.74",
		date: "Nov 9, 12:59",
	},
	{
		wallet: "0x5b7e…41c2",
		chain: "Ethereum",
		from: "0.0150 WBTC",
		to: "1,421.06 USDC",
		fee: "$7.11",
		date: "Nov 9, 12:30",
	},
	{
		wallet: "0xc0d3…8e15",
		chain: "BNB Chain",
		from: "2.10 BNB",
		to: "1,312.77 USDT",
		fee: "$6.56",
		date: "Nov 9, 11:54",
	},
];

const card = "rounded-lg border border-[#27272a]";

type StackedBarChartProps = {
	title: string;
	description: string;
	maxValue: number;
	ticks: string[];
	series: "swaps" | "volume";
};

function StackedBarChart({
	title,
	description,
	maxValue,
	ticks,
	series,
}: StackedBarChartProps) {
	return (
		<section className={cn(card, "px-6 pt-6 pb-5")}>
			<h2 className="font-semibold text-[18px]">{title}</h2>
			<p className="mt-1.5 text-[#a1a1aa] text-sm">{description}</p>
			<div className="relative mt-10 ml-24 flex h-[250px] items-end gap-6 px-3">
				<div className="absolute inset-0 flex flex-col justify-between">
					{ticks.map((tick) => (
						<i key={tick} className="relative h-px bg-[#27272a]">
							<span className="absolute right-full mr-3 -translate-y-1/2 text-[#a1a1aa] text-xs not-italic">
								{tick}
							</span>
						</i>
					))}
				</div>
				{days.map((day) => (
					<div
						key={day.label}
						className="relative flex h-full flex-1 flex-col-reverse"
					>
						{day[series].map((value, index) => (
							<i
								key={chains[index].name}
								className={cn(
									"border-black/20 border-t",
									chains[index].className,
								)}
								style={{ height: `${(value / maxValue) * 100}%` }}
							/>
						))}
					</div>
				))}
			</div>
			<div className="mt-2 ml-24 flex gap-6 px-3 text-[#a1a1aa] text-xs">
				{days.map((day) => (
					<span key={day.label} className="flex-1 text-center">
						{day.label}
					</span>
				))}
			</div>
		</section>
	);
}

export function NotusDashboardScreen() {
	return (
		<div className="min-h-[900px] bg-[#0a0a0a] pb-12 text-[#fafafa] text-sm">
			<header className="flex h-[62px] items-center border-[#27272a] border-b px-[52px]">
				<span className="grid size-8 place-items-center rounded-full bg-[#ff4d2e]">
					<i className="h-3.5 w-2.5 -skew-x-12 rounded-[2px] bg-white" />
				</span>
				<span className="mx-4 text-[#71717a]">/</span>
				<span className="flex items-center gap-3 font-medium">
					Thalles Organization
					<ChevronsUpDown aria-hidden className="size-4 text-[#a1a1aa]" />
				</span>
				<span className="mx-4 text-[#71717a]">/</span>
				<span className="flex w-[170px] items-center justify-between font-medium">
					ThallesPay
					<ChevronsUpDown aria-hidden className="size-4 text-[#a1a1aa]" />
				</span>
				<span className="ml-auto flex items-center gap-2.5">
					<span className={cn(card, "grid size-9 place-items-center")}>
						<Moon aria-hidden className="size-4" />
					</span>
					<span
						className={cn(card, "flex h-9 items-center gap-2 px-4 font-medium")}
					>
						Documentation
						<BookOpen aria-hidden className="size-4" />
					</span>
					<span className="grid size-10 place-items-center rounded-full bg-[#2f6a1f] text-lg">
						T
					</span>
				</span>
			</header>
			<nav className="border-[#27272a] border-b px-[52px] py-2">
				<span className="inline-flex rounded-md bg-[#27272a] p-1">
					{tabs.map((tab, index) => (
						<span
							key={tab}
							className={cn(
								"rounded-[5px] px-3 py-1.5 font-medium",
								index === 0 ? "bg-[#0a0a0a]" : "text-[#a1a1aa]",
							)}
						>
							{tab}
						</span>
					))}
				</span>
			</nav>
			<main className="px-[52px] pt-9">
				<h1 className="font-semibold text-[25px]">Project Analytics</h1>
				<p className="mt-1 text-[#a1a1aa]">View transaction and wallet data</p>
				<div className="mt-7 flex items-center gap-2">
					<span
						className={cn(
							card,
							"flex h-[38px] w-[230px] items-center justify-between px-3",
						)}
					>
						Transactions
						<ChevronDown aria-hidden className="size-4 text-[#a1a1aa]" />
					</span>
					<span className="ml-auto inline-flex rounded-md bg-[#27272a] p-1">
						{ranges.map((range, index) => (
							<span
								key={range}
								className={cn(
									"rounded-[5px] px-3 py-1",
									index === 0 ? "bg-[#0a0a0a] font-medium" : "text-[#a1a1aa]",
								)}
							>
								{range}
							</span>
						))}
					</span>
					<span
						className={cn(
							card,
							"flex h-[38px] items-center gap-2 px-4 font-medium text-xs",
						)}
					>
						<WandSparkles aria-hidden className="size-4" />
						AI assistant
					</span>
				</div>
				<div className="mt-2 grid grid-cols-3 gap-4">
					{stats.map(({ title, value, Icon }) => (
						<div key={title} className={cn(card, "px-6 py-6")}>
							<span className="flex items-center gap-2.5 font-semibold text-[#d4d4d8] text-base">
								<Icon aria-hidden className="size-5" />
								{title}
							</span>
							<p className="mt-4 font-bold text-[26px]">{value}</p>
						</div>
					))}
				</div>
				<div className="mt-4 flex flex-col gap-4">
					<StackedBarChart
						title="Swaps"
						description="Amount of swaps made over a period of time"
						maxValue={3000}
						ticks={["3,000.00", "2,250.00", "1,500.00", "750.00", "0.00"]}
						series="swaps"
					/>
					<StackedBarChart
						title="Swaps Volume"
						description="Volume of swaps made over a period of time"
						maxValue={1_400_000}
						ticks={[
							"1,400,000.00",
							"1,050,000.00",
							"700,000.00",
							"350,000.00",
							"0.00",
						]}
						series="volume"
					/>
					<section className={card}>
						<div className="px-6 pt-6 pb-4">
							<h2 className="font-semibold text-[18px]">Recent swaps</h2>
							<p className="mt-1.5 text-[#a1a1aa]">
								Latest swaps made by wallets in this project
							</p>
						</div>
						<table className="w-full text-left">
							<thead className="text-[#a1a1aa]">
								<tr className="border-[#27272a] border-y">
									{["Wallet", "Chain", "From", "To", "Fee", "Date"].map(
										(column) => (
											<th key={column} className="px-6 py-3 font-medium">
												{column}
											</th>
										),
									)}
								</tr>
							</thead>
							<tbody>
								{recentSwaps.map(({ wallet, chain, from, to, fee, date }) => (
									<tr
										key={wallet}
										className="border-[#27272a] border-b last:border-b-0"
									>
										<td className="px-6 py-3.5 font-mono text-[#d4d4d8] text-[13px]">
											{wallet}
										</td>
										<td className="px-6 py-3.5">{chain}</td>
										<td className="px-6 py-3.5">{from}</td>
										<td className="px-6 py-3.5">{to}</td>
										<td className="px-6 py-3.5">{fee}</td>
										<td className="px-6 py-3.5 text-[#a1a1aa]">{date}</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
				</div>
			</main>
		</div>
	);
}
