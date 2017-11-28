import React from "react";
import UserCard from "./UserCard";

const AvailableDeliveryUsers = (props) => {
		if(!props.nearDeliveryUsers){
			return( 
				<div className="col-6 offset-5">
					<div className="actionLoad"></div>
				</div>
			)
		}
		if(props.nearDeliveryUsers.length === 0){
			return(
				<div>
			<h6 className="text-muted">Find <span style={{color: '#1fcf7c'}}>new</span> clients.</h6>
			<hr />
			<h5 className="text-muted my-3">There are no <span style={{color: '#1fcf7c'}}>new</span> clients available <span style={{color: '#1fcf7c'}}>near you</span>, <br/> come back later to add new clients!</h5>
				</div>
		)
		}

		return (
			<div>
			<h6 className="text-muted">Find <span style={{color: '#1fcf7c'}}>new</span> clients.</h6>
				<hr />
				<div className="row">
					{props.nearDeliveryUsers.map(user => {
						return <UserCard addClient={props.addClient} user={user} currentUser={props.currentUser} />
						})
					}
				</div>
			</div>
		)
}

export default AvailableDeliveryUsers;