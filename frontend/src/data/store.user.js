import extend from "lodash/extend";
import store from "data/store";
import request from "controllers/request";
import { serializeArray } from "functions/helpers";
import { redirect } from "controllers/navigator";
import { ACCESS_TOKEN } from "../config";

const initialState = {
    token: false,
    user: false,
    unreadMessageCount: 0
};

function userReducer(state = initialState, action) {
    if (action.type === "SET_USER_DATA") {
        return Object.assign({}, state, {
            user: action.payload
        });
    } else if (action.type === "SET_TOKEN") {
        return Object.assign({}, state, {
            token: action.payload
        });
    } else if (action.type === "SET_UNREAD_MESSAGE_COUNT") {
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
        type: "SET_USER_DATA",
        payload: data
    };
}

function setToken(data) {
    return {
        type: "SET_TOKEN",
        payload: data
    };
}

// Functions
export function checkLoginStatus(endFunction = false) {
    if (localStorage["appState"]) {
        let appState = JSON.parse(localStorage["appState"]);
        if (appState.isLoggedIn) {
            store.dispatch(setUserData(appState.user));
            store.dispatch(setToken(appState.access_token));

            request.get("user/me" + appState.user.email, {}, function(payload) {
                if (payload) {
                    updateUserData(payload, appState.access_token);

                    if (endFunction) {
                        endFunction(true);
                    }
                } else {
                    logout(true);
                    if (endFunction) {
                        endFunction(false);
                    }
                }
            });
        } else {
            if (endFunction) {
                endFunction(false);
            }
        }
    } else {
        if (endFunction) {
            endFunction(false);
        }
    }

    return false;
}

export function login(form, finalFunction = false) {
    request.post("auth/signin", serializeArray(form), function(payload) {
        if (payload && payload.accessToken) {
            updateUserData(payload);
            localStorage.setItem(ACCESS_TOKEN, payload.accessToken);
            if (finalFunction) {
                checkLoginStatus();
                finalFunction(
                    extend({}, payload, { message: "Giriş Başarılı" })
                );
            }
        } else {
            logout(true);
            if (finalFunction) {
                finalFunction(payload);
            }
        }
    });
}

export function register(form, finalFunction = false) {
    request.post("auth/signup", serializeArray(form), function(payload) {
        if (payload && payload.success) {
            if (finalFunction) {
                finalFunction(
                    extend({}, payload, { message: "Kayıt Başarılı" })
                );
            }
        } else {
            logout(true);
            if (finalFunction) {
                finalFunction(payload);
            }
        }
    });
}

export function logout(force = false) {
    localStorage["appState"] = JSON.stringify({
        isLoggedIn: false,
        user: false,
        access_token: false
    });

    store.dispatch(setUserData(false));
    store.dispatch(setToken(false));

    if (force !== true) {
        redirect("home");
    }
}

export function updateUserData(payload, token = false) {
    let userData = extend(
        {},
        {
            avatar: "/dummy/images/profile-picture.jpg",
            access_token: token ? token : payload.accessToken,
            email: "",
            username: "",
            name: ""
        },
        payload
    );

    let appState = {
        isLoggedIn: true,
        user: userData,
        access_token: userData.access_token
    };

    localStorage["appState"] = JSON.stringify(appState);
    store.dispatch(setUserData(userData));
    store.dispatch(setToken(userData.access_token));
}

export function updateUserToken(token) {
    if (localStorage["appState"]) {
        let appState = JSON.parse(localStorage["appState"]);

        if (appState.isLoggedIn) {
            appState.access_token = token;

            store.dispatch(setToken(token));
            localStorage["appState"] = JSON.stringify(appState);

            checkLoginStatus(function(data) {
                if (!data) {
                    logout(true);
                }
            });
        }
    }
}
