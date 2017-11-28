import React from "react";
import {connect} from "react-redux";
import ProfileHeader from "./ProfileHeader";

class Profile extends React.Component{
	render(){
		return (
			<div style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
				<div className="container" style={{paddingTop: '7%'}}>
					<ProfileHeader />
				</div>
			</div>
		);
	}
}

export default Profile;