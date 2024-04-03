<template>
	<MessagesWindow :messages="messages" />
	<MessageInputBox @refresh-messages="refreshMessages" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MessagesWindow from "./components/MessagesWindow.vue";
import MessageInputBox from "./components/MessageInputBox.vue";
import { getMessages } from "./helpers/messages";
import { User, Message } from "./types";
import { getUser } from "./helpers/auth";

const messages = ref<Message[]>([]);
const currUser = ref<User>(null);

async function refreshMessages() {
	if (currUser.value) {
		messages.value = await getMessages(currUser.value);
	}
}

onMounted(async () => {
	currUser.value = await getUser();
	await refreshMessages();
});
</script>
