import { User } from "../types";

const BASE_URL = "http://localhost:3000/auth"; // TODO Make the BASE_URL an env variable

export async function login(username: string, password: string): Promise<any> {
	try {
		const response = await fetch(`${BASE_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		if (!response.ok) {
			throw new Error("Failed to log in");
		}

		// Assuming the response is just a text message for demonstration purposes
		const data = await response.text();
		return data;
	} catch (error) {
		console.error("Login error:", error);
		throw error;
	}
}

export async function logout(): Promise<void> {
	try {
		const response = await fetch(`${BASE_URL}/logout`, {
			method: "GET",
		});

		if (!response.ok) {
			throw new Error("Failed to log out");
		}

		// Assuming the logout doesn't need to return anything specific for now
		console.log("Logged out successfully");
	} catch (error) {
		console.error("Logout error:", error);
		throw error;
	}
}

export async function getUser(): Promise<any> {
	return "test";
	try {
		const response = await fetch(`${BASE_URL}/user`, {
			method: "GET",
		});

		if (!response.ok) {
			throw new Error("Failed to fetch user");
		}

		// Assuming the user details are returned in JSON format
		const user = await response.json();
		return user;
	} catch (error) {
		console.error("GetUser error:", error);
		throw error;
	}
}
