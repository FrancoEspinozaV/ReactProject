import { Card, TextInput, Title } from "@tremor/react";
export function Comments() {
	return (
		<Card className="rounded-md">
			<Title>Titulo</Title>
			<TextInput required placeholder="Hoy me siento feliz" name="title" />
			<Title>Comentario</Title>
			<TextInput
				required
				placeholder="He aprendido programación"
				name="message"
			/>
		</Card>
	);
}
