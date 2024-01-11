import { deletUser, userId } from "../Store/users/slice";
import { useAppDispatch } from "./useUsers";

export function useUserAction() {
	const dispatch = useAppDispatch();
	const removeUser = (id: userId) => {
		dispatch(deletUser(id));
	};

	return { removeUser };
}
