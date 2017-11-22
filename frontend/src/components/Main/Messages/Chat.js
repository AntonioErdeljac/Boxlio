import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import io from "socket.io-client";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class Chat extends React.Component{
    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.username !== this.props.match.params.username){
            
        }
    }
    




    render(){
        return (
            <div className="col-9" style={{height: '100vh', backgroundColor: 'rgba(255,255,255,.2)'}}>
            <div className="header-messenger">
               {this.props.profile ? 
               <div>
                 <p><img src={this.props.profile.image} height="40" style={{borderRadius: '50%', boxShadow: '0 0 20px rgba(0,0,0,.1)'}} className="mx-3" />{this.props.profile.firstName} {this.props.profile.lastName}</p>
                 </div> : null}
            </div>
            <MessageList socket={this.props.socket} messages={this.props.messages} currentUser={this.props.currentUser}/>
            {this.props.activeChat ? 
                <MessageInput receiver={this.props.receiver} currentUser={this.props.currentUser} name={this.props.name} socket={this.socket}/>
            : null}
        </div>
        );
    }
}



const mapStateToProps = state => ({
    ...state.messenger
})

export default withRouter(connect(mapStateToProps, null)(Chat));