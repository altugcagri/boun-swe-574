const initialState = {
	modalData: false,
};

function modalReducer(state = initialState, action) {
	if (action.type === "OPEN_MODAL") {
		return Object.assign({}, state, {
			modalData: action.payload
		});
	}
	else if (action.type === "CLOSE_MODAL") {
		return Object.assign({}, state, {
			modalData: false
		});
	}
	return state;
};
export default modalReducer;

// Actions
export function openModal(payload) {
	return { type: "OPEN_MODAL", payload }
};

export function closeModal() {
	return { type: "CLOSE_MODAL" }
};