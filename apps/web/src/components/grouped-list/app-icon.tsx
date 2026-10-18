import { cn } from "@thalles-me/ui/lib/utils";

const sizeClass = {
	sm: "size-9 rounded-[9px] [&_svg]:size-5",
	md: "size-[52px] rounded-[12px] [&_svg]:size-7",
} as const;

export type AppIconProps = {
	size?: keyof typeof sizeClass;
	children: React.ReactNode;
};

export function AppIcon({ size = "md", children }: AppIconProps) {
	return (
		<span
			className={cn(
				"grid shrink-0 place-items-center bg-linear-to-b from-[#48484a] to-[#2c2c2e] text-white shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.14)]",
				sizeClass[size],
			)}
		>
			{children}
		</span>
	);
}
