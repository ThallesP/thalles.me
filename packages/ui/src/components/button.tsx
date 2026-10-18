import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@thalles-me/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
	"inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/85",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				tinted: "bg-link/15 text-link hover:bg-link/25",
			},
			size: {
				default: "h-9 px-4 text-[15px]",
				sm: "h-7 px-3 text-[13px]",
				lg: "h-11 px-5 text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
