import React from "react";
import agent from "../../../agent";
import {connect} from "react-redux";

class OpinionInput extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			text: ''
		};

		this.handleSubmit = ev => {
			ev.preventDefault();
			let opinion = {
				text: this.state.text,
				author: this.props.currentUser,
				profile: this.props.profile
			};
			this.props.onSubmit(agent.Profiles.postOpinion(opinion));
		}
	}
	render(){
		if(this.props.profile){
			return (
				<div>
					<textarea onChange={ev => this.setState({text: ev.target.value})} value={this.state.text} className="form-control" rows="3"></textarea>
	                <button onClick={this.handleSubmit} className="orderbtn btn btn-primary my-3  float-right"
	                        style={{backgroundColor: '#2d89e5', borderStyle: 'none'}}>
	                	<i className="fa fa-paper-plane"></i> Post opinion
	        		</button>
	    		</div>
	        );
        }
        return null;
	}
}

const mapStateToProps = state => ({
	currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
	onSubmit: payload =>
		dispatch({type: 'ADD_OPINION', payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(OpinionInput);