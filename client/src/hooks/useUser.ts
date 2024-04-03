import { ref, onMounted } from "vue";
import { getUser } from "../helpers/auth";
import { User } from "../types";

const currUser = ref<User | null>(null);

export function useUser() {
	onMounted(async () => {
		currUser.value = await getUser();
	});

	return { currUser };
}
