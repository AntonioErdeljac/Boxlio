import React from "react";
import UserCard from "./UserCard";

class AvailableDeliveryUsers extends React.Component{
	render(){
		return (
			<div className="row">
				<UserCard currentUser={this.props.currentUser} />
			</div>
		)
	};
}

export default AvailableDeliveryUsers;