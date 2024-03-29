import React from "react";
import { connect } from "react-redux";

class CatalogCard extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			amount: 1,
		};
	}
	render(){
		return (
			<div className="col-4 my-3">
				<div className="card" style={{borderStyle: 'solid', borderRadius: '10px', borderColor: 'rgba(0,0,0,0.1)', boxShadow: '0 0 20px 0 rgba(0,0,0,.1)'}}>
					<div className="card-body text-center">
						<img src={this.props.item.image} height="100" width="100" style={{borderRadius:'30px', boxShadow: '0 0 20px 0 rgba(0,0,0,.1)'}} />
						<h6 className="mt-3">{this.props.item.name}</h6>
						<hr />
						<div className="row my-3">
							<div className="col-8">
								<button className="orderbtn btn btn-primary form-control"
										onClick={() => this.props.addToBasket(this.props.item, this.state.amount, Math.random())}
										style={{backgroundColor: '#1fcf7c', borderStyle: 'none'}}>
									Add to basket
								</button>
							</div>
							<div className="col">
								<input className="form-control amount-item" type="number" value={this.state.amount} onChange={ev => this.setState({amount: ev.target.value})} placeholder="Amount" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	addToBasket: (item, amount, uniqueID) =>
		dispatch({type: 'ADD_ITEM_TO_BASKET', item, amount, uniqueID}),
});

export default connect(null, mapDispatchToProps)(CatalogCard);