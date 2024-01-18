import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ListOfUsers } from "./components/ListOfUsers";
import { useUsers } from "./hooks/useUsers";
import { SortBy, type Users } from "./types.d";
/* eslint-disable no-mixed-spaces-and-tabs */
import { Button, TextInput } from "@tremor/react";
import { useMemo, useState } from "react";
import { Toaster } from "sonner";

function App() {
	const {
		isError,
		isLoading,
		users,
		refetch,
		fetchNextPage,
		deleteData,
		hasNextPage,
	} = useUsers();
	const [isColor, setIsColor] = useState<boolean>(false);
	const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
	const [filterCountry, setFilterCountry] = useState<string | null>(null);

	const toggleColors = () => {
		setIsColor(!isColor);
	};

	const toggleSortByCountry = () => {
		const newSortingValue =
			sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
		setSorting(newSortingValue);
	};

	const recoverUsers = async () => {
		await refetch();
	};

	const handleChangeSort = (sort: SortBy) => {
		setSorting(sort);
	};

	const filterUserByCountry = useMemo(() => {
		return typeof filterCountry === "string" && filterCountry.length > 0
			? users.filter((user) =>
					user.location.country
						.toLowerCase()
						.includes(filterCountry.toLowerCase()),
			  )
			: users;
	}, [users, filterCountry]);

	const sortedUsers = useMemo(() => {
		if (sorting === SortBy.NONE) return filterUserByCountry;

		const compareProperties: Record<string, (user: Users) => string> = {
			[SortBy.NAME]: (user) => user.name.first,
			[SortBy.LAST]: (user) => user.name.last,
			[SortBy.COUNTRY]: (user) => user.location.country,
		};

		return filterUserByCountry.toSorted((a, b) => {
			const extraProperties = compareProperties[sorting];
			const compareA = extraProperties(a);
			const compareB = extraProperties(b);
			return compareA.localeCompare(compareB);
		});
	}, [filterUserByCountry, sorting]);

	return (
		<main
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
			}}
		>
			<h1 className="text-3xl my-5">Prueba Tecnica - Country</h1>
			<div
				style={{ display: "flex", flexDirection: "row", marginBottom: "5px" }}
			>
				<Button onClick={toggleColors}>Colorear Filas</Button>
				<Button onClick={toggleSortByCountry}>
					{sorting === SortBy.COUNTRY
						? "No ordenar por País"
						: "Ordenar por País"}
				</Button>
				<Button onClick={recoverUsers}>Recuperar Usuarios</Button>
				<TextInput
					placeholder="Filtrar por País"
					onChange={(e) => setFilterCountry(e.target.value)}
				/>
			</div>
			{!isError && (
				<ListOfUsers
					changeSorting={handleChangeSort}
					deleteUser={deleteData}
					users={sortedUsers}
					isColor={isColor}
				/>
			)}
			{isError && <p>Ha ocurrido un error</p>}
			{!isError && !isLoading && users.length === 0 && (
				<p>No existen usuarios</p>
			)}
			{isLoading && <strong>Cargando...</strong>}

			{!isError && !isLoading && hasNextPage === true && (
				<Button onClick={() => fetchNextPage()}>cargar mas usuarios</Button>
			)}

			<Toaster richColors />
			<ReactQueryDevtools />
		</main>
	);
}

export default App;
