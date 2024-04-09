<template>
	<button @click="signup">Sign Up</button>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();

const signup = async () => {
	try {
		// Ensure these values are collected from user input in a real application
		const username = crypto.randomUUID();
		const password = "examplePass";
		const email = `${crypto.randomUUID()}@example.com`; // Add email input as required by the signup process

		// Dispatch to the correct Vuex action
		await store.dispatch("signupUser", {
			username,
			password,
			email,
		});
		console.log("Signup successful");
	} catch (error) {
		console.error("Signup failed:", error);
	}
};
</script>
