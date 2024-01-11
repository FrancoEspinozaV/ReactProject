import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type userId = string;

interface user {
	name: string;
	email: string;
	github: string;
}

interface userWithId extends user {
	id: userId;
}

const initialState: userWithId[] = [
	{
		id: "1",
		name: "Peter Doe",
		email: "Peter_Doe@gmail.com",
		github: "PeterDoe",
	},
	{
		id: "2",
		name: "Lena Whitehouse",
		email: "Lena_Whitehouse@gmail.com",
		github: "LenaWhitehouse",
	},
	{
		id: "3",
		name: "Phil Less",
		email: "Phil_Less@gmail.com",
		github: "PhilLess",
	},
	{
		id: "4",
		name: "John Camper",
		email: "John_Camper@gmail.com",
		github: "JohnCamper",
	},
	{
		id: "5",
		name: "Max Balmoore",
		email: "Max_Balmoore@gmail.com",
		github: "MaxBalmoore",
	},
	{
		id: "6",
		name: "Peter Moore",
		email: "Peter_Moore@gmail.com",
		github: "PeterMoore",
	},
	{
		id: "7",
		name: "Joe Sachs",
		email: "Joe_Sachs@gmail.com",
		github: "JoeSachs",
	},
	{
		id: "8",
		name: "Franco Espinoza",
		email: "franco.espinoza.val@gmail.com",
		github: "FrancoEspinozaV",
	},
];

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
