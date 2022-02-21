import { User } from "src/utilities/models";

export interface UserStateInterface {
	users: User[] | [];
}

function state(): UserStateInterface {
	return {
		users: []
	};
}

export default state;
