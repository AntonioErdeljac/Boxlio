import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from "./components/App";
import Login from "./components/Login";
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter, Route, Switch, Router, HashRouter} from "react-router-dom";


ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
