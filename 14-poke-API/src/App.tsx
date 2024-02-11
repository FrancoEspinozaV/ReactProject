import { Button } from "@tremor/react";
import "./App.css";
import { Filters } from "./components/Filters";
import { TablePoke } from "./components/TablePoke";
import { useFilters } from "./hooks/useFilters";
import { usePokemon } from "./hooks/usePokemon";

function App() {
	const { fetchNextPage, isLoading } = usePokemon();
	const {
		selectedType,
		handleChangeHeight,
		handleChangeId,
		handleChangeType,
		hangleChangeName,
		handleChangeWeight,
	} = useFilters();

	return (
		<main>
			<h1 className="text-3xl">Poke API</h1>

			{isLoading && <p>Cargando...</p>}
			{!isLoading && selectedType.length === 0 && <p>No existen datos</p>}
			{!isLoading && (
				<Filters
					handleChangeHeight={handleChangeHeight}
					handleChangeId={handleChangeId}
					handleChangeType={handleChangeType}
					handleChangeWeight={handleChangeWeight}
					hangleChangeName={hangleChangeName}
				/>
			)}
			{!isLoading && <TablePoke pokes={selectedType} />}
			{!isLoading && (
				<Button className="mt-4" onClick={() => fetchNextPage()}>
					cargar mas pokemons
				</Button>
			)}
		</main>
	);
}

export default App;
