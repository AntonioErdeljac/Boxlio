import React from "react";
import io from "socket.io-client";
import {connect} from "react-redux";

class MessageInput extends React.Component{
    componentWillUnmount(){
        this.socket.disconnect();
    }
    constructor(props){
        super(props);

        this.socket = io('localhost:8000');
        this.state = {
            author: this.props.currentUser,
            body: ''
        };
        const author = this.props.currentUser;

        this.setBody = ev => this.setState({body: ev.target.value});

        this.handleKeyPress = ev => {
            if(ev.charCode === 13){
                console.log('enter je pritisnut');
                this.handleSubmit(ev);
            } else {
                let activeChat = this.props.activeChat;
                console.log('saljem u ', activeChat);
                this.socket.emit('USER_IS_TYPING', {
                    author: author,
                    name: activeChat
                })
            }
        }

        this.handleKeyUp = ev => {
            let activeChat = this.props.activeChat;            
            this.socket.emit('USER_STOPPED_TYPING', {
                author: author,
                name: activeChat
            })
        }

        this.handleSubmit = ev => {
            ev.preventDefault();
            let activeChat = this.props.activeChat;
            if(this.state.body.length > 0){                        
                this.socket.emit('SEND_MESSAGE', {
                    author: author,
                    receiver: this.props.receiver,
                    body: this.state.body,
                    name: activeChat
                }); 
            }
            this.setState({body: ''});
        }


    }
    render(){
        return(
            <div className="messageInput" style={{position: 'absolute', bottom: '15px', width:'95%'}}>
            <div className="input-group">
            <input value={this.state.body} onKeyUp={this.handleKeyUp} onKeyPress={this.handleKeyPress} onChange={this.setBody} placeholder="Write a message" type="text" style={{borderRadius:'5px', borderColor: 'rgba(0,0,0,.1)', outline:'none'}} className="form-control"/> <i onClick={this.handleSubmit} className="fa fa-paper-plane fa-2x mx-2" style={{backgroundColor: '#1fcf7c', color: '#fff', borderRadius: '50%', height: '50px', padding: '10px', fontSize:'27px', width: '50px', boxShadow: '0 0 10px 0 rgba(31,207,124,.2)'}}></i>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.messenger
})

export default connect(mapStateToProps, null)(MessageInput);