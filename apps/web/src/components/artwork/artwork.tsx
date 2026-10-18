import { cn } from "@thalles-me/ui/lib/utils";
import Image, { type ImageProps } from "next/image";

export type ArtworkProps = Omit<ImageProps, "src"> & {
	src: string | null;
};

export function Artwork({ src, className, ...props }: ArtworkProps) {
	if (src === null)
		return <div aria-hidden className={cn("bg-secondary", className)} />;

	return <Image src={src} className={className} unoptimized {...props} />;
}
