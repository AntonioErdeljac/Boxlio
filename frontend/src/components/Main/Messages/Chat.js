import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import io from "socket.io-client";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.sendPrivateRequest = (client, deliveryGuy) => {
            this.props.onSetPrivateRequest(client, deliveryGuy);
        }
    }
    render(){
        return (
            <div className="col-9" style={{height: '100vh', backgroundColor: 'rgba(255,255,255,.2)'}}>
            <div className="header-messenger">
               {this.props.profile ? 
               <div>
                 <p>
                    <img src={this.props.profile.image} height="40" style={{borderRadius: '50%', boxShadow: '0 0 20px rgba(0,0,0,.1)'}} className="mx-3" />
                    {this.props.profile.firstName} {this.props.profile.lastName} <i className="mx-3 fa fa-circle" style={this.props.profile.available ? {color: '#1fcf7c'} : {color: '#E7475E'}} />
                 </p>
                 <hr className="col-3" />
                    <button 
                        disabled={this.props.currentUser.isOrdering || !this.props.profile.deliveryMode || !this.props.profile.available || this.props.profile.isDelivering} 
                        className="orderbtn btn btn-primary mb-2"
                        onClick={() => this.sendPrivateRequest(this.props.currentUser, this.props.profile)}
                        style={{backgroundColor: '#1fcf7c', borderStyle: 'none'}}>
                            <i className="fa fa-truck"></i> Request a delivery 
                    </button> 
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
    ...state.messenger,
    currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
    onSetPrivateRequest: (client, deliveryGuy) => 
        dispatch({type: 'SET_PRIVATE_REQUEST', client, deliveryGuy})
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));