import React from "react";
import agent from "../../../agent";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom"

class ClientList extends React.Component{
    componentWillMount(){
        this.props.onLoad(agent.Clients.all())
    }
    componentWillUnmount(){
        this.props.onUnload();
    }
    componentWillReceiveProps(nextProps){
    }
    render(){
        if(this.props.clients && this.props.clients.length === 0){
            return (
                <p className="text-center">Your clients will be displayed here</p>
            )
        }
        if(!this.props.clients){
            <div className="text-center">
                <i className="fa fa-circle-o-notch fa-spin fa-3x my-2" style={{color: '#1fcf7c'}}></i> 
            </div>           
        }
        if(this.props.clients && this.props.clients.length > 0){
            const currentClient = this.props.match.params.username;
            return (
                <div>
                    {this.props.clients.map(function(client){
                        return (
                            <Link to={`/messages/${client.username}`} className={currentClient === client.username ? "card chat-user-active" : "card chat-user"} style={{borderStyle: 'none', textDecoration: 'none'}}>
                                <div className="card-body">
                                    <img src={client.image} height="50" style={{borderRadius: '50%', boxShadow: '0 0 5px 0 rgba(0,0,0,.1)'}} alt=""/> <span className="mx-3" style={{color: 'rgba(0,0,0,.6)'}}>{client.firstName} {client.lastName}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            );
        }
        return (
            <p className="text-center">Your clients will be displayed here</p>
        )
    }
}

const mapStateToProps = state => ({
    clients: state.clientList.clients,
    ...state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: 'CLIENT_LIST_PAGE_LOADED', payload}),
    onUnload: () =>
        dispatch({type: 'CLIENT_LIST_PAGE_UNLOADED'})
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClientList));