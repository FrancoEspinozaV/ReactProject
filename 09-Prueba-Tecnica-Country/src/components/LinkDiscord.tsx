import { Discord } from "../Icons/Discord";

export function LinkDiscord({ url }: { url: string }) {
	return (
		<a
			className="inline-block border-2 rounded-md translate-y-2"
			href={url}
			target="_blank"
			rel="noreferrer"
		>
			<Discord />
		</a>
	);
}
