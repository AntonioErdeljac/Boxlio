import React from "react";
import {connect} from "react-redux";
import agent from "../../../agent";
import * as actions from "../../../constants/actions";

class NotFoundView extends React.Component{
	componentWillMount(){
		this.props.onLoad(agent.Explore.nearDeliveryUsers())
	}
	componentWillUnmount(){
		this.props.onUnload();
	}
	constructor(props){
		super(props);
		this.addClient = (client) => {
			this.props.onAddClient(agent.Profiles.add(client))
		}
	}
	render(){
		return (
			<div  style={{height: '100%', width: '100%', backgroundColor: '#fff', color: 'rgba(0,0,0,.7)'}}>
				<div className="container text-center mx-auto" style={{paddingTop: '7%'}}>
					<h2 className="my-3"><b>404</b></h2>
					<p>Page you're trying to find is not available<br/>or has been removed.</p>
					<button onClick={() => this.props.history.push('/')} className="btn btn-primary" style={{borderRadius: '30px', backgroundColor: '#1fcf7c', color: '#fff', fontSize: '15px', borderStyle: 'none', boxShadow:'0 0 20px 0 rgba(0,0,0,.1)'}}>
						Take me back
					</button>
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
		dispatch({type: actions.EXPLORE_PAGE_LOADED, payload}),
	onUnload: () =>
		dispatch({type: actions.EXPLORE_PAGE_UNLOADED}),
	onAddClient: payload =>
		dispatch({type: actions.ADD_CLIENT, payload})
})

export default connect(mapStateToProps, mapDispatchtoProps)(NotFoundView);