
import React from 'react';
import agent from "../../agent";
import {connect} from "react-redux";

const UsersList = props => {
    if(props.profiles){
        return (
            <div style={{maxHeight: '300px'}}>
                {props.profiles.map(profile => {
                    return (
                        <div>
                        <div className="card my-2">
                            <span className="card-body">
                                <span style={{borderRadius: '10px', boxShadow: '0 0 10px 0 rgba(0,0,0,.2)', paddingBottom:'15px', padding: '8px' }}>
                                    <img src={profile.image} alt="" style={{borderRadius:'10px'}} height="30"/>
                                </span>
                                <span>
                                    <b className="mx-3" style={{color: 'rgba(0,0,0,.6)', fontSize: '15px'}}>{profile.firstName}</b>
                                </span>

                            </span>
                        </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    return null;
};

class ActiveDeliveryUsers extends React.Component{
    constructor(props){
        super(props);

    }

    componentWillMount(){
        this.props.onLoad(agent.Profiles.all())
    }

    render(){
            return (
                <nav className="py-2 float-modal-users">
                    <div className="container">
                       <div className="">
                           <h5 className="text-center"><b style={{color: "#1fcf7c"}}>All Users</b></h5>
                           <hr/>
                           <UsersList currentUser={this.props.currentUser} profiles={this.props.profiles}/>
                       </div>
                    </div>
                </nav>
            );
    }
}

const mapStateToProps = state => ({
    ...state.activeDeliveryUsers,
    currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: 'ACTIVE_DELIVERY_USERS_LOADED', payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveDeliveryUsers);