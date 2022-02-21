import { store } from "quasar/wrappers";
import { InjectionKey } from "vue";
import { createStore, createLogger, Store as VuexStore, useStore as vuexUseStore } from "vuex";
import { UserStateInterface } from "src/store/user/state";
import user from "./user";

const debug = process.env.NODE_ENV !== "production";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
	// Define your own store structure, using submodules if needed
	// example: ExampleStateInterface;
	// Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
	user: UserStateInterface;
}

// provide typings for `this.$store`
declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$store: VuexStore<StateInterface>;
	}
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol("vuex-key");

export default store(function (/* { ssrContext } */) {
	return createStore<StateInterface>({
		modules: {
			user
		},

		// enable strict mode (adds overhead!)
		// for dev mode and --debug builds only
		strict: debug,
		plugins: debug ? [createLogger()] : []
	});
});

export function useStore() {
	return vuexUseStore(storeKey);
}
