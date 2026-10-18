import { GroupedList } from "@/components/grouped-list/grouped-list";
import { tstackSkills } from "@/content/ai-tstack";

export function TstackCard() {
	return (
		<GroupedList className="px-6 py-[22px] text-body leading-[1.55]">
			<p>
				My own Michelin kitchen, as poteto calls it: the skills and rules that
				make agents write code, review PRs and ship features the way I would.
				When I correct an agent, the fix becomes a rule, a check or a skill, so
				I don't have to say it twice.
			</p>
			<p className="mt-3">
				Inspired by poteto's{" "}
				<a
					href="https://github.com/cursor/plugins/tree/main/pstack"
					className="text-link"
				>
					pstack
				</a>
				.
			</p>
			<ul className="mt-4 flex flex-wrap gap-2">
				{tstackSkills.map((skill) => (
					<li
						key={skill}
						className="rounded-full bg-card-raised px-3 py-[5px] text-foreground text-sm"
					>
						{skill}
					</li>
				))}
			</ul>
		</GroupedList>
	);
}
