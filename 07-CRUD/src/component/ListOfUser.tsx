import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	Title,
} from "@tremor/react";
import { Edit } from "../Icons/Edit";
import { Trash } from "../Icons/trash";
import { useUserAction } from "../hooks/useDeleteUser";
import { useAppSelector } from "../hooks/useUsers";

export function ListOfUser() {
	const users = useAppSelector((store) => store.users);
	const { removeUser } = useUserAction();

	return (
		<Card style={{ borderRadius: "10px" }}>
			<Title>
				Usuarios <Badge>{users.length}</Badge>
			</Title>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>ID</TableHeaderCell>
						<TableHeaderCell>Nombre</TableHeaderCell>
						<TableHeaderCell>Correo</TableHeaderCell>
						<TableHeaderCell>Acciones</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.name}>
							<TableCell>{user.id}</TableCell>
							<TableCell
								style={{ display: "flex", alignItems: "center", gap: "8px" }}
							>
								<img
									style={{ width: "32px", height: "32px", borderRadius: "50%" }}
									src={`https://unavatar.io/github/${user.github}`}
									alt={user.name}
								/>
								{user.name}
							</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>
								<button onClick={() => removeUser(user.id)} type="button">
									<Trash />
								</button>
								<button type="button">
									<Edit />
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}
