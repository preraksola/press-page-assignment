import { MutationTree } from "vuex";
import { UserStateInterface } from "./state";
import { User } from "src/utilities/models";

const mutation: MutationTree<UserStateInterface> = {
	deleteUser(state: UserStateInterface, user: User): void {
		state.users = state.users.filter((u) => u.id !== user.id);
	},
	setUsers(state: UserStateInterface, users: User[]): void {
		state.users = users;
	}
};

export default mutation;
