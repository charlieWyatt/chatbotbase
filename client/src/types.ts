export interface User {
	id: string;
	username: string;
}

export interface Message {
	id: number;
	sender: User;
	timestamp: string;
	text: string;
	isSent: boolean;
}
