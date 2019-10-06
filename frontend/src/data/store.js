import { combineReducers, createStore } from 'redux'
import generic from "data/store.generic";
import modals from "data/store.modals";
import user from "data/store.user";

const rootReducer = combineReducers({
	generic: generic,
	modals: modals,
	user: user
})

const store = createStore(rootReducer
	//for chrome redux extension
	//,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;