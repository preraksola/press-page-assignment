import axios from "axios";

axios.interceptors.request.use(
	function (config) {
		//TODO Add GitHub API token to increase per hour API request threshold
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
