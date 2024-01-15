import { ListOfUsers } from "./components/ListOfUsers";
import { type Users } from "./types.d";
/* eslint-disable no-mixed-spaces-and-tabs */
import { Button } from "@tremor/react";
import { useEffect, useState } from "react";
function App() {
	const [users, setUsers] = useState<Users[]>([]);
	const [isColor, setIsColor] = useState<boolean>(false);
	const [sortCountry, setSortCountry] = useState<boolean>(false);

	useEffect(() => {
		fetch("https://randomuser.me/api/?results=100")
			.then((res) => res.json())
			.then((data) => setUsers(data.results))
			.catch((error) => console.log(error));
	}, []);

	const toggleColors = () => {
		setIsColor(!isColor);
	};

	const toggleSortByCountry = () => {
		setSortCountry(!sortCountry);
	};

	const handleDelete = (email: string) => {
		const userFilters = users.filter((user) => user.email !== email);
		setUsers(userFilters);
	};

	const sortedUsers = sortCountry
		? users.toSorted((a, b) => {
				return a.location.country.localeCompare(b.location.country);
		  })
		: users;

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
			<div style={{ display: "flex", flexDirection: "row" }}>
				<Button onClick={toggleColors}>Colorear Filas</Button>
				<Button onClick={toggleSortByCountry}>
					{sortCountry ? "No ordenar por País" : "Ordenar por País"}
				</Button>
			</div>
			<ListOfUsers
				deleteUser={handleDelete}
				users={sortedUsers}
				isColor={isColor}
			/>
		</main>
	);
}

export default App;
