import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userId, userWithId } from "../../interface/user";
import { users } from "../../mooks/users.json";

const usersWithIds: userWithId[] = users.map((user) => ({
	...user,
}));

const initialState: userWithId[] = usersWithIds;

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		deletUser: (state, action: PayloadAction<userId>) => {
			const id = action.payload;
			const newUsers = state.filter((user) => user.id !== id);
			return newUsers;
		},
	},
});

export default usersSlice.reducer;
export const { deletUser } = usersSlice.actions;
