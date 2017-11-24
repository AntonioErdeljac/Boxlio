import React from "react";
import agent from "../../../agent";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom"

class ClientList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            search: ''
        };
    }
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
            let filteredClients = this.props.clients.filter(client => client.firstName.toLowerCase().indexOf(this.state.search) !== -1 || client.lastName.toLowerCase().indexOf(this.state.search) !== -1)
            return (
                <div>
                     <div>
                        <div className="right-inner-addon">
                            <i className="fa fa-search" style={{color: 'rgba(0,0,0,.3)'}}></i>
                            <input onChange={ev => this.setState({search: ev.target.value})} value={this.state.search} type="text" placeholder="Search users" style={{outline: 'none', marginLeft: '15px'}} className="my-1 pl-3  search-users"/>
                        </div>
                    </div>
                    <hr />
                    <div >
                    {filteredClients.map(function(client){
                        return (
                            <Link to={`/messages/${client.username}`} className={currentClient === client.username ? "card chat-user-active" : "card chat-user"} style={{borderStyle: 'none', textDecoration: 'none'}}>
                                <div className="card-body">
                                    <img src={client.image} height="50" style={{borderRadius: '50%', boxShadow: '0 0 5px 0 rgba(0,0,0,.1)'}} alt=""/> <span className="mx-3" style={{color: 'rgba(0,0,0,.6)'}}>{client.firstName} {client.lastName}</span>
                                </div>
                            </Link>
                        )
                    })}
                    </div>
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