import { Button } from "@tremor/react";
import { Toaster } from "sonner";
import "./app.css";
import { CommentResult } from "./components/CommentResult";
import { Comments } from "./components/Comments";
import { useComments } from "./hooks/useComments";

function App() {
	const { data, addPost } = useComments();
	const handleClickAddPost = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const message = data.get("message")?.toString() ?? "";
		const title = data.get("title")?.toString() ?? "";
		addPost({ title, message });
	};
	return (
		<main>
			<form onSubmit={handleClickAddPost}>
				<Comments />
				<Button>Comentar</Button>
			</form>
			<CommentResult data={data} />
			<Toaster richColors />
		</main>
	);
}

export default App;
