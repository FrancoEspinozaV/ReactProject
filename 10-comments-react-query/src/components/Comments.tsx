import { Card, TextInput, Title } from "@tremor/react";
export function Comments() {
	return (
		<Card className="rounded-md">
			<Title>Titulo</Title>
			<TextInput placeholder="Hoy me siento feliz" name="title" />
			<Title>Comentario</Title>
			<TextInput placeholder="He aprendido programación" name="message" />
		</Card>
	);
}
