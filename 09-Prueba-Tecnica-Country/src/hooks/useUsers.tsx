import {
	QueryClient,
	useInfiniteQuery,
	useMutation,
} from "@tanstack/react-query";
import { deleteUsers, fetchUsers } from "../services/user";
import { Users } from "../types";
interface Props {
	users: Users[];
	nextPage?: number;
}

export function useUsers() {
	const queryClient = new QueryClient();

	const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
		useInfiniteQuery<Props>({
			queryKey: ["users"],
			queryFn: ({ pageParam = 1 }) => fetchUsers({ pageParam }),
			getNextPageParam: (lastPage) => lastPage.nextPage,
			initialPageParam: 1,
			refetchOnWindowFocus: false,
		});

	console.log("Data");
	console.log(data);
	const mutation = useMutation({
		mutationFn: deleteUsers,
		onMutate: async (variables) => {
			const users = data?.pages.flatMap((page) => page.users) ?? [];
			const userFilters = users.filter(
				(user) => user.email !== variables.email,
			);

			//await queryClient.cancelQueries({ queryKey: ["users"] });

			const previusUsers = data;

			const result = queryClient.setQueryData(["users"], () => {
				return {
					pages: [{ users: userFilters, nextPage: variables.id }],
					pageParams: [data?.pageParams[0]],
				};
			});
			console.log("Resultado");
			console.log(result); // respuesta con el usuario borrado

			return { previusUsers };
		},
		onError: (err, newData, context) => {
			console.log(err, newData, context?.previusUsers);
			// err:SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON
			// newData: {email: 'leni.johansson@example.com', id: 1}
			// context?.previusUsers undefined
			queryClient.setQueryData(["users"], context?.previusUsers);
		},
		onSettled: () => {
			queryClient.setQueryData(["users"], () => {
				return {
					pages: [{ users: [], nextPage: 2 }],
					pageParams: [1],
				};
			});
			console.log("Ejecutado Siempre");
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
