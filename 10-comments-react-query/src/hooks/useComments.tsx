import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type Comment, type CommentWithId } from "../interface.d";
import { getComments, postComment } from "../services/comments";

export function useComments() {
	const { data } = useQuery<CommentWithId[]>({
		queryKey: ["comments"],
		queryFn: getComments,
	});

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: postComment,
		onMutate: async (newComment) => {
			await queryClient.cancelQueries({ queryKey: ["comments"] });

			// Snapshot the previous value
			const previousComment = queryClient.getQueryData(["comments"]);
			// Optimistically update to the new value
			queryClient.setQueryData(["comments"], (old: CommentWithId[]) => [
				...old,
				newComment,
			]);

			toast.success("Se agrego el comentario 😀");
			// Return a context object with the snapshotted value
			return { previousComment };
		},
		onError: (err, newComment, context) => {
			console.log(err, newComment);
			toast.error("Algo salio mal 😥");
			queryClient.setQueryData(["comments"], context?.previousComment);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
	});

	const addPost = ({ title, message }: Comment) => {
		mutate({ title, message });
	};
	return { data, addPost };
}
