import { cn } from "@thalles-me/ui/lib/utils";
import { Minus, Plus, X } from "lucide-react";

const sizeClass = {
	sm: "gap-[7px] [&_button]:size-[11px] [&_svg]:size-2",
	md: "gap-2 [&_button]:size-3 [&_svg]:size-[9px]",
} as const;

const lights = [
	{ label: "Close", Glyph: X, className: "bg-[#ff5f57]" },
	{ label: "Minimize", Glyph: Minus, className: "bg-[#febc2e]" },
	{ label: "Zoom", Glyph: Plus, className: "bg-[#28c840]" },
] as const;

export type TrafficLightsProps = {
	size?: keyof typeof sizeClass;
	zoomRef?: React.Ref<HTMLButtonElement>;
	onClose: () => void;
	onMinimize: () => void;
	onZoom: () => void;
};

export function TrafficLights({
	size = "sm",
	zoomRef,
	onClose,
	onMinimize,
	onZoom,
}: TrafficLightsProps) {
	const handleClickByLabel = {
		Close: onClose,
		Minimize: onMinimize,
		Zoom: onZoom,
	};

	return (
		<span className={cn("group/lights flex shrink-0", sizeClass[size])}>
			{lights.map(({ label, Glyph, className }) => (
				<button
					key={label}
					ref={label === "Zoom" ? zoomRef : undefined}
					type="button"
					aria-label={label}
					onClick={handleClickByLabel[label]}
					className={cn(
						"grid cursor-pointer place-items-center rounded-full text-black/60 shadow-[inset_0_0_0_0.5px_rgb(0_0_0/0.22)] outline-link outline-offset-2 focus-visible:outline-2 active:brightness-80",
						className,
					)}
				>
					<Glyph
						aria-hidden
						strokeWidth={3.5}
						className="opacity-0 transition-opacity duration-100 group-hover/lights:opacity-100 group-has-focus-visible/lights:opacity-100 motion-reduce:transition-none"
					/>
				</button>
			))}
		</span>
	);
}
