import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { UserStateInterface } from "./state";

const getters: GetterTree<UserStateInterface, StateInterface> = {
	getUsersByCount: (state: UserStateInterface) => {
		return state.users;
	}
};

export default getters;
