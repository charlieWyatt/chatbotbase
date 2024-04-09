<template>
	<div v-if="currentUser">
		<MessagesWindow :messages="messages" />
		<MessageInputBox @refresh-messages="refreshMessages" />
		<LogOut/>
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
import { getMessages } from "./helpers/messages";
import { Message } from "./types";
import LogIn from "./components/LogIn.vue";
import LogOut from "./components/LogOut.vue"

const messages = ref<Message[]>([]);
const store = useStore();
const currentUser = computed(() => store.getters.currentUser);

async function refreshMessages() {
	if (currentUser.value) {
		messages.value = await getMessages(currentUser.value);
	}
}

onMounted(async () => {
	await refreshMessages();
});
</script>
