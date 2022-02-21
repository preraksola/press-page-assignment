import { Notify } from "quasar";
import { AxiosError } from "axios";

export function notify(color: string, message: string) {
	Notify.create({
		color: color,
		message: message
	});
}

export function notifySuccess(message: string) {
	notify("positive", message);
}

export function notifyError(err: string | AxiosError) {
	let message = "";
	if (typeof err === "string") {
		message = err;
	} else if (err.response?.data) {
		message = err.response.data.message as string;
	} else if (err.message) {
		message = err.message;
	}
	if (message !== "") {
		notify("negative", message);
	}
}

export function notifyWarning(message: string) {
	notify("warning", message);
}

export function notifyInfo(message: string) {
	notify("info", message);
}
