export interface User {
	id: string;
	username: string;
}

export interface Message {
	id: string;
	sender: User;
	timestamp: string;
	text: string;
	isSent: boolean;
}
