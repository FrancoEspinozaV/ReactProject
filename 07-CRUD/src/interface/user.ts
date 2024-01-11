export type userId = string;

export interface user {
	name: string;
	email: string;
	github: string;
}

export interface userWithId extends user {
	id: userId;
}
