import { ref, onMounted } from "vue";
import { User } from "../types";
import { trpc } from "../trpc";


export function useUser() {
	const currentUser = ref<User | null>(null);

	onMounted(() => {
		const token = localStorage.getItem('token');

		if (token) {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			const decodedToken = JSON.parse(window.atob(base64));
			currentUser.value = decodedToken;
		}
	});

  return currentUser;
}

export function getUser(username: string) {
	const user = ref<User | null>(null);
	onMounted(async () => {
		user.value = await trpc.user.getUser.query({ username });
	});
	return { user };
}
