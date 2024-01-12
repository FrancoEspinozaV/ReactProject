import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserAction } from "../hooks/useUserAction";
import { type ErrorFormAddUser } from "../interface/user";

export function CreateNewUser() {
	const { addUsers } = useUserAction();

	const [error, setError] = useState<ErrorFormAddUser>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);

		const form = event.target;
		const data = new FormData(form);
		const name = data.get("name") as string;
		const email = data.get("email") as string;
		const github = data.get("github") as string;
		console.log(name, email, github);
		if (!name || !email || !github) {
			return setError("error");
		}
		console.log("B");
		setError("ok");
		addUsers({ name, email, github });
		form.reset();
	};
	return (
		<Card>
			<Title>Crear nuevo Usuario</Title>
			<form onSubmit={handleSubmit}>
				<TextInput name="name" placeholder="nombre" />
				<TextInput name="email" placeholder="email" />
				<TextInput name="github" placeholder="github" />
				<div>
					<Button type="submit">crear usuario</Button>
					<span>
						{error === "ok" && <Badge color="rose">Usuaio Añadido</Badge>}
					</span>
					<span>
						{error === "error" && (
							<Badge color="red">Ingresa bien los campos</Badge>
						)}
					</span>
				</div>
			</form>
		</Card>
	);
}
