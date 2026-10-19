import { buttonVariants } from "@thalles-me/ui/components/button";
import Link from "next/link";

import { GroupedList } from "@/components/grouped-list/grouped-list";

export function MusicMatchCard() {
	return (
		<GroupedList className="flex flex-col items-start gap-4 py-5 pr-5 pl-6 sm:flex-row sm:items-center sm:gap-5">
			<div className="min-w-0 flex-1">
				<div className="font-semibold text-[17px] tracking-[-0.01em]">
					Do we like the same music?
				</div>
				<div className="mt-0.5 text-[15px] text-muted-foreground leading-[1.4]">
					Drop your Last.fm username or a Spotify playlist on the home page and
					I'll find what we both listen to.
				</div>
			</div>
			<Link href="/#music-match" className={buttonVariants()}>
				Find out
			</Link>
		</GroupedList>
	);
}
