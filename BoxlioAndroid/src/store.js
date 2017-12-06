import {createStore, applyMiddleware, combineReducers} from "redux";
import {promiseMiddleware, localStorageMiddleware} from "./middleware";

import auth from "./reducers/auth";
import common from "./reducers/common";
import destinationView from "./reducers/destinationView";
import navigator from "./reducers/navigator";

const reducer = combineReducers({
	auth,
	common,
	navigator,
	destinationView
});

const store = createStore(reducer, applyMiddleware(promiseMiddleware, localStorageMiddleware));

export default store;