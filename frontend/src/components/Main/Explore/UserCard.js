import React from "react";

class UserCard extends React.Component{
	render(){
		return (
			<div className="col-4">
					<div className="card">
						<div className="card-body text-center">
							<img src={this.props.currentUser.image} height="50" style={{borderRadius:'50%', boxShadow: '0 0 20px 0 rgba(0,0,0,.1)'}} />
							<h6 className="mt-3">Antonio Erdeljac</h6>
							<p className="text-muted">@antonio</p>
							<hr />
							<div className="row">
								<div className="col-8 offset-2">
									<div class="input-group">
									  <span class="input-group-addon" id="basic-addon1"><i className="fa fa-dot-circle-o " style={{color: '#1fcf7c'}}></i></span>
									  	<input
		                                    type="text"
		                                    placeholder="Loading..."
		                                    style={{fontSize: '3px'}}
		                                    value="Kastav, Štivar 1"
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
		                                    value="5,00"
		                                    className="form-control form-control-lg destinationInput"
		                                />
									</div>
								</div>
							</div>
							<div className="row my-3">
								<div className="col">
                                    <button className="orderbtn btn btn-primary form-control"
                                            style={{backgroundColor: '#1fcf7c', borderStyle: 'none'}}>
                                        <i className="fa fa-user-plus"></i> Add as client
                                    </button>
								</div>
							</div>
						</div>
					</div>
				</div>
				);
	}
}

export default UserCard;