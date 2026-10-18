import { buttonVariants } from "@thalles-me/ui/components/button";
import Image from "next/image";

import { HeroBackground } from "./hero-background";
import { Intro } from "./intro";

const socialLinks = [
	{
		href: "https://github.com/ThallesP",
		label: "GitHub",
		iconSrc: "/home/github.svg",
	},
	{ href: "https://x.com/thallescomumh", label: "X", iconSrc: "/home/x.svg" },
	{
		href: "https://www.linkedin.com/in/thalles-passos",
		label: "LinkedIn",
		iconSrc: "/home/linkedin.svg",
	},
];

export function Hero() {
	return (
		<div className="relative -mt-18 overflow-hidden pt-18 sm:-mt-19 sm:pt-19">
			<HeroBackground />
			<div
				aria-hidden
				className="absolute inset-x-0 bottom-0 h-45 bg-linear-to-b from-transparent to-background"
			/>
			<div className="relative mx-auto w-full max-w-[760px] px-5 pt-14 pb-4">
				<Image
					src="https://avatars.githubusercontent.com/u/76017384?v=4"
					alt="Thalles Passos"
					width={88}
					height={88}
					preload
					className="size-22 rounded-full object-cover shadow-[0_0_0_4px_rgb(0_0_0/0.6)]"
				/>
				<h1 className="mt-5 font-bold text-[40px] leading-[1.06] tracking-[-0.03em] sm:text-5xl">
					Thalles Passos
				</h1>
				<Intro />
				<div className="mt-6 flex flex-wrap gap-2">
					<a href="mailto:contato@thalles.me" className={buttonVariants()}>
						Say hi
					</a>
					{socialLinks.map(({ href, label, iconSrc }) => (
						<a
							key={href}
							href={href}
							className={buttonVariants({ variant: "secondary" })}
						>
							<Image
								src={iconSrc}
								alt=""
								width={16}
								height={16}
								className="size-4"
							/>
							{label}
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
