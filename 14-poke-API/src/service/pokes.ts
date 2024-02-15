import { Pokemon, StatElement } from "../types";

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
			const {
				id,
				name,
				spriteUrl,
				weight,
				height,
				types,
				stats,
				spriteUrlShiny,
			} = infoPokemon;
			return {
				id,
				name,
				spriteUrl,
				weight,
				height,
				types,
				stats,
				spriteUrlShiny,
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
	const { id, name, sprites, weight, height, types, stats } = pokemonJson;
	const { front_default: spriteUrl, front_shiny: spriteUrlShiny } = sprites;
	const newFormatStats = stats.map((pokeStat: StatElement) => {
		const { base_stat, stat } = pokeStat;
		const { name } = stat;
		const newStat = {
			base_stat,
			name,
		};
		return newStat;
	});
	const newTypes = types.map((type: PokemonType) => type.type.name);
	return {
		id,
		name,
		spriteUrl,
		weight,
		height,
		types: newTypes,
		stats: newFormatStats,
		spriteUrlShiny,
	};
}
