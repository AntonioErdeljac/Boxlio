import React from "react";
import {Link} from "react-router-dom";

const UserCard = (props) => {
	return (
		<div className="col-4 my-3">
				<div className="card" style={{borderStyle: 'solid', borderRadius: '10px', borderColor: 'rgba(0,0,0,0.1)', boxShadow: '0 0 20px 0 rgba(0,0,0,.1)'}}>
					<div className="card-body text-center">
						<img src={props.currentUser.image} height="50" style={{borderRadius:'50%', boxShadow: '0 0 20px 0 rgba(0,0,0,.1)'}} />
						<h6 className="mt-3">{props.user.obj.firstName} {props.user.obj.lastName}</h6>
						<p className="text-muted">@{props.user.obj.username}</p>
						<hr />
						<div className="row">
							<div className="col-8 offset-2">
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon1"><i className="fa fa-dot-circle-o " style={{color: '#1fcf7c'}}></i></span>
									<input
										type="text"
										placeholder="Loading..."
										style={{fontSize: '3px'}}
										value={Math.round(props.user.dis)+" meters away"}
										className="form-control form-control-lg destinationInput"
									/>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-8 offset-2">
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon1"><i className="fa fa-star" style={{color: '#1fcf7c'}}></i></span>
									<input
										type="text"
										placeholder="Loading..."
										style={{fontSize: '3px'}}
										value={props.user.obj.ratings.length > 0 ? ((props.user.obj.ratings.reduce((a,b) => a+b))/props.user.obj.ratings.length).toFixed(2) : 0}
										className="form-control form-control-lg destinationInput"
									/>
								</div>
							</div>
						</div>
						<div className="row my-3">
							<div className="col">
								<button onClick={() => props.addClient(props.user.obj)} className="orderbtn btn btn-primary form-control"
										style={{backgroundColor: '#1fcf7c', borderStyle: 'none'}}>
									<i className="fa fa-user-plus"></i> Add as client
								</button>


								<Link to={`/@${props.user.obj.username}`} className="mt-3 orderbtn btn btn-primary form-control"
										style={{backgroundColor: '#2d89e5', borderStyle: 'none'}}>
									<i className="fa fa-user"></i> See Profile
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default UserCard;