import { addUser, deletUser } from "../Store/users/slice";
import { userId } from "../interface/user";
import { useAppDispatch } from "./useUsers";

export function useUserAction() {
	const dispatch = useAppDispatch();

	const addUsers = ({ name, email, github }) => {
		dispatch(addUser({ name, email, github }));
	};
	const removeUser = (id: userId) => {
		dispatch(deletUser(id));
	};

	return { addUsers, removeUser };
}
