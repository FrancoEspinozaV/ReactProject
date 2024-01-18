import { Card, Text } from "@tremor/react";
import { LinkDiscord } from "./LinkDiscord";
import { LinkGitHub } from "./LinkGitHub";
export function Footers() {
	return (
		<Card className="my-4 flex flex-wrap py-5">
			<Text className="space-x-2 text-gray-600">
				<span>
					Gracias Midu por siempre estar enseñando, ademas a Manuel y Carlos por
					ayudarme a solucionar un error y las personas del discord de midu que
					me apoyaron. <LinkDiscord url="https://discord.com/invite/midudev" />
				</span>
				<ul>
					<li>
						Github de Midu{" "}
						<LinkGitHub url="https://github.com/midudev/midu.dev" />
					</li>
					<li>
						Github de Carlos{" "}
						<LinkGitHub url="https://github.com/CarlossAyala" />
					</li>
					<li>
						Github de Manuel <LinkGitHub url="https://github.com/manuelj555" />
					</li>
				</ul>
			</Text>
		</Card>
	);
}

/*
Crear un botón de github y 
Legger: https://github.com/CarlossAyala
Midu: https://github.com/midudev/midu.dev
Manuel: https://github.com/manuelj555
*/
