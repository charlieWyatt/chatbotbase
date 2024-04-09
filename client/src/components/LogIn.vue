<template>
	<button @click="logIn">Log In</button>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { trpc } from "../trpc";

const store = useStore();

async function logIn() {
	console.log("Redirecting to login...");
	const sessionId = await getSessionId();
	console.log(sessionId);
	store.dispatch("logIn", { id: sessionId, username: "testing" });
}

async function generateSessionId() {
	// TODO @charliewyatt need to fix this up
	const id = crypto.randomUUID();
	const dummyPassword = "password123"; // Dummy password (ideally should be securely generated)
	const dummyEmail = `user${id}@example.com`; // Dummy email

	// Call the createUser mutation with dummy data
	try {
		await trpc.user.createUser.mutate({
			username: id,
			password: dummyPassword,
			email: dummyEmail,
		});
		console.log(`User created with username: ${id}`);
	} catch (error) {
		console.error("Error creating user:", error);
	}

	return id;
}

async function getSessionId() {
	let sessionId = sessionStorage.getItem("sessionId");
	if (!sessionId) {
		sessionId = await generateSessionId();
		sessionStorage.setItem("sessionId", sessionId);
	}
	return sessionId;
}
</script>
