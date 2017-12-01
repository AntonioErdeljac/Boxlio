import React from "react";
import agent from "../../../agent";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom"
import * as actions from "../../../constants/actions";

class ClientList extends React.Component{
        render(){
            if(this.props.clients){
            return (
                
                <div className="text-center col-3 users-list" style={{marginTop: '2%', paddingTop: '3%', overflow: 'auto'}}>
                    {this.props.clients.map(client => {
                        if(client.username === this.props.match.params.username){
                            return (
                                <div>
                                   <img src={client.image} className="my-3" height="70" style={{borderRadius: '50%', boxShadow: '0 0 5px 0 rgba(0,0,0,.2)'}} />
                                   <h4>{client.firstName} {client.lastName}</h4>
                                   <hr />
                                </div>
                            )
                        }
                    })}
                </div>
            )
        }
        return null;
        }
    }

const mapStateToProps = state => ({
    clients: state.clientList.clients,
    ...state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: actions.CLIENT_LIST_PAGE_LOADED, payload}),
    onUnload: () =>
        dispatch({type: actions.CLIENT_LIST_PAGE_UNLOADED})
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClientList));