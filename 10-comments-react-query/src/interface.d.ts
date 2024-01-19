export interface Comment {
	title: string;
	message: string;
}

export interface CommentWithId extends Comment {
	id: string;
}
