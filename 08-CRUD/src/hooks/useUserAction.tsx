import { addUser, deletUser, editUser } from "../Store/users/slice";
import { userId, userWithId } from "../interface/user";
import { useAppDispatch } from "./useUsers";

export function useUserAction() {
	const dispatch = useAppDispatch();

	const addUsers = ({ id, name, email, github }: userWithId) => {
		dispatch(addUser({ id, name, email, github }));
	};

	const editUsers = ({ id, name, email, github }: userWithId) => {
		dispatch(editUser({ id, name, email, github }));
	};

	const removeUser = (id: userId) => {
		dispatch(deletUser(id));
	};

	return { addUsers, removeUser, editUsers };
}
