import { createStore, StoreOptions } from "vuex";
import { User } from "../types";

// State type
interface State {
	currentUser: User | null;
}

enum MutationType {
	SET_USER = "setUser",
	CLEAR_USER = "clearUser",
}

const mutations = {
	[MutationType.SET_USER](state: State, user: User) {
		state.currentUser = user;
	},
	[MutationType.CLEAR_USER](state: State) {
		state.currentUser = null;
	},
};

type MyMutations = typeof mutations;

type TypedCommit = <K extends keyof MyMutations>(
	key: K,
	payload?: Parameters<MyMutations[K]>[1]
) => ReturnType<MyMutations[K]>;

const actions = {
	logIn({ commit }: { commit: TypedCommit }, user: User) {
		commit(MutationType.SET_USER, user);
	},
	logOut({ commit }: { commit: TypedCommit }) {
		commit(MutationType.CLEAR_USER);
	},
};

const store: StoreOptions<State> = {
	state: {
		currentUser: null,
	},
	mutations,
	actions,
	getters: {
		currentUser: (state: State): User | null => state.currentUser,
	},
};

export default createStore(store);
