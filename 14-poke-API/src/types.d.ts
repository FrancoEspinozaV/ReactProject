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
}

export type TypePokemon = typeof TYPE[keyof typeof TYPE];
