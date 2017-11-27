import React from "react";
import UserCard from "./UserCard";

class AvailableDeliveryUsers extends React.Component{
	render(){
		if(this.props.nearDeliveryUsers){
			return (
				<div className="row">
					{this.props.nearDeliveryUsers.map(user => {
						return <UserCard user={user} currentUser={this.props.currentUser} />
						})
					}
				</div>
			)
		}
		return null;
	};
}

export default AvailableDeliveryUsers;