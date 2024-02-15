import { TYPE } from "./const";

export interface APIPoke {
	count: number;
	next: string;
	previous: null;
	results: Result[];
}

export interface Pokemon {
	name: string;
	url: string;
}

export interface InfoPokemon {
	id: number;
	name: string;
	spriteUrl: string;
	weight: number;
	height: number;
	types: string[];
	stats: newStatElement[];
	spriteUrlShiny: string;
}

export type TypePokemon = typeof TYPE[keyof typeof TYPE];

export interface Stats {
	stats: StatElement[];
}

export interface StatElement {
	base_stat: number;
	effort: number;
	stat: StatStat;
}

export interface StatStat {
	name: string;
	url: string;
}

export interface newStatElement {
	base_stat: number;
	name: string;
}
