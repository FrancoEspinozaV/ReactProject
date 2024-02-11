import { useState } from "react";
import { InfoPokemon } from "../types";
import { usePokemon } from "./usePokemon";
interface Filter {
	type: string;
	name: string;
	id: number;
	height: number;
	weight: number;
}

export function useFilters() {
	const { pokes } = usePokemon();
	const [filter, setFilter] = useState<Filter>({
		type: "",
		name: "",
		id: 0,
		height: 0,
		weight: 0,
	});

	const filterById = (id: number) => (poke: InfoPokemon) =>
		!id || poke.id === id;
	const filterByName = (name: string) => (poke: InfoPokemon) =>
		!name || poke.name.toLowerCase().includes(name.toLowerCase());
	const filterByType = (type: string) => (poke: InfoPokemon) =>
		!type || poke.types.includes(type);
	const filterByHeight = (height: number) => (poke: InfoPokemon) =>
		!height || poke.height.toString().startsWith(height.toString());
	const filterByWeight = (weight: number) => (poke: InfoPokemon) =>
		!weight || poke.weight.toString().startsWith(weight.toString());

	const applyFilters = (
		data: InfoPokemon[],
		...filters: ((poke: InfoPokemon) => boolean)[]
	) => {
		return data.filter((poke) => filters.every((filter) => filter(poke)));
	};

	const selectedType = applyFilters(
		pokes,
		filterById(filter.id),
		filterByName(filter.name),
		filterByType(filter.type),
		filterByHeight(filter.height),
		filterByWeight(filter.weight),
	);

	const handleChangeType = (type: string) => {
		setFilter((prev) => {
			return {
				...prev,
				type,
			};
		});
	};
	const handleChangeId = (id: number) => {
		setFilter((prev) => {
			return {
				...prev,
				id,
			};
		});
	};
	const handleChangeHeight = (height: number) => {
		const newHeight = height * 10;
		setFilter((prev) => {
			return {
				...prev,
				height: newHeight,
			};
		});
	};
	const handleChangeWeight = (weight: number) => {
		const newWeight = weight * 10;
		setFilter((prev) => {
			return {
				...prev,
				weight: newWeight,
			};
		});
	};

	const hangleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value;
		setFilter((prev) => {
			return {
				...prev,
				name,
			};
		});
	};

	return {
		selectedType,
		handleChangeHeight,
		handleChangeId,
		handleChangeType,
		hangleChangeName,
		handleChangeWeight,
	};
}
