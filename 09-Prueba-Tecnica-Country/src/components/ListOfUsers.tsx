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
import { Trash } from "../Icons/Tresh";
import { Users } from "../types.d";

interface Props {
	deleteUser: (email: string) => void;
	users: Users[];
	isColor: boolean;
}

export function ListOfUsers({ deleteUser, users, isColor }: Props) {
	return (
		<Card>
			<Table>
				<TableHead>
					<TableRow style={{ cursor: "pointer" }}>
						<TableHeaderCell>Foto</TableHeaderCell>
						<TableHeaderCell>Nombre</TableHeaderCell>
						<TableHeaderCell>Apellido</TableHeaderCell>
						<TableHeaderCell>País</TableHeaderCell>
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
