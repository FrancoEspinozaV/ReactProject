import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokes } from "../service/pokes";
import { InfoPokemon } from "../types";

interface Props {
	pokes: InfoPokemon[];
	nextPage?: number;
}

export function usePokemon() {
	const { data, isLoading, fetchNextPage } = useInfiniteQuery<Props>({
		queryKey: ["pokes"],
		queryFn: ({ pageParam = 0 }) => getPokes({ pageParam }),
		getNextPageParam: (lastPage) => lastPage.nextPage,
		initialPageParam: 0,
		refetchOnWindowFocus: false,
	});
	return {
		pokes: data?.pages.flatMap((listPokes) => listPokes.pokes) ?? [],
		isLoading,
		fetchNextPage,
	};
}
