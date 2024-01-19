import { MasterKey, myRute } from "../data";
import { type Comment } from "../interface.d";
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

	const responde = fetch(`https://api.jsonbin.io/v3/b/${myRute}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"X-Master-key": MasterKey,
		},
		body: JSON.stringify(commentToSeve),
	});

	if (!(await responde).ok) throw new Error("Failed to post comment.");

	return newComment;
}
