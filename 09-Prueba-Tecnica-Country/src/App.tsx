import { ListOfUsers } from "./components/ListOfUsers";
import { SortBy, type Users } from "./types.d";
/* eslint-disable no-mixed-spaces-and-tabs */
import { Button, TextInput } from "@tremor/react";
import { useEffect, useMemo, useRef, useState } from "react";
function App() {
	const [users, setUsers] = useState<Users[]>([]);
	const [isColor, setIsColor] = useState<boolean>(false);
	const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
	const [filterCountry, setFilterCountry] = useState<string | null>(null);
	const recoveryUsers = useRef<Users[]>([]);

	useEffect(() => {
		fetch("https://randomuser.me/api/?results=100")
			.then((res) => res.json())
			.then((data) => {
				recoveryUsers.current = data.results;
				setUsers(data.results);
			})
			.catch((error) => console.log(error));
	}, []);

	const toggleColors = () => {
		setIsColor(!isColor);
	};

	const toggleSortByCountry = () => {
		const newSortingValue =
			sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
		setSorting(newSortingValue);
	};

	const handleDelete = (email: string) => {
		const userFilters = users.filter((user) => user.email !== email);
		setUsers(userFilters);
	};

	const recoverUsers = () => {
		setUsers(recoveryUsers.current);
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
			<ListOfUsers
				changeSorting={handleChangeSort}
				deleteUser={handleDelete}
				users={sortedUsers}
				isColor={isColor}
			/>
		</main>
	);
}

export default App;
