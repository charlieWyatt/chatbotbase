import { User, Message } from "../types";

const BASE_URL = "http://localhost:3000"; // TODO Make the BASE_URL an env variable

const DUMMY_MESSAGES = [
	{
		id: 1,
		sender: "gpt",
		timestamp: "now",
		text: "Hello, how can I help?",
		isSent: false,
	},
	{
		id: 2,
		sender: "me",
		timestamp: "now",
		text: "please answer quickly!",
		isSent: true,
	},
	{
		id: 3,
		sender: "me",
		timestamp: "now",
		text: "okay?",
		isSent: true,
	},
	{
		id: 4,
		sender: "gpt",
		timestamp: "now",
		text: "okay!",
		isSent: false,
	},
];

// export async function getMessages(user: User): Promise<Message[]> {
// 	return DUMMY_MESSAGES;
// }

export async function getMessages(user: User): Promise<Message[]> {
	if (user == null) {
		throw new Error("Trying to get messages for a null user");
	}
	const response = await fetch(`${BASE_URL}/messages/getMessages`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ user }),
	});
	if (!response.ok) {
		throw new Error(`Failed to get messages for user ${user}`);
	}

	// Assuming the response is just a text message for demonstration purposes
	const data = await response.json();
	return data;
}

export async function sendMessage(text: string, user: User): Promise<Message[]> {
	const response = await fetch(`${BASE_URL}/messages/sendMessage`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ text, user }),
	});

	if (!response.ok) {
		throw new Error(`Failed to send message: ${text}`);
	}

    const data = await response.json();

	return data;
}
