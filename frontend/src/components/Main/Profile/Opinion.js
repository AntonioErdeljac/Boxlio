import React from "react";

const Opinion = props => {
	return (
		<div className="card col-12 my-3">
			<div className="card-body">
				<img src={props.opinion.author.image} height="50" style={{borderRadius: '50%'}} />
				<div className="card-text">{props.opinion.text}</div>
			</div>
		</div>
	);
}

export default Opinion;