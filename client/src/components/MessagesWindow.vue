<template>
	<div class="messages-window">
		<MessageBubble
			v-for="message in messages"
			:key="message.id"
			:message="message"
		/>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import MessageBubble from "./MessageBubble.vue";
import { Message } from "../types";

// Accept messages as a prop
defineProps<{
	messages: Message[];
}>();
</script>

<style scoped>
.messages-window {
	border: 1px solid white; /* Adjust the border width and style as desired */
	padding: 10px; /* Optional: Adds some space inside the border */
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 0;
}
</style>
