import React from "react";
import {connect} from "react-redux";
import agent from "../../../agent";
import CatalogItems from "./CatalogItems";
import * as actions from "../../../constants/actions";
import * as helpers from '../../../constants/helpers';

class Catalog extends React.Component{
	constructor(props){
        super(props);

        this.state = {
            searchQuery: '',
        };


    }
    componentWillMount() {
        this.props.onLoad(agent.Catalog.loadInitial());
    }
	render(){
		return (
			<div style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
				<div className="container" style={{paddingTop: '7%'}}>
					<h2>Catalog</h2>
                    <CatalogItems results={this.props.results} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
    ...state.common,
    ...state.catalog,
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: 'CATALOG_PAGE_LOADED', payload}),
});


export default connect(mapStateToProps, mapDispatchToProps)(Catalog);