import {createStore, applyMiddleware, combineReducers} from "redux";
import {promiseMiddleware, localStorageMiddleware} from "./middleware";

import auth from "./reducers/auth";
import common from "./reducers/common";
import destinationView from "./reducers/destinationView";
import navigator from "./reducers/navigator";
import requests from "./reducers/requests";

const reducer = combineReducers({
	auth,
	common,
	navigator,
	destinationView,
    requests
});

const store = createStore(reducer, applyMiddleware(promiseMiddleware, localStorageMiddleware));

export default store;