import React, { Component } from 'react';
import {Router, Scene} from "react-native-router-flux";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {AsyncStorage} from "react-native";
import agent from "../agent";
import RouterComponent from "./Main/RouterComponent";
import LoggedInRouter from "./Main/LoggedInRouter";

class App extends Component<{}> {
    componentWillMount(){
        let token = null;
        AsyncStorage.getItem('Token').then((value) => {
            token = value;
        }).then(() => {
            if(token){
                agent.setToken(token);
            }
            this.props.onLoad(token ? agent.Auth.current() : null, token);
        })
        
    }

    render() {
        if(this.props.appLoaded){
        if(!this.props.currentUser){
            return (
                <RouterComponent />
            )
        }
        return (
            <LoggedInRouter />
        )
        }
        return null;
    }
}


const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo,
    currentUser: state.common.currentUser,
    appLoaded: state.common.appLoaded
});

const mapDispatchToProps = dispatch => ({
    onRedirect: () =>
        dispatch({type: 'REDIRECT'}),
    onLoad: (payload, token) =>
        dispatch({type: 'APP_LOADED', payload, token})
});

export default connect(mapStateToProps, mapDispatchToProps)(App)