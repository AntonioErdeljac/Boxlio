import React from "react";
import {connect} from "react-redux";
import AvailableDeliveryUsers from "./AvailableDeliveryUsers";
import agent from "../../../agent";

class Explore extends React.Component{
	componentWillMount(){
		this.props.onLoad(agent.Explore.nearDeliveryUsers())
	}
	render(){
		return (
			<div style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
				<div className="container" style={{paddingTop: '7%'}}>
					<h2>Explore</h2>
					<hr />
					<h5 className="text-muted my-3">Users available for delivery <span style={{color: '#1fcf7c'}}>near you</span></h5>
					<AvailableDeliveryUsers nearDeliveryUsers={this.props.nearDeliveryUsers} currentUser={this.props.currentUser} />
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
		dispatch({type: 'EXPLORE_PAGE_LOADED', payload})
})

export default connect(mapStateToProps, mapDispatchtoProps)(Explore);