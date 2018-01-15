import React from "react";
import CatalogCard from "./CatalogCard";

const CatalogItems = (props) => {
		if(!props.results){
			return(
				<div className="col-6 offset-5">
					<div className="actionLoad"></div>
				</div>
			)
		}
		if(props.results.length === 0){
			return(
				<div>
			<h5 className="text-muted my-3">Couldn't find anything, <span style={{color: '#1fcf7c'}}>near you</span>, <br/> try a different search!</h5>
				</div>
		)
		}

		return (
			<div>
				<div className="row">
					{props.results.map(item => {
						return <CatalogCard item={item} />
						})
					}
				</div>
			</div>
		)
}

export default CatalogItems;