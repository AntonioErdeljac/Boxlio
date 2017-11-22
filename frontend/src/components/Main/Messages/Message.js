import React from "react";
import io from "socket.io-client";

class Message extends React.Component{
    render(){
        const whichClass = this.props.message.author.username === this.props.currentUser.username ? 'your-msg my-3' : 'opposite-msg my-3';
        return (
            <div>
                <img src={this.props.message.author.image} className="mx-3" height="30" style={{borderRadius: '50%', boxShadow: '0 0 5px rgba(0,0,0,.2)'}} />
                <div className={whichClass}>
                    {this.props.message.body}
                </div>
            </div>
        );
    }
}

export default Message;