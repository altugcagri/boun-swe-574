import store from "data/store";
import { openModal as modalOpener, closeModal as modalCloser } from "data/store.modals";

export function openModal(key, opts = {}) {
	let payload = { modal: key, ...opts };
	store.dispatch(modalOpener(payload));
}

export function closeModal(opts) {
	store.dispatch(modalCloser());
}