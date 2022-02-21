import axios from "axios";

const GIT_TOKEN = "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";

axios.interceptors.request.use(
	function (config) {
		config.auth = {
			username: "prerak6962",
			password: GIT_TOKEN
		};
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export function getUsers() {
	return axios.get("https://api.github.com/users");
}

export function getFollowerCount(url: string) {
	return axios.get(url);
}

export function getSubscriptionCount(url: string) {
	return axios.get(url);
}

export function getRepoCount(url: string) {
	return axios.get(url);
}
