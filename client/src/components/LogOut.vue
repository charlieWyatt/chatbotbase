<template>
	<button @click="logOut">Log Out</button>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();

function logOut() {
	console.log("Logging out...");
	store.dispatch("logOut");
	clearSessionId();
}

function clearSessionId() {
	sessionStorage.removeItem("sessionId");
}
</script>
