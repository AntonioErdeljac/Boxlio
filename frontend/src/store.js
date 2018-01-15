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
import profile from "./reducers/profile";
import catalog from "./reducers/catalog";
import notifications from "./reducers/notifications";

const reducer = combineReducers({
    auth,
    catalog,
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
    explore,
    profile,
    notifications
});

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);

const store = createStore(reducer, middleware);

export default store;