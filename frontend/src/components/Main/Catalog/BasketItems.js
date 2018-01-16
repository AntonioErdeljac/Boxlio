import React from "react";
import BasketCard from "./BasketCard";

const BasketItems = (props) => {
		if(!props.items){
			return(
				<div>
                    <h5 className="text-muted my-3 text-center">Your basket is empty!</h5>
				</div>
	    	)
		}
		if(props.items.length === 0){
			return(
				<div>
			        <h5 className="text-muted my-3 text-center">Your basket is empty!</h5>
				</div>
	    	)
		}

		return (
			<div>
				<div className="row">
					{props.items.map((item, index) => {
						return <BasketCard key={item.id} index={index} item={item} />
						})
					}
				</div>
			</div>
		)
}

export default BasketItems;