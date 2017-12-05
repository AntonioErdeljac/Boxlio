import React, { Component } from 'react';
import Welcome2 from "./Auth/Welcome2";
import WelcomeCurrentUser from "./Auth/WelcomeCurrentUser";
import Navigation from "./Navigation";
import {Router, Scene} from "react-native-router-flux";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {AsyncStorage} from "react-native";
import agent from "../agent";

class App extends Component<{}> {
    componentWillReceiveProps(nextProps){
        if(nextProps.redirectTo){
            if(nextProps.redirectTo === 'home'){
                Actions.home();
            }
            this.props.onRedirect();
        }
    }

    componentWillMount(){
        let token = null;
        AsyncStorage.getItem('Token').then((value) => {
            token = value;
        }).then(() => {
            if(token){
                agent.setToken(token);
            }
            this.props.onLoad(token ? agent.Auth.current() : null, token);
            if(token && !this.props.appLoaded){
                Actions.navigation();
            }
        })
        
    }

    render() {
        return (
            <Router >
                <Scene key="root">
                    <Scene key="home" hideNavBar={true} component={Welcome2} />
                    <Scene key="welcomecurrentuser" hideNavBar={true} component={WelcomeCurrentUser} />
                    <Scene key="navigation" hideNavBar={true} component={Navigation} />
                </Scene>
           </Router>
        )       
    }
}


const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
    onRedirect: () =>
        dispatch({type: 'REDIRECT'}),
    onLoad: (payload, token) =>
        dispatch({type: 'APP_LOADED', payload, token})
});

export default connect(mapStateToProps, mapDispatchToProps)(App)