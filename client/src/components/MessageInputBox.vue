<template>
	<div class="main-input-box">
		<input
			v-model="message"
			placeholder="Type your message here"
			@keyup.enter="submitMessage"
		/>
		<button @click="submitMessage">Submit</button>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { trpc } from "../trpc";
import { useStore } from "vuex";

const message = ref("");
const store = useStore();
const emit = defineEmits(["refresh-messages"]);
const token = computed(() => store.state.token); // Ensure you have the token in your state

async function submitMessage() {
	if (message.value.trim() !== "" && token.value) {
		try {
			// Sending the message
			await trpc.message.sendMessage.mutate({
				token: token.value,
				text: message.value,
			});
			const userMessage = message.value;
			message.value = "";
			emit("refresh-messages");

			// Calling the GPT model reply route to get a response
			const gptResponse = await trpc.message.modelReply.mutate({
				token: token.value,
				message: userMessage,
			});

			// Handle the GPT response
			if (gptResponse && gptResponse.response) {
				emit("refresh-messages", gptResponse.response);
			}
		} catch (error) {
			console.error("Failed to send message or receive reply:", error);
		}
	}
}
</script>

<style scoped>
.main-input-box {
	display: flex;
	width: 100%;
	padding: 10px;
}

.main-input-box input {
	flex-grow: 1; /* Make the input expand to fill available space */
	padding: 10px;
	margin-right: 10px; /* Add some space between the input and the button */
}

.main-input-box button {
	width: 100px; /* Set button width to a fixed size */
}
</style>
