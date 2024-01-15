import {
	Button,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "@tremor/react";
import { useState } from "react";
import { Trash } from "../Icons/Tresh";
import { SortBy, Users } from "../types.d";

interface Props {
	changeSorting: (sort: SortBy) => void;
	deleteUser: (email: string) => void;
	users: Users[];
	isColor: boolean;
}

export function ListOfUsers({
	changeSorting,
	deleteUser,
	users,
	isColor,
}: Props) {
	const [toggleName, setToggleName] = useState<SortBy>(SortBy.NONE);
	const [toggleLast, setToggleLast] = useState<SortBy>(SortBy.NONE);
	const [toggleCountry, setToggleCountry] = useState<SortBy>(SortBy.NONE);

	const changeToggleName = () => {
		const newToggleName =
			toggleName === SortBy.NONE ? SortBy.NAME : SortBy.NONE;
		setToggleName(newToggleName);
		changeSorting(newToggleName);
	};
	const changeToggleLast = () => {
		const newToggleLast =
			toggleLast === SortBy.NONE ? SortBy.LAST : SortBy.NONE;
		setToggleLast(newToggleLast);
		changeSorting(newToggleLast);
	};
	const changeToggleCountry = () => {
		const newToggleCountry =
			toggleCountry === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
		setToggleCountry(newToggleCountry);
		changeSorting(newToggleCountry);
	};
	return (
		<Card>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Foto</TableHeaderCell>
						<TableHeaderCell
							style={{ cursor: "pointer" }}
							onClick={() => changeToggleName()}
						>
							Nombre
						</TableHeaderCell>
						<TableHeaderCell
							style={{ cursor: "pointer" }}
							onClick={() => changeToggleLast()}
						>
							Apellido
						</TableHeaderCell>
						<TableHeaderCell
							style={{ cursor: "pointer" }}
							onClick={() => changeToggleCountry()}
						>
							País
						</TableHeaderCell>
						<TableHeaderCell>Acciones</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user, index) => {
						const backgroundColor = index % 2 === 0 ? "#d9d9d9" : "#ebebeb";
						const color = isColor ? backgroundColor : "transparent";

						return (
							<TableRow key={user.email} style={{ backgroundColor: color }}>
								<TableCell>
									<img
										src={user.picture.thumbnail}
										alt={user.picture.thumbnail}
									/>
								</TableCell>
								<TableCell>{user.name.first}</TableCell>
								<TableCell>{user.name.last}</TableCell>
								<TableCell>{user.location.country}</TableCell>
								<TableCell>
									<Button onClick={() => deleteUser(user.email)}>
										<Trash />
									</Button>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Card>
	);
}
