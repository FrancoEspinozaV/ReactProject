import { Github } from "../Icons/Github";

export function LinkGitHub({ url }: { url: string }) {
	return (
		<a
			className="inline-block border-2 rounded-md translate-y-2"
			href={url}
			target="_blank"
			rel="noreferrer"
		>
			<Github />
		</a>
	);
}
