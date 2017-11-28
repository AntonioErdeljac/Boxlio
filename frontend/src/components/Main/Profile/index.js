import React from "react";
import {connect} from "react-redux";
import ProfileHeader from "./ProfileHeader";
import agent from "../../../agent";

class Profile extends React.Component{
	componentWillMount(){
		this.props.onLoad(agent.Profiles.byName(this.props.match.params.username))
	}
	constructor(props){
		super(props);


		this.addClient = (client) => {
			this.props.onAddClient(agent.Profiles.add(client))
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.match.params.username !== this.props.match.params.username){
			this.props.onLoad(agent.Profiles.byName(nextProps.match.params.username))
		}
	}

	render(){
		if(this.props.profile){
			return (
				<div style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
					<div className="container-fluid" style={{paddingTop: '7%'}}>
						<ProfileHeader addClient={this.addClient} profile={this.props.profile} currentUser={this.props.currentUser}/>
					</div>
				</div>
			);
		}
		return null;
	}
}

const mapStateToProps = state => ({
	currentUser: state.common.currentUser,
	...state.profile
});

const mapDispatchToProps = dispatch => ({
	onLoad: payload =>
		dispatch({type: 'PROFILE_PAGE_LOADED', payload}),
	onAddClient: payload =>
		dispatch({type: 'ADD_CLIENT', payload})
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);