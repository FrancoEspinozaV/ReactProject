import { deletUser } from "../Store/users/slice";
import { userId } from "../interface/user";
import { useAppDispatch } from "./useUsers";

export function useUserAction() {
	const dispatch = useAppDispatch();
	const removeUser = (id: userId) => {
		dispatch(deletUser(id));
	};

	return { removeUser };
}
