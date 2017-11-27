import {createStore, applyMiddleware, combineReducers} from "redux";
import {promiseMiddleware, localStorageMiddleware} from "./middleware";

import auth from "./reducers/auth";
import common from "./reducers/common";
import navbar from "./reducers/navbar";
import settings from "./reducers/settings";
import activeDeliveryUsers from "./reducers/activeDeliveryUsers";
import destinationView from "./reducers/destinationView";
import pointsOfInterest from "./reducers/pointsOfInterest";
import requests from "./reducers/requests";
import messenger from "./reducers/messenger";
import deliveryUserInterface from "./reducers/deliveryUserInterface";
import explore from "./reducers/explore";
import clientList from "./reducers/clientList";

const reducer = combineReducers({
    auth,
    common,
    navbar,
    settings,
    destinationView,
    activeDeliveryUsers,
    pointsOfInterest,
    requests,
    deliveryUserInterface,
    messenger,
    clientList,
    explore
});

const store = createStore(reducer, applyMiddleware(promiseMiddleware, localStorageMiddleware));

export default store;