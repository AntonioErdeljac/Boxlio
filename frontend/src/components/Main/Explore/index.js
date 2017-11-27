import React from "react";
import {connect} from "react-redux";

class Explore extends React.Component{
	render(){
		return (
			<div style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
				<div className="container" style={{paddingTop: '7%'}}>
					<h2>Explore</h2>
					<hr />
					<h5 className="text-muted my-3">Users available for delivery <span style={{color: '#1fcf7c'}}>near you</span></h5>
					
						<div className="row">
							<div className="col-4">
								<div className="card">
									<div className="card-body text-center">
										<img src={this.props.currentUser.image} height="50" style={{borderRadius:'50%'}} />
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
												<button className="btn btn-primary">Add Client</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-4">
								<div className="card">
									<div className="card-body">
										Test
									</div>
								</div>
							</div>
							<div className="col-4">
								<div className="card">
									<div className="card-body">
										Test
									</div>
								</div>
							</div>
						
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state.common
});

export default connect(mapStateToProps, null)(Explore);