import {createStore, applyMiddleware, combineReducers} from "redux";
import {promiseMiddleware} from "./middleware";

import auth from "./reducers/auth";
import common from "./reducers/common";

const reducer = combineReducers({
	auth,
	common
});

const store = createStore(reducer, applyMiddleware(promiseMiddleware));

export default store;