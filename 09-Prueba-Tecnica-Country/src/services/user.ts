export const fetchUsers = async ({
	pageParam,
}: { pageParam?: number | unknown }) => {
	return await fetch(
		`https://randomuser.me/api/?results=10&seed=franco&page=${pageParam}`,
	)
		.then((res) => {
			if (!res.ok) throw new Error("error en la petición");
			return res.json();
		})
		.then((data) => {
			const currentPage = Number(data.info.page);
			const nextPage = currentPage > 2 ? undefined : currentPage + 1;
			return {
				users: data.results,
				nextPage,
			};
		});
};

export const deleteUsers = async ({
	email,
	id,
}: { email: string; id: number }) => {
	const response = await fetch(
		`https://randomuser.me/api/?results=10&seed=franco&page=${id}`,
		{
			method: "DELETE",
			body: JSON.stringify({
				email,
			}),
		},
	);
	return response.json();
};
