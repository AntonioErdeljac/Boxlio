import React from "react";
import agent from "../../../agent";
import {connect} from "react-redux";

const Opinion = props => {
	const handleDeleteOpinion = ev => {
		props.onDeleteOpinion(agent.Profiles.deleteOpinion(props.opinion, props.profile), props.opinion);
	}
	return (
		<div className=" col-12 my-3">
			<div className="card" style={{borderStyle: 'none', borderRadius: '10px', boxShadow: '0 0 20px 0 rgba(0,0,0,.1)'}}>
				<div className="card-body">

					<p style={{color: 'rgba(0,0,0,.6)'}}>
						<img src={props.opinion.author.image} height="40" style={{borderRadius: '50%', boxShadow: '0 0 20px 0 rgba(0,0,0,.1)'}} />
						<span className="mx-3">{props.opinion.author.firstName} {props.opinion.author.lastName} <i className="text-muted">says:</i></span>
					</p>
					<div className="card-text" style={{color: 'rgba(0,0,0,.5)'}}>{props.opinion.text}</div>
				</div>
				<div className="card-footer text-muted" style={{fontSize: '13px', borderStyle: 'none'}}>
					{new Date(props.opinion.createdAt).toDateString()}
					{props.opinion.author.username === props.currentUser.username &&
					<i className="fa fa-trash float-right" onClick={handleDeleteOpinion} /> }
				</div>
			</div>
		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	onDeleteOpinion: (payload, opinionLocal) =>
		dispatch({type: 'DELETE_OPINION', payload, opinionLocal})
});

export default connect(null, mapDispatchToProps)(Opinion);