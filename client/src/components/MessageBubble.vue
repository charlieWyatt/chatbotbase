<template>
	<div :class="['message-container', message.isSent ? 'sent' : 'received']">
		<div class="message-bubble">
			<div class="message-content">{{ message.text }}</div>
		</div>
		<div v-if="message.timestamp" class="message-timestamp">
			{{ message.timestamp }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { Message } from "../types";
defineProps<{ message: Message }>();
</script>

<style scoped>
.message-container {
	display: flex;
	flex-direction: column;
	align-items: flex-start; /* Aligns items to the start for received messages */
	margin: 10px;
}

.sent {
	align-items: flex-end; /* Aligns items to the end for sent messages */
}

.message-bubble {
	padding: 10px;
	border-radius: 20px;
	max-width: 70%;
	background-color: #ececec; /* Default background for received messages */
}

.sent .message-bubble {
	background-color: #dcf8c6; /* Light green background for sent messages */
}

.message-timestamp {
	color: #666;
	font-size: 0.75em;
	margin-top: 5px; /* Space between the timestamp and the bubble */
}

.message-content {
	color: black;
}
</style>
