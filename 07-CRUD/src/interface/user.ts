export type userId = string;
export type ErrorFormAddUser = null | "ok" | "error";

export interface user {
	name: string;
	email: string;
	github: string;
}

export interface userWithId extends user {
	id: userId;
}
