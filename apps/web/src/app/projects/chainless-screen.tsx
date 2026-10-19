import { cn } from "@thalles-me/ui/lib/utils";
import {
	ArrowDown,
	ArrowDownUp,
	ArrowUpRight,
	Bell,
	ChartNoAxesColumn,
	ChevronRight,
	CreditCard,
	Diamond,
	Eye,
	House,
	Info,
	Mail,
	TrendingUp,
	Wallet,
} from "lucide-react";

const balances = [
	{
		currency: "Real (BRZ)",
		symbol: "R$",
		amount: "R$ 3200,10",
		badgeClassName: "bg-[#0e8a4f] text-[#f9d34a]",
	},
	{
		currency: "Dólar (USDC)",
		symbol: "$",
		amount: "$200,00",
		badgeClassName: "bg-[#1f6bff] text-white",
	},
	{
		currency: "Bitcoin (BTC)",
		symbol: "₿",
		amount: "0,0042 BTC",
		badgeClassName: "bg-[#f7931a] text-white",
	},
];

const actions = [
	{ label: "Pix", Icon: Diamond },
	{ label: "Receber", Icon: ArrowDown },
	{ label: "Enviar", Icon: ArrowUpRight },
	{ label: "Converter", Icon: ArrowDownUp },
	{ label: "Investir", Icon: TrendingUp },
];

const markets = [
	{
		name: "Bitcoin",
		ticker: "BTC",
		price: "R$ 352.418,20",
		change: "+2,41%",
		isUp: true,
		coinClassName: "bg-[#f7931a]",
	},
	{
		name: "Ethereum",
		ticker: "ETH",
		price: "R$ 13.204,55",
		change: "+1,12%",
		isUp: true,
		coinClassName: "bg-[#627eea]",
	},
	{
		name: "Avalanche",
		ticker: "AVAX",
		price: "R$ 143,77",
		change: "+4,05%",
		isUp: true,
		coinClassName: "bg-[#e84142]",
	},
	{
		name: "Solana",
		ticker: "SOL",
		price: "R$ 812,30",
		change: "-0,84%",
		isUp: false,
		coinClassName: "bg-[#9945ff]",
	},
	{
		name: "Chainlink",
		ticker: "LINK",
		price: "R$ 78,12",
		change: "-1,30%",
		isUp: false,
		coinClassName: "bg-[#2a5ada]",
	},
	{
		name: "Aave",
		ticker: "AAVE",
		price: "R$ 1.402,90",
		change: "+0,57%",
		isUp: true,
		coinClassName: "bg-[#b6509e]",
	},
];

const tabs = [
	{ label: "Início", Icon: House, isActive: true },
	{ label: "Portfólio", Icon: Wallet, isActive: false },
	{ label: "Investir", Icon: ChartNoAxesColumn, isActive: false },
	{ label: "Cartão", Icon: CreditCard, isActive: false },
];

const noScrollbar = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export function ChainlessScreen() {
	return (
		<div className="relative bg-[#fcc934] text-white">
			<header className="px-[22px] pt-3 pb-12 text-black">
				<div className="flex items-center gap-2.5">
					<span className="grid size-[38px] place-items-center rounded-full bg-[#2f3438] font-semibold text-[#fcc934] text-base">
						U
					</span>
					<span className="flex-1 font-bold text-[20px]">Olá Usuário</span>
					<Eye aria-hidden className="size-6" strokeWidth={1.75} />
					<Bell aria-hidden className="ml-3 size-6" strokeWidth={1.75} />
				</div>
				<p className="mt-8 font-semibold text-[15px]">Meu patrimônio</p>
				<p className="mt-1 font-bold text-[37px] leading-tight tracking-[-0.01em]">
					R$ 5.124,00
				</p>
			</header>
			<div className="-mt-6 rounded-tl-[20px] bg-[#0b0b0c] pb-6">
				<h2 className="px-[22px] pt-6 font-bold text-[19px]">
					Saldo para investir
				</h2>
				<div
					className={cn(
						"mt-4 flex snap-x snap-mandatory scroll-px-[22px] gap-5 overflow-x-auto px-[22px]",
						noScrollbar,
					)}
				>
					{balances.map(({ currency, symbol, amount, badgeClassName }) => (
						<div
							key={currency}
							className="flex h-[131px] w-[258px] shrink-0 snap-start flex-col justify-between rounded-[5px] bg-[#1f2023] p-5"
						>
							<span className="flex items-center gap-2.5 text-[#c7c8cc] text-[16px]">
								<span
									className={cn(
										"grid size-6 place-items-center rounded-full font-bold text-[10px]",
										badgeClassName,
									)}
								>
									{symbol}
								</span>
								<span className="flex-1">{currency}</span>
								<Info aria-hidden className="size-[18px] text-[#8e8f94]" />
							</span>
							<span className="font-bold text-[26px]">{amount}</span>
						</div>
					))}
				</div>
				<div
					className={cn(
						"mt-7 flex gap-6 overflow-x-auto px-[22px]",
						noScrollbar,
					)}
				>
					{actions.map(({ label, Icon }) => (
						<button
							key={label}
							type="button"
							className="flex w-[78px] shrink-0 flex-col items-center gap-2.5 text-[#e4e4e7] text-[15px]"
						>
							<span className="grid size-[78px] place-items-center rounded-full bg-[#232427]">
								<Icon aria-hidden className="size-7" strokeWidth={1.5} />
							</span>
							{label}
						</button>
					))}
				</div>
				<hr className="mt-7 border-[#2a2b2e]" />
				<div className="mt-10 px-[22px]">
					<div className="flex h-[104px] overflow-hidden rounded-[5px] bg-[#1f2023]">
						<span className="grid w-[68px] shrink-0 place-items-center bg-linear-to-b from-[#fff4cc] to-[#fcc934] text-black">
							<Mail aria-hidden className="size-7" strokeWidth={1.75} />
						</span>
						<span className="flex flex-1 flex-col justify-center gap-1 px-3.5">
							<span className="font-bold text-[18px]">Convide seus amigos</span>
							<span className="text-[#b4b5b9] text-[15px] leading-snug">
								Ofereça uma chave de acesso especial para seus convidados.
							</span>
						</span>
						<ChevronRight
							aria-hidden
							className="mr-2 size-5 self-center text-[#fcc934]"
						/>
					</div>
					<div className="mt-3.5 flex justify-center gap-2">
						<i className="size-2 rounded-full bg-[#fcc934]" />
						<i className="size-2 rounded-full bg-[#3a3b3f]" />
					</div>
				</div>
				<hr className="mt-6 border-[#2a2b2e]" />
				<div className="mt-8 flex items-baseline justify-between px-[22px]">
					<h2 className="font-bold text-[20px]">Dados do mercado</h2>
					<span className="text-[#fcc934] text-[15px]">Ver tudo</span>
				</div>
				<ul className="mt-3 px-[22px]">
					{markets.map(
						({ name, ticker, price, change, isUp, coinClassName }) => (
							<li
								key={ticker}
								className="flex items-center gap-3 border-[#1f2023] border-b py-3.5 last:border-b-0"
							>
								<span
									className={cn(
										"grid size-10 place-items-center rounded-full font-bold text-[13px]",
										coinClassName,
									)}
								>
									{ticker.slice(0, 1)}
								</span>
								<span className="flex flex-1 flex-col">
									<span className="font-semibold text-[16px]">{name}</span>
									<span className="text-[#8e8f94] text-[14px]">{ticker}</span>
								</span>
								<span className="flex flex-col items-end">
									<span className="font-semibold text-[16px]">{price}</span>
									<span
										className={cn(
											"text-[14px]",
											isUp ? "text-[#3fbf7f]" : "text-[#ef5350]",
										)}
									>
										{change}
									</span>
								</span>
							</li>
						),
					)}
				</ul>
			</div>
			<nav className="sticky bottom-0 flex border-[#2a2b2e] border-t bg-[#0b0b0c] pt-2.5 pb-7">
				{tabs.map(({ label, Icon, isActive }) => (
					<button
						key={label}
						type="button"
						className={cn(
							"flex flex-1 flex-col items-center gap-1 text-[13px]",
							isActive ? "font-semibold text-[#fcc934]" : "text-[#c7c8cc]",
						)}
					>
						<Icon aria-hidden className="size-6" strokeWidth={1.5} />
						{label}
					</button>
				))}
			</nav>
		</div>
	);
}
