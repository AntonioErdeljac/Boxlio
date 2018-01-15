import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import agent from "../../../agent";
import ClientList from "./ClientList";
import Chat from "./Chat";
import io from "socket.io-client";
import * as actions from "../../../constants/actions";

class Messages  extends React.Component{
    componentWillMount(){
        if(this.props.match.params.username){
            let name = this.props.currentUser.deliveryMode ? this.props.currentUser.username+'_and_'+this.props.match.params.username : this.props.match.params.username+'_and_'+this.props.currentUser.username;
                this.props.onLoad(
                    Promise.all([
                    agent.Profiles.byName(this.props.match.params.username),
                    agent.Chat.byName(name),
                    agent.Chat.messagesByName(name)
                ])
            )
        }

        this.props.onRemoveAlertMessages();
        agent.Auth.update({alertMessage: false})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.username && nextProps.match.params.username !== this.props.match.params.username){
            if(!nextProps.match.path !== '/messages'){
            let name = nextProps.currentUser.deliveryMode ? nextProps.currentUser.username+'_and_'+nextProps.match.params.username : nextProps.match.params.username+'_and_'+nextProps.currentUser.username;
                this.props.onLoad(
                    Promise.all([
                    agent.Profiles.byName(nextProps.match.params.username),
                    agent.Chat.byName(name),
                    agent.Chat.messagesByName(name)
                ])
            )
            } else {
                this.props.history.push('/')
            }
        }
    }

    componentWillUnmount(){
        this.props.onUnload()
        this.socket.disconnect();
    }

    render(){
        this.socket = io('localhost:8000');
        let name = this.props.currentUser.deliveryMode ? this.props.currentUser.username+'_and_'+this.props.match.params.username : this.props.match.params.username+'_and_'+this.props.currentUser.username;
            return (
                <div style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
                    <div className="container-fluid">
                        <div className="row" >
                            <div style={{height: '100vh', paddingTop: '80px', overflow: 'auto'}}  className="col-3 users-list">
                                <ClientList />
                            </div>
                            <Chat socket={this.socket} messages={this.props.messages} receiver={this.props.match.params.username} name={name} currentUser={this.props.currentUser}/>
                        </div>
                    </div>
                    </div>
            );
        }


}
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    ...state.messenger,
    client: state.requests.client,
    deliveryGuy: state.requests.deliveryGuy
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: actions.MESSENGER_PAGE_LOADED, payload}),
    onUnload: () =>
        dispatch({type: actions.MESSENGER_PAGE_UNLOADED}),
    onRemoveAlertMessages: () =>
        dispatch({type: 'REMOVE_ALERT_MESSAGE'})
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Messages));
