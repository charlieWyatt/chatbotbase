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
import { ref } from "vue";
import { sendMessage } from "../helpers/messages";
import { useUser } from "../hooks/useUser";

const message = ref("");
const emit = defineEmits(["refresh-messages"]);

const { currUser } = useUser();

async function submitMessage() {
	if (message.value.trim() !== "" && currUser.value) {
		await sendMessage(message.value, currUser.value);
		message.value = ""; // Reset the input field
		emit("refresh-messages"); // Emit the event to notify the parent to refresh messages
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
