import { useAutoAnimate } from "@formkit/auto-animate/react";
import { InfoPokemon } from "../types";
import CardPoke from "./CardPoke";

export function TablePoke({ pokes }: { pokes: InfoPokemon[] }) {
	const [parent] = useAutoAnimate();
	return (
		<div className="cards-poke" ref={parent}>
			{pokes.map((poke) => {
				return <CardPoke poke={poke} key={poke.id} />;
			})}
		</div>
	);
}
