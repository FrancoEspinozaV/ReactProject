import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteUsers, fetchUsers } from "../services/user";
import { Users } from "../types";
interface Props {
	users: Users[];
	nextPage?: number;
}

export function useUsers() {
	const queryClient = useQueryClient();

	const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
		useInfiniteQuery<Props>({
			queryKey: ["users"],
			queryFn: ({ pageParam = 1 }) => fetchUsers({ pageParam }),
			getNextPageParam: (lastPage) => lastPage.nextPage,
			initialPageParam: 1,
			refetchOnWindowFocus: false,
		});

	const mutation = useMutation({
		mutationFn: deleteUsers,
		onMutate: async (variables) => {
			const users = data?.pages.flatMap((page) => page.users) ?? [];
			const userFilters = users.filter(
				(user) => user.email !== variables.email,
			);

			await queryClient.cancelQueries({ queryKey: ["users"] });

			const previousUsers = queryClient.getQueryData(["users"]);

			queryClient.setQueryData(["users"], () => {
				return {
					pages: [{ users: userFilters, nextPage: variables.id }],
					pageParams: [data?.pageParams[0]],
				};
			});
			toast.success("Eliminación Correcta");
			return { previousUsers };
		},
		onError: (err, newData, context) => {
			console.log(err, newData, context?.previousUsers);
			// err:SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON
			// newData: {email: 'leni.johansson@example.com', id: 1}
			// context?.previousUsers undefined
			toast.error("Error al eliminar el usuario");
			queryClient.setQueryData(["users"], context?.previousUsers);
		},
	});

	const deleteData = (email: string) => {
		mutation.mutate({ email, id: data?.pages[0].nextPage });
	};

	return {
		isLoading,
		isError,
		users: data?.pages.flatMap((page) => page.users) ?? [],
		hasNextPage,
		refetch,
		fetchNextPage,
		deleteData,
	};
}
