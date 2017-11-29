import React from "react";
import Opinion from "./Opinion";

const OpinionsList = props => {

	if(!props.opinions){
		return <p>Loading opinions...</p>
	}

	if(props.opinions.length === 0){
		return <p>There are no opinions about this user.</p>
	}
	return (
		<div className="container">
			<div className="row">

			{
				props.opinions.map(opinion => {
					return (
						<Opinion opinion={opinion} currentUser={props.currentUser} profile={props.profile} />
					)
				})
			}
			</div>
		</div>
	);
	
}

export default OpinionsList;