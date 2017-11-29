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
			this.setState({text: ''})
		}
	}
	render(){
		if(this.props.profile){
			return (
				<div>
					<textarea 
						placeholder="Write an opinion on this user, good or bad." 
						onChange={ev => this.setState({text: ev.target.value})} 
						value={this.state.text} 
						className="form-control" 
						style={{borderRadius: '10px', borderStyle: 'none', boxShadow: '0 0 20px 0 rgba(0,0,0,.1)', padding: '25px'}} 
						rows="4">
					</textarea>
	                <button disabled={this.state.text.length === 0} onClick={this.handleSubmit} className="orderbtn btn btn-primary my-3  float-md-right float-center"
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