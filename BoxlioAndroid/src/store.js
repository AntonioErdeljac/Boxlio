import {createStore, applyMiddleware, combineReducers} from "redux";
import {promiseMiddleware} from "./middleware";

import auth from "./reducers/auth";
import common from "./reducers/common";
import navigator from "./reducers/navigator";

const reducer = combineReducers({
	auth,
	common,
	navigator
});

const store = createStore(reducer, applyMiddleware(promiseMiddleware));

export default store;