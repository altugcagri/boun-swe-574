import extend from 'lodash/extend'
import store from "data/store"
import request from 'controllers/request'
import { serializeArray } from 'functions/helpers'
import { redirect } from 'controllers/navigator'
import { ACCESS_TOKEN } from '../config';

const initialState = {
	token: false,
	user: false,
	unreadMessageCount: 0,
};

function userReducer(state = initialState, action) {
	if (action.type === "SET_USER_DATA") {
		return Object.assign({}, state, {
			user: action.payload
		});
	}
	else if (action.type === "SET_TOKEN") {
		return Object.assign({}, state, {
			token: action.payload
		});
	}
	else if (action.type === "SET_UNREAD_MESSAGE_COUNT") {
		return Object.assign({}, state, {
			unreadMessageCount: action.payload
		});
	}
	return state;
}

export default userReducer;

// Actions
function setUserData(data) {
	return {
		type: 'SET_USER_DATA',
		payload: data
	};
}

function setToken(data) {
	return {
		type: 'SET_TOKEN',
		payload: data
	};
}


// Functions
export function checkLoginStatus(endFunction = false) {
	if (localStorage["appState"]) {
		let appState = JSON.parse(localStorage["appState"]);
		if (appState.isLoggedIn) {
			store.dispatch(setUserData(appState.user));
			store.dispatch(setToken(appState.authToken));

			request.get('users/' + appState.user.email, {}, function (payload) {
				if (payload && payload.success) {
					updateUserData(payload);

					if (endFunction) {
						endFunction(true);
					}
				}
				else {
					logout(true);
					if (endFunction) {
						endFunction(false);
					}
				}
			});
		}
		else {
			if (endFunction) {
				endFunction(false);
			}
		}
	}
	else {
		if (endFunction) {
			endFunction(false);
		}
	}

	return false;
}

export function login(form, finalFunction = false) {
	request.post('user/login', serializeArray(form), function (payload) {
		if (payload && payload.success) {
			updateUserData(payload);
			localStorage.setItem(ACCESS_TOKEN, payload.accessToken);
			if (finalFunction) {
				finalFunction(extend({}, payload, { message: "Giriş Başarılı" }));
			}
		}
		else {
			logout(true);
			if (finalFunction) {
				finalFunction(payload);
			}
		}
	})
}


export function register(form, finalFunction = false) {
	request.post('user/register', serializeArray(form), function (payload) {
		if (payload && payload.success) {
			//updateUserData(payload);

			if (finalFunction) {
				finalFunction(extend({}, payload, { message: "Kayıt Başarılı" }));
			}
		}
		else {
			logout(true);
			if (finalFunction) {
				finalFunction(payload);
			}
		}
	})
}

export function logout(force = false) {
	localStorage["appState"] = JSON.stringify({ isLoggedIn: false, user: false, authToken: false });

	store.dispatch(setUserData(false));
	store.dispatch(setToken(false));

	if (force !== true) {
		redirect('home');
	}
}

export function updateUserData(payload) {
	let userData = extend({}, {
		avatar: "/dummy/images/profile-picture.jpg",
		name: "Kullanıcı",
		email: "",
	}, payload.userData);

	let appState = {
		isLoggedIn: true,
		user: userData,
		authToken: userData.auth_token,
	};

	localStorage["appState"] = JSON.stringify(appState);
	store.dispatch(setUserData(userData));
	store.dispatch(setToken(userData.auth_token));
}

export function updateUserToken(token) {
	if (localStorage["appState"]) {
		let appState = JSON.parse(localStorage["appState"]);

		if (appState.isLoggedIn) {
			appState.authToken = token;

			store.dispatch(setToken(token));
			localStorage["appState"] = JSON.stringify(appState);

			checkLoginStatus(function (data) {
				if (!data) {
					logout(true);
				}
			});
		}
	}
}