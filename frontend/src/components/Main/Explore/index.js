import React from "react";
import {connect} from "react-redux";
import AvailableDeliveryUsers from "./AvailableDeliveryUsers";

class Explore extends React.Component{
	render(){
		return (
			<div style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
				<div className="container" style={{paddingTop: '7%'}}>
					<h2>Explore</h2>
					<hr />
					<h5 className="text-muted my-3">Users available for delivery <span style={{color: '#1fcf7c'}}>near you</span></h5>
					<AvailableDeliveryUsers currentUser={this.props.currentUser} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state.common
});

export default connect(mapStateToProps, null)(Explore);