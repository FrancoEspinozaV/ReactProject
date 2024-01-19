import { toast } from "sonner";
import { MasterKey, myRute } from "../../data";
import { CommentWithId, type Comment } from "../interface.d";
export async function getComments() {
	const response = await fetch(`https://api.jsonbin.io/v3/b/${myRute}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Master-key": MasterKey,
		},
	});

	if (!response.ok) throw new Error("Failed to fetch comments.");
	const json = await response.json();

	return json?.record;
}

export async function postComment({ title, message }: Comment) {
	const comments = await getComments();
	const id = crypto.randomUUID();
	const newComment = { title, message, id };
	const commentToSeve = [...comments, newComment];

	const response = fetch(`https://api.jsonbin.io/v3/b/${myRute}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"X-Master-key": MasterKey,
		},
		body: JSON.stringify(commentToSeve),
	});

	if (!(await response).ok) throw new Error("Failed to post comment.");

	return newComment;
}

export async function deleteComment({ id }: { id: string }) {
	const comments = await getComments();
	const arrayWithoutComment: CommentWithId[] = comments.filter(
		(comment: CommentWithId) => comment.id !== id,
	);

	const commentToSeve =
		arrayWithoutComment.length !== 0
			? JSON.stringify([...arrayWithoutComment])
			: null;
	const response = fetch(`https://api.jsonbin.io/v3/b/${myRute}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"X-Master-key": MasterKey,
		},
		body: commentToSeve,
	});

	if (!(await response).ok) {
		toast.error("No puede quedar vacio");
		throw new Error("Failed to delete comment.");
	}

	return commentToSeve;
}
