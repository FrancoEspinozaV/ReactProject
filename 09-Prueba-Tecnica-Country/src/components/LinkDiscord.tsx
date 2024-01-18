import { Discord } from "../Icons/Discord";

export function LinkDiscord() {
	return (
		<a
			className="inline-block border-2 rounded-md translate-y-2"
			href="discord.gg/midudev"
			target="_blank"
			rel="noreferrer"
		>
			<Discord />
		</a>
	);
}
