<template>
	<div v-if="token">
		<MessagesWindow :messages="messages" />
		<MessageInputBox @refresh-messages="refreshMessages" />
	</div>
	<div v-else>
		<!-- Automatic signup instead of showing a login button -->
		<button @click="signup">Sign Up</button>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import MessagesWindow from "./components/MessagesWindow.vue";
import MessageInputBox from "./components/MessageInputBox.vue";
import { Message } from "./types";
import { trpc } from "./trpc";

const messages = ref<Message[]>([]);
const store = useStore();
const token = computed(() => store.state.token);

async function refreshMessages() {
	if (token.value) {
		messages.value = await trpc.message.getMessages.query({
			token: token.value,
		});
	}
}

async function signup() {
	try {
		// Use random UUIDs for username and email for automatic signup
		const username = crypto.randomUUID();
		const password = "examplePass"; // Consider a more secure approach
		const email = `${crypto.randomUUID()}@example.com`;

		// Dispatch to Vuex store action to handle signup
		await store.dispatch("signupUser", {
			username,
			password,
			email,
		});
		console.log("Signup successful");
	} catch (error) {
		console.error("Signup failed:", error);
	}
}

onMounted(() => {
	if (!token.value) {
		signup(); // Auto-signup on mount if no token is present
	}
	refreshMessages(); // Refresh messages if already signed in
});
</script>
