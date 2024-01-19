import { Button, Card, Text, Title } from "@tremor/react";
import { useComments } from "../hooks/useComments";
import { type CommentWithId } from "../interface.d";

export function CommentResult({ data }: { data?: CommentWithId[] }) {
	const { deletePost, loading } = useComments();
	return data?.map((comment) => (
		<ul key={comment.id}>
			<li>
				<Card className="rounded-md">
					<Title className="text-2xl flex justify-between">
						{comment.title}{" "}
						<Button
							disabled={loading}
							onClick={() => deletePost({ id: comment.id })}
						>
							Eliminar
						</Button>
					</Title>
					<Text>{comment.message}</Text>
				</Card>
			</li>
		</ul>
	));
}
