import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	TextInput,
	Title,
} from "@tremor/react";
import { useState } from "react";
import { Edit } from "../Icons/Edit";
import { Save } from "../Icons/Save";
import { Trash } from "../Icons/trash";
import { useUserAction } from "../hooks/useUserAction";
import { useAppSelector } from "../hooks/useUsers";

type TypeEditing = string | null;

export function ListOfUser() {
	const [editing, setEditing] = useState<TypeEditing>(null);
	const [name, setName] = useState<TypeEditing>(null);
	const [email, setEmail] = useState<TypeEditing>(null);

	const users = useAppSelector((store) => store.users);
	const { removeUser, editUsers } = useUserAction();

	const handleEdit = (id: string) => {
		setEditing(id);
	};

	const handleSave = (
		id: string,
		nameEditing: TypeEditing,
		emailEditing: TypeEditing,
		github: string,
	) => {
		const userToEdit = users.find((user) => user.id === id);

		let updatedName = nameEditing ?? "";
		let updatedEmail = emailEditing ?? "";

		if (userToEdit) {
			updatedName = nameEditing || userToEdit.name;
			updatedEmail = emailEditing || userToEdit.email;
		}
		editUsers({ id, name: updatedName, email: updatedEmail, github });
		setEditing(null);
		setName(null);
		setEmail(null);
	};

	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

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
						<TableRow key={user.id}>
							<TableCell>{user.id}</TableCell>
							<TableCell
								style={{ display: "flex", alignItems: "center", gap: "8px" }}
							>
								<img
									style={{ width: "32px", height: "32px", borderRadius: "50%" }}
									src={`https://unavatar.io/github/${user.github}`}
									alt={user.name}
								/>
								{editing === user.id ? (
									<TextInput
										name="name"
										onChange={handleChangeName}
										placeholder={user.name}
									/>
								) : (
									user.name
								)}
							</TableCell>
							<TableCell>
								{editing === user.id ? (
									<TextInput
										name="email"
										onChange={handleChangeEmail}
										placeholder={user.email}
									/>
								) : (
									user.email
								)}
							</TableCell>
							<TableCell>
								<button onClick={() => removeUser(user.id)} type="button">
									<Trash />
								</button>
								{editing === user.id ? (
									<button
										onClick={() =>
											handleSave(user.id, name, email, user.github)
										}
										type="button"
									>
										<Save />
									</button>
								) : (
									<button onClick={() => handleEdit(user.id)} type="button">
										<Edit />
									</button>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}
