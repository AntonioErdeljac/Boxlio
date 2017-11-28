import React from "react";
import {connect} from "react-redux";
import AvailableDeliveryUsers from "./AvailableDeliveryUsers";
import agent from "../../../agent";

class Explore extends React.Component{
	componentWillMount(){
		this.props.onLoad(agent.Explore.nearDeliveryUsers())
	}
	componentWillUnmount(){
		this.props.onUnload();
	}
	constructor(props){
		super(props);
		this.addClient = (client) => {
			this.props.onAddClient(agent.Profiles.add(client))
		}
	}
	render(){
		return (
			<div style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
				<div className="container" style={{paddingTop: '7%'}}>
					<h2>Explore</h2>
					<AvailableDeliveryUsers addClient={this.addClient} nearDeliveryUsers={this.props.nearDeliveryUsers} currentUser={this.props.currentUser} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state.common,
	...state.explore
});

const mapDispatchtoProps = dispatch => ({
	onLoad: payload =>
		dispatch({type: 'EXPLORE_PAGE_LOADED', payload}),
	onUnload: () =>
		dispatch({type: 'EXPLORE_PAGE_UNLOADED'}),
	onAddClient: payload =>
		dispatch({type: 'ADD_CLIENT', payload})
})

export default connect(mapStateToProps, mapDispatchtoProps)(Explore);