import { cn } from "@thalles-me/ui/lib/utils";
import {
	Award,
	Boxes,
	ChevronDown,
	Globe,
	House,
	Mail,
	Map as MapIcon,
	PenLine,
	Phone,
	Search,
	TreePalm,
} from "lucide-react";

const navItems = [
	{ label: "Rede de Planejamento", className: "text-[#38b6f5]" },
	{ label: "Espaços Públicos", className: "text-[#4ade80]" },
	{ label: "Mobilidade", className: "text-[#f87171]" },
	{ label: "Equipamentos Comunitários", className: "text-[#fb923c]" },
	{ label: "Plano Diretor", className: "text-[#3b9cf6]" },
	{ label: "Gestão Territorial", className: "text-[#c4b5fd]" },
	{ label: "Participação e Gestão", className: "text-[#facc15]" },
	{ label: "Meio Ambiente", className: "text-[#a3b83b]" },
];

const services = [
	{
		title: "Floripa Para Todos",
		description: "Programa de Desenvolvimento Urbano de Florianópolis",
		Icon: House,
	},
	{
		title: "Floripa Regular",
		description: "Programa de Regularização Fundiária de Florianópolis",
		Icon: House,
	},
	{
		title: "Consulta de Viabilidade para Instalação",
		description:
			"GeoPortal - Consulta de Viabilidade para Instalação Automatizada",
		Icon: MapIcon,
	},
	{
		title: "Consulta para Fins de Construção",
		description: "GeoPortal - Consulta Automatizada para Fins de Construção",
		Icon: MapIcon,
	},
	{
		title: "Consulta Ambiental",
		description: "GeoPortal - Consulta Ambiental Automatizada",
		Icon: MapIcon,
	},
	{
		title: "Floripa em Números Indicadores",
		description:
			"Acompanhe o desempenho das principais políticas públicas de Florianópolis",
		Icon: Award,
	},
	{
		title: "Certidão de Endereço",
		description: "GeoPortal - Certidão de Endereço",
		Icon: MapIcon,
	},
	{
		title: "Certidão de Confrontantes",
		description: "GeoPortal - Certidão de Confrontantes",
		Icon: MapIcon,
	},
	{
		title: "Guia de Desenho Urbano",
		description: "Conjunto de guias e orientações de desenho urbano",
		Icon: PenLine,
	},
	{
		title: "Repositório",
		description: "Repositório de documentos da REPLAN",
		Icon: Boxes,
	},
	{
		title: "INs - FLORAM",
		description: "Instruções Normativas da Fundação Municipal do Meio Ambiente",
		Icon: TreePalm,
	},
];

const booklets = [
	{
		title: "Plano Municipal de Habitação de Interesse Social",
		summary: "",
		thumbClassName: "from-[#c9b79a] to-[#5f7d4e]",
	},
	{
		title: "Caderno de Soluções Habitacionais",
		summary: "Este caderno foi realizado com a...",
		thumbClassName: "from-[#e5e7eb] to-[#1e3a6e]",
	},
];

const heroBackground = [
	"linear-gradient(180deg, #0a1035 0%, rgb(10 16 53 / 0.55) 28%, rgb(10 16 53 / 0.35) 70%, rgb(10 16 53 / 0.6) 100%)",
	"radial-gradient(60% 70% at 78% 55%, #2f5a3a 0%, transparent 70%)",
	"radial-gradient(45% 60% at 18% 70%, #7a6655 0%, transparent 75%)",
	"radial-gradient(35% 50% at 62% 30%, #3e6f8f 0%, transparent 80%)",
	"linear-gradient(180deg, #2c4660, #39553f)",
].join(", ");

type WordmarkProps = {
	top: string;
	bottom: string;
	className: string;
};

function Wordmark({ top, bottom, className }: WordmarkProps) {
	return (
		<span
			className={cn(
				"flex flex-col font-black text-[19px] uppercase leading-[0.95] tracking-[-0.02em]",
				className,
			)}
		>
			<span className="text-[11px] tracking-normal">{top}</span>
			{bottom}
		</span>
	);
}

