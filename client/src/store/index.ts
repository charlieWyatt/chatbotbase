import { ActionContext, createStore } from "vuex";
import { trpc } from "../trpc";

interface State {
	token: string | null;
}

type Mutations = {
	setToken(state: State, payload: string): void;
	clearToken(state: State): void;
};

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
	commit<K extends keyof Mutations>(
		key: K,
		payload?: Parameters<Mutations[K]>[1] // payload type
	): ReturnType<Mutations[K]>;
};

const store = createStore<State>({
	state: {
		token: null,
	},
	mutations: {
		setToken(state: State, token: string) {
			state.token = token;
			sessionStorage.setItem("token", token);
		},
		clearToken(state: State) {
			state.token = null;
			sessionStorage.removeItem("token");
		},
	},
	actions: {
		async signupUser(
			{ commit }: ActionAugments,
			{
				username,
				password,
				email,
			}: { username: string; password: string; email: string }
		) {
			try {
				const result = await trpc.user.createUser.mutate({
					username,
					password,
					email,
				});
				if (result.token) {
					commit("setToken", result.token);
				} else {
					throw new Error("No token received from API.");
				}
			} catch (error) {
				console.error("Error signing up and obtaining token:", error);
				throw error;
			}
		},
		logoutUser({ commit }: ActionAugments) {
			commit("clearToken");
		},
	},
	getters: {
		token: (state: State) => state.token,
	},
});

export default store;
