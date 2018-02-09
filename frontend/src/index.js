import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from "./components/App";
import {Provider} from "react-redux";
import store from "./store";
import {HashRouter} from "react-router-dom";

//renderanje App komponente wrappane u Ruter i provider
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
