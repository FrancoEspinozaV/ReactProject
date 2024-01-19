import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { type Comment, type CommentWithId } from "../interface.d";
import { deleteComment, getComments, postComment } from "../services/comments";

export function useComments() {
	const { data } = useQuery<CommentWithId[]>({
		queryKey: ["comments"],
		queryFn: getComments,
	});
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState<true | false>(false);

	const mutatePost = useMutation({
		mutationFn: postComment,
		onMutate: async (newComment) => {
			setLoading(true);
			await queryClient.cancelQueries({ queryKey: ["comments"] });

			// Snapshot the previous value
			const previousComment = queryClient.getQueryData(["comments"]);
			// Optimistically update to the new value
			queryClient.setQueryData(["comments"], (old: CommentWithId[]) => {
				if (old !== undefined) {
					return [...old, newComment];
				}
				return [newComment];
			});

			/* */
			toast.success("Se agrego el comentario 😀");
			// Return a context object with the snapshotted value
			return { previousComment };
		},
		onError: (err, newComment, context) => {
			console.log(err, newComment);
			toast.error("Algo salio mal agregando el comentario 😥");
			queryClient.setQueryData(["comments"], context?.previousComment);
		},
		onSettled: () => {
			setLoading(false);
			queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
	});

	const mutateDelete = useMutation({
		mutationFn: deleteComment,
		onMutate: async (idToDeleteComment) => {
			setLoading(true);
			await queryClient.cancelQueries({ queryKey: ["comments"] });

			// Snapshot the previous value
			const previousComment: CommentWithId[] | undefined =
				queryClient.getQueryData(["comments"]);

			const arrayWithoutComment = previousComment?.filter(
				(comment: CommentWithId) => comment.id !== idToDeleteComment.id,
			);
			// Optimistically update to the new value
			queryClient.setQueryData(["comments"], () => {
				if (arrayWithoutComment !== undefined) {
					return [...arrayWithoutComment];
				}
				return [];
			});

			toast.success("Se elimino el comentario 😀");
			// Return a context object with the snapshotted value
			return { previousComment };
		},
		onError: (err, newComment, context) => {
			setLoading(false);
			console.log(err, newComment);
			toast.error("Algo salio mal eliminando el comentario 😥");
			queryClient.setQueryData(["comments"], context?.previousComment);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
	});

	const addPost = ({ title, message }: Comment) => {
		mutatePost.mutate({ title, message });
	};

	const deletePost = ({ id }: { id: string }) => {
		mutateDelete.mutate({ id });
	};

	return { data, addPost, deletePost, loading };
}
