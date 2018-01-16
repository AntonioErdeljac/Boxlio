import React from "react";
import BasketCard from "./BasketCard";

const BasketItems = (props) => {
		if(!props.items){
			return(
				<div className="col-6 offset-5">
					<div className="actionLoad"></div>
				</div>
			)
		}
		if(props.items.length === 0){
			return(
				<div>
			<h5 className="text-muted my-3">Your basket is empty!</h5>
				</div>
		)
		}

		return (
			<div>
				<div className="row">
					{props.items.map(item => {
						return <BasketCard key={item.id} item={item} />
						})
					}
				</div>
			</div>
		)
}

export default BasketItems;