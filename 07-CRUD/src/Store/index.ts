import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { userWithId } from "../interface/user";
import usersSliceReducer, { rollBackUser } from "./users/slice";

const persitedMiddleware: Middleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem("__user_middleware__", JSON.stringify(store.getState()));
};

const syncWithDataBase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;
	const previousState = store.getState();
	next(action);
	if (type === "users/editUser") {
		fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
			method: "PATCH",
		})
			.then((res) => {
				if (res.ok) {
					toast.success(`Usuario Editado correctamente: ${payload.name}`);
				}
			})
			.catch((error) => {
				toast.error(`Error al eliminar al usuario ${payload.name}`);
				console.log(error);
			});
	}

	if (type === "users/addUser") {
		fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
			method: "POST",
		})
			.then((res) => {
				if (res.ok) {
					toast.success(`Usuario Agregado correctamente: ${payload.name}`);
				}
			})
			.catch((error) => {
				toast.error(`Error al eliminar al usuario ${payload.name}`);
				console.log(error);
			});
	}

	if (type === "users/deletUser") {
		const userToRemove = previousState.users.find(
			(user: userWithId) => user.id === payload,
		);
		// tarea para hacerlo con post, delet, etc
		fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					toast.success(
						`Usuario eliminado correctamente: ${userToRemove.name}`,
					);
				}
			})
			.catch((error) => {
				toast.error(`Error al eliminar al usuario ${userToRemove.name}`);
				if (userToRemove) store.dispatch(rollBackUser(userToRemove));
				console.log(error);
			});
	}
};

export const store = configureStore({
	reducer: {
		users: usersSliceReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(persitedMiddleware).concat(syncWithDataBase),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
