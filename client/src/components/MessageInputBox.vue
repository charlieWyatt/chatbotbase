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
	console.log(token.value);
	if (message.value.trim() !== "" && token.value) {
		await trpc.message.sendMessage.mutate({
			token: token.value,
			text: message.value,
		});
		message.value = ""; // Reset the input field after sending
		emit("refresh-messages"); // Emit the event to notify the parent component to refresh messages
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
