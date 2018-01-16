import React from "react";
import { connect } from "react-redux";

class BasketCard extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			amount: 1,
		};
	}
	render(){
		return (
			<div className="col-12 my-3">
				<div className="card" style={{borderStyle: 'solid', borderRadius: '10px', borderColor: 'rgba(0,0,0,0.1)', boxShadow: '0 0 20px 0 rgba(0,0,0,.1)'}}>
					<div className="card-body text-center">
						<img src={this.props.item.image} height="100" width="100" style={{borderRadius:'30px', boxShadow: '0 0 20px 0 rgba(0,0,0,.1)'}} />
						<h6 className="mt-3">{this.props.item.name}</h6>
                        <span style={{color: '#1fcf7c'}}>x{this.props.item.amount}</span>
						<hr />
						<div className="row my-3">
							<div className="col-12">
								<button className="orderbtn btn btn-primary form-control"
										onClick={() => this.props.removeFromBasket(this.props.item.uniqueID)}
										style={{backgroundColor: '#E7475E', borderStyle: 'none'}}>
									Remove from basket
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	removeFromBasket: id =>
		dispatch({type: 'REMOVE_ITEM_FROM_BASKET', id}),
});

export default connect(null, mapDispatchToProps)(BasketCard);