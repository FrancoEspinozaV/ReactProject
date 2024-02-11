import { Pokemon } from "../types";

export async function getPokes({ pageParam }: { pageParam: number | unknown }) {
	const limit = 20;
	const urlPokeApi = `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=${limit}`;
	const data = await fetch(urlPokeApi);
	if (!data.ok) {
		throw new Error("error when get pokes");
	}
	const pokesJson = await data.json();
	const listPokes: Pokemon[] = pokesJson.results;

	const newListPokes = await Promise.all(
		listPokes.map(async (data) => {
			const infoPokemon = await dataPokemon({
				url: data.url,
			});
			const { id, name, spriteUrl, weight, height, types } = infoPokemon;
			return {
				id,
				name,
				spriteUrl,
				weight,
				height,
				types,
			};
		}),
	);

	const offset = pageParam as number;
	const nextPage = offset + limit;

	return {
		pokes: newListPokes,
		nextPage,
	};
}

interface PokemonType {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}

export async function dataPokemon({ url }: { url: string }) {
	const data = await fetch(url);
	if (!data.ok) throw new Error("error when get info pokemon");

	const pokemonJson = await data.json();
	const { id, name, sprites, weight, height, types } = pokemonJson;
	const { front_default: spriteUrl } = sprites;
	const newTypes = types.map((type: PokemonType) => type.type.name);
	return {
		id,
		name,
		spriteUrl,
		weight,
		height,
		types: newTypes,
	};
}
