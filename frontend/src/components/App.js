import React from "react";
import NavigationBar from "./NavigationBar";
import Main from "./Main/index";
import {Switch, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./Login";
import Settings from "./Main/Settings";
import Messages from "./Main/Messages";
import Explore from "./Main/Explore";
import agent from "../agent";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import io from "socket.io-client";
import Register from "./Register";
import {REDIRECT, APP_LOADED} from "../constants/actions";
import { TransitionGroup, CSSTransition } from 'react-transition-group';


class App extends React.Component{
    componentWillReceiveProps(nextProps){
        if(nextProps.redirectTo){
            this.props.history.push(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }
    componentWillMount(){
        const token = window.localStorage.getItem('jwt');
        if(token){
            agent.setToken(token);
        }
        this.props.onLoad(token ? agent.Auth.current() : null, token);
    }
    render(){
        if(this.props.currentUser){
            return (
            <div>
                <NavigationBar currentUser={this.props.currentUser} />

                    <div>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register"  exact component={Register} />
                        <Route path="/messages" exact component={Messages} />
                        <Route path="/messages/:username" exact component={Messages} />
                        <Route path="/settings" exact  component={Settings} />
                        <Route path="/explore" exact component={Explore} />
                        <Route path="/" exact component={Main} />
                    </Switch>
                    </div>
            </div>
            );
        }
        return (
            <div>
                <NavigationBar currentUser={this.props.currentUser}/>

                <div>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                    </Switch>
                </div>
                <Register/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo,
    currentUser: state.common.currentUser,
    appLoaded: state.common.appLoaded
});

const mapDispatchToProps = dispatch => ({
    onRedirect: () =>
        dispatch({type: REDIRECT}),
    onLoad: (payload, token) =>
        dispatch({type: APP_LOADED, payload, token})
    
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));