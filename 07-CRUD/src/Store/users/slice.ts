import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userId, userWithId } from "../../interface/user";
import { users } from "../../mooks/users.json";

const usersWithIds: userWithId[] = users.map((user) => ({
	...user,
}));

const initialState: userWithId[] = (() => {
	const persitedState = localStorage.getItem("__user_middleware__");
	return persitedState ? JSON.parse(persitedState).users : usersWithIds;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		deletUser: (state, action: PayloadAction<userId>) => {
			const id = action.payload;
			const newUsers = state.filter((user) => user.id !== id);
			return newUsers;
		},
		addUser: (state, action: PayloadAction<userId>) => {
			// luego generar id por bd
			const id = crypto.randomUUID();
			state.push({ id, ...action.payload });
		},
		rollBackUser: (state, action: PayloadAction<userWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				state.push(action.payload);
			}
		},
		editUser: (state, action: PayloadAction<userWithId>) => {
			const { id, name, email, github } = action.payload;
			const index = state.findIndex((user) => user.id === id);
			console.log(index, name, id);
			if (index !== -1) {
				state[index] = { id, name, email, github };
			}
		},
	},
});

export default usersSlice.reducer;
export const { addUser, deletUser, rollBackUser, editUser } =
	usersSlice.actions;
