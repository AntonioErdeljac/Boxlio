import React from "react";
import Message from "./Message";
import io from "socket.io-client";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../../constants/actions";
import $ from "jquery";

class MessageList extends React.Component{

    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.username !== this.props.match.params.username){
            let name2 = nextProps.currentUser.deliveryMode ? nextProps.currentUser.username+'_and_'+nextProps.match.params.username : nextProps.match.params.username+'_and_'+nextProps.currentUser.username;                        
            let name = this.props.currentUser.deliveryMode ? this.props.currentUser.username+'_and_'+this.props.match.params.username : this.props.match.params.username+'_and_'+this.props.currentUser.username;                        
            
            console.log('leaveam chatroom', name);            
            this.socket.emit('LEAVE_CHATROOM', {
                name: name
            })
            console.log('joinam novi chatroom', name2);
            this.socket.emit('JOIN_CHATROOM', {
                name: name2
            })

            this.props.onSetActiveChat(name2);
        }
    }

    componentWillUnmount(){
        let name = this.props.currentUser.deliveryMode ? this.props.currentUser.username+'_and_'+this.props.match.params.username : this.props.match.params.username+'_and_'+this.props.currentUser.username;                                
        console.log('leaveam chatroom', name);            
        this.socket.emit('LEAVE_CHATROOM', {
            name: name
        })
    }

    componentDidMount(){
        this.socket = this.props.socket;
        if(this.props.match.params.username){
            let name = this.props.currentUser.deliveryMode ? this.props.currentUser.username+'_and_'+this.props.match.params.username : this.props.match.params.username+'_and_'+this.props.currentUser.username;                        
            
            console.log('joinam initial chatroom', name);
                this.socket.emit('JOIN_CHATROOM', {
                    name: name
                })
            
            this.props.onSetActiveChat(name);
        }

        

        const currentUser = this.props.currentUser;
        

        this.socket.on('RECEIVE_USER_IS_TYPING', (data) => {
            console.log('user is typing', data);
            const isOwn = data.author.username === currentUser.username;
            if(!isOwn){
                
                if(document.getElementById('typing')){
                    var typingdiv = document.getElementById('typing').innerHTML = `<div class="opposite-msg my-3"><img src=${data.author.image} style="border-radius: 50%;box-shadow: 0 0 5px 0 rgba(0,0,0,.3)" height="30" />&nbsp;<span style="color: grey"> is typing a message...</span></div>`;                    
                    var container = $('#messagescroll')[0];
                    if(container){
                        var containerHeight = container.clientHeight;
                        var contentHeight = container.scrollHeight;
                        console.log(contentHeight-container.scrollTop)
                        if(contentHeight-container.scrollTop < 1700){
                            container.scrollTop = contentHeight - containerHeight;
                        }
                    }        
            
                }
            }
        })

        const handleAddMessage = data => {
            
            var container = $('#messagescroll')[0];
            console.log(container);
            var containerHeight = container.clientHeight;
            var contentHeight = container.scrollHeight;
            
            container.scrollTop = contentHeight - containerHeight;
            this.props.onAddMessage(data);
        };

        this.socket.on('RECEIVE_MESSAGE', (data) => {
            handleAddMessage(data);
        })

        this.socket.on('RECEIVE_USER_STOPPED_TYPING', (data) => {
            setTimeout(function(){
                if(document.getElementById('typing')){
                    var typingdiv = document.getElementById('typing').innerHTML = '';
                }
        }, 5000)
        })

    }
    

    render(){
        if(this.props.messages){
            setTimeout(function(){
        var container = $('#messagescroll')[0];
        if(container){
        var containerHeight = container.clientHeight;
        var contentHeight = container.scrollHeight;
        
        container.scrollTop = contentHeight - containerHeight;
    }
    }, 200)
    }
        return (
            <div id="messagescroll" style={this.props.messages ? {position: 'absolute', top: '10%', width:'95%', paddingTop: '15%', height:'80%', overflow: 'auto'} : {position: 'absolute', top: '40%', width:'95%'}}>
            { !this.props.messages ? <div className="text-center">
                <i className="fa fa-envelope-o text-muted" style={{fontSize: '100px'}}></i>
                <h4 className="text-muted">Your messages will appear here</h4> 

                </div> : 
                this.props.messages.map(message => {
                    return (
                        <div style={{top: '0', position: 'relative'}}>
                            <Message currentUser={this.props.currentUser} message={message} />
                        </div>
                    )
                })}
            <div id="typing"></div>
            </div> 
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onSetActiveChat: name =>
        dispatch({type: actions.SET_ACTIVE_CHAT, name}),
    onAddMessage: data =>
    dispatch({type: actions.ADD_MESSAGE, data})
})

const mapStateToProps = state => ({
    ...state.messenger
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageList));