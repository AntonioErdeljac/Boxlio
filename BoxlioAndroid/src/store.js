import {createStore, applyMiddleware, combineReducers} from "redux";
import {promiseMiddleware, localStorageMiddleware} from "./middleware";

import auth from "./reducers/auth";
import common from "./reducers/common";
import destinationView from "./reducers/destinationView";
import navigator from "./reducers/navigator";
import requests from "./reducers/requests";
import messages from "./reducers/messages";
import chat from "./reducers/chat";
import explore from "./reducers/explore";
import catalog from './reducers/catalog';

const reducer = combineReducers({
	auth,
	explore,
	common,
	navigator,
	destinationView,
    requests,
	messages,
	chat,
	catalog,
});

const store = createStore(reducer, applyMiddleware(promiseMiddleware, localStorageMiddleware));

export default store;