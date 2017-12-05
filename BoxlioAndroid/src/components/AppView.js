import React, { Component } from 'react';
import Welcome2 from "./Auth/Welcome2";
import WelcomeCurrentUser from "./Auth/WelcomeCurrentUser";
import Navigation from "./Navigation";
import {Router, Scene} from "react-native-router-flux";


export default class App extends Component<{}> {
    render() {

        return (
            <Router >
                <Scene key="root">
                    <Scene key="login" hideNavBar={true} component={Welcome2} />
                    <Scene key="welcomecurrentuser" hideNavBar={true} component={WelcomeCurrentUser} />
                    <Scene key="navigation" hideNavBar={true} component={Navigation} />
                </Scene>
           </Router>
        );
    }
}


