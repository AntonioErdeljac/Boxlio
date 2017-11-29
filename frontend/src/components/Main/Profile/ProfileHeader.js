import React from "react";
import {Link} from "react-router-dom";

const ProfileHeader = props => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-1">
					<img src={props.profile.image} style={{borderRadius: '50%', boxShadow: '0 0 20px 0 rgba(0,0,0,.1)'}} height="70" />
				</div>
				<div className="col">
					<div>
						<h5 style={{color: 'rgba(0,0,0,.6)'}}>{props.profile.firstName} {props.profile.lastName}</h5> 
					</div>
					<div>
						<p style={{color: 'rgba(0,0,0,.5)', fontSize: '15px'}}>@{props.profile.username}</p>
					</div>
					<div>
						<p className="text-muted">{props.profile.about}</p>
					</div>
					<div className="row">
						<span className="mx-3"></span>
						<p className="text-muted"><i className="fa fa-user mx-3"></i>{props.profile.clients.length}</p>
						<span className="mx-3"></span>
						<p className="text-muted"><i className="fa fa-star mx-3"></i>{props.profile.ratings}</p>
						<span className="mx-3"></span>
						<p className="text-muted"><i className="fa fa-truck mx-3"></i>{props.profile.deliveredItems}</p>
					</div>
				</div>
				<div className="col">
					{props.profile.areClients && props.profile.username !== props.currentUser.username ? 

						<Link to={`/messages/${props.profile.username}`} className="mb-3 orderbtn btn btn-primary "
							style={{backgroundColor: '#2d89e5', borderStyle: 'none'}}>
							<i className="fa fa-envelope"></i> Message
						</Link>
						:
						props.profile.username !== props.currentUser.username ?
						<button onClick={() => props.addClient(props.profile)} className="orderbtn btn btn-primary"
								style={{backgroundColor: '#1fcf7c', borderStyle: 'none'}}>
							<i className="fa fa-user-plus"></i> Add as client
						</button> : null
					}	
					<br />
					{props.profile.username !== props.currentUser.username ?
					<p className=" my-3"
							style={{color: '#E7475E', borderStyle: 'none', opacity: '0.7'}}>
						<i className="fa fa-exclamation-triangle mx-2"></i>Report this user
					</p> : null}
				</div>
			</div>
		</div>
	);
}

export default ProfileHeader;