export function RedeDePlanejamentoScreen() {
	return (
		<div className="bg-white font-sans text-[#0f172a] text-sm">
			<div style={{ backgroundImage: heroBackground }}>
				<header className="mx-auto w-[1100px]">
					<div className="flex items-center pt-4">
						<span className="flex items-center gap-4">
							<Wordmark
								top="Prefeitura de"
								bottom="Florianópolis"
								className="text-white"
							/>
							<i className="h-11 w-px bg-white/70" />
							<Wordmark
								top="Rede de"
								bottom="Planejamento"
								className="text-white"
							/>
						</span>
						<span className="ml-auto flex items-center gap-1.5 font-semibold text-[13px] text-white/80">
							<Globe aria-hidden className="size-4" />
							PT-BR
							<ChevronDown aria-hidden className="size-3.5" />
						</span>
					</div>
					<nav className="mt-7 flex justify-between">
						{navItems.map(({ label, className }) => (
							<span
								key={label}
								className={cn(
									"flex h-9 items-center gap-1 whitespace-nowrap rounded-md bg-[#1a2148] px-2.5 text-[10.5px]",
									className,
								)}
							>
								{label}
								<ChevronDown aria-hidden className="size-3" />
							</span>
						))}
					</nav>
				</header>
				<section className="flex h-[560px] flex-col items-center justify-center pb-10 text-white">
					<p className="font-light text-[28px] tracking-[-0.01em]">
						Bem vindo a
					</p>
					<h1 className="font-bold text-[50px] leading-tight tracking-[-0.03em]">
						Rede de Planejamento
					</h1>
					<div className="mt-3 flex h-[50px] w-[700px] items-center gap-3 rounded-md bg-white/25 pr-1.5 pl-4 backdrop-blur-sm">
						<Search aria-hidden className="size-5" />
						<span className="flex-1 text-[17px] text-white/85">
							O que você procura?
						</span>
						<button
							type="button"
							className="h-[38px] rounded-md bg-white px-3 font-medium text-[#0f172a]"
						>
							Pesquisar
						</button>
					</div>
				</section>
			</div>
			<section className="bg-[#f8fafc] py-12">
				<ul className="mx-auto grid w-[1100px] grid-cols-6 gap-7">
					{services.map(({ title, description, Icon }) => (
						<li
							key={title}
							className="flex min-h-[216px] flex-col items-center rounded-md bg-[#f1f4f8] px-5 pt-4 pb-6 text-center"
						>
							<Icon aria-hidden className="size-5" strokeWidth={1.75} />
							<span className="mt-2 font-semibold text-[12.5px] leading-[1.9]">
								{title}
							</span>
							<span className="mt-1 text-[#64748b] text-[13px] leading-[1.85]">
								{description}
							</span>
						</li>
					))}
				</ul>
			</section>
			<section className="grid grid-cols-2">
				<div className="flex flex-col justify-center bg-[#fdf0f5] py-36 pr-16 pl-[90px]">
					<span className="flex h-[52px] w-fit items-center gap-3.5 bg-[#e94a8a] pr-9 pl-4 text-[15px] text-white [clip-path:polygon(0_0,94%_0,100%_50%,94%_100%,0_100%)]">
						<span className="rounded-sm bg-[#e8642c] px-2 py-1 font-black text-[9px] leading-none">
							CADASTRO
						</span>
						<i className="h-5 w-px bg-white/70" />
						CADASTRO HABITACIONAL SOCIAL ONLINE
					</span>
					<h2 className="mt-4 font-semibold text-[#e94a8a] text-[46px] tracking-[-0.02em]">
						Habitação Social
					</h2>
					<p className="mt-6 max-w-[440px] text-[#d6336c] text-[13px] leading-[1.85]">
						Faça parte do Cadastro Habitacional Social Online! O processo é
						simples e você dá o primeiro passo para o município cadastrar a
						demanda por habitação popular e planejar suas habitações.
					</p>
				</div>
				<div className="py-12 pr-[90px] pl-12">
					<span className="inline-block rounded-md bg-[#f1f5f9] px-3 py-2.5 text-[13px]">
						Cadernos/Cartilhas
					</span>
					<p className="mt-12 font-medium text-[#475569] text-[11px] uppercase">
						Em destaque
					</p>
					<ul className="mt-6 rounded-md border border-[#e2e8f0]">
						{booklets.map(({ title, summary, thumbClassName }) => (
							<li
								key={title}
								className="flex items-center gap-4 border-[#e2e8f0] border-b p-4 last:border-b-0"
							>
								<i
									className={cn(
										"size-14 shrink-0 rounded-sm bg-linear-to-b",
										thumbClassName,
									)}
								/>
								<span className="flex flex-1 flex-col gap-1 text-[13px]">
									{title}
									<span className="text-[#64748b]">{summary}</span>
								</span>
								<span className="font-medium text-[13px]">
									Ver caderno/cartilha
								</span>
							</li>
						))}
					</ul>
					<span className="mx-auto mt-10 block w-fit rounded-md border border-[#e2e8f0] px-4 py-2.5 font-medium">
						Ver todos
					</span>
				</div>
			</section>
			<footer>
				<div className="h-8 bg-[#1e3466]" />
				<div className="mx-auto flex w-[1100px] items-center border-[#1e3466] border-b-2 py-8">
					<Wordmark
						top="Prefeitura de"
						bottom="Florianópolis"
						className="text-[#1e3466]"
					/>
					<span className="ml-auto text-right text-[#64748b] text-[13px]">
						Realização:
						<span className="block font-bold text-[#1e3466] text-[22px]">
							smartLAB FLORIPA
						</span>
					</span>
				</div>
				<div className="mx-auto grid w-[1100px] grid-cols-3 py-12 text-[13px]">
					<p className="self-end text-[#64748b]">
						© 2024 REPLAN - Prefeitura de Florianópolis.
					</p>
					<div className="flex flex-col gap-3">
						<span className="font-semibold">Contato</span>
						<span className="flex items-center gap-3">
							<Phone aria-hidden className="size-5" strokeWidth={1.5} />
							(48) 3113-1656
						</span>
						<span className="flex items-center gap-3">
							<Mail aria-hidden className="size-5" strokeWidth={1.5} />
							redeplanejamento@floripa.sc.gov.br
						</span>
					</div>
					<div className="flex flex-col gap-1.5 justify-self-end">
						<span className="mb-1.5 font-semibold">Endereço</span>
						<span>Prefeitura de Florianópolis</span>
						<span>Av. Osmar Cunha, 77</span>
						<span>SC - Centro, Florianópolis CEP: 88015-100</span>
					</div>
				</div>
				<div className="bg-[#070b24] py-2.5">
					<span className="mx-auto flex w-[1100px] gap-6 text-[11px] text-white">
						<span>Preferência de Cookies</span>
						<span>Mapa do site</span>
					</span>
				</div>
			</footer>
		</div>
	);
}
