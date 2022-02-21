import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { UserStateInterface } from "./state";
import { getUsers } from "src/api/gitlab";
import { notifyError } from "src/utilities/commonMethods";
import { AxiosError } from "axios";
import { User } from "src/utilities/models";

const actions: ActionTree<UserStateInterface, StateInterface> = {
	getUsers(context) {
		return getUsers()
			.then((res) => {
				const users = res.data.filter((u: User) => u.type === "User").slice(0, 10);

				context.commit("setUsers", users);
			})
			.catch((err) => {
				notifyError(err as AxiosError);
				throw err;
			});
	}
};

export default actions;
