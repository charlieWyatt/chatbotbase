<template>
	<div v-if="token">
		<MessagesWindow :messages="messages" />
		<MessageInputBox @refresh-messages="refreshMessages" />
		<LogOut />
	</div>
	<div v-else>
		<LogIn />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import MessagesWindow from "./components/MessagesWindow.vue";
import MessageInputBox from "./components/MessageInputBox.vue";
import { Message } from "./types";
import LogIn from "./components/LogIn.vue";
import LogOut from "./components/LogOut.vue";
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

onMounted(async () => {
	await refreshMessages();
});
</script>
