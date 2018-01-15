import React from "react";
import {connect} from "react-redux";
import agent from "../../../agent";
import CatalogItems from "./CatalogItems";

class Catalog extends React.Component{
	constructor(props){
        super(props);

        this.state = {
            searchQuery: '',
        };

        this.handleSearchQuery = this.handleSearchQuery.bind(this);


    }
    componentWillMount() {
        this.props.onLoad(agent.Catalog.loadInitial());
    }


    handleSearchQuery(ev) {
        this.setState({
            searchQuery: ev.target.value
        }, () => {
            this.props.onLoadByQuery(agent.Catalog.search(this.state.searchQuery));
        })
    }

	render(){
		return (
			<div style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
				<div className="container" style={{paddingTop: '7%'}}>
					<h2>Catalog</h2>
                    <div>
                        <input className="form-control form-control-lg" value={this.state.searchQuery} onChange={this.handleSearchQuery} placeholder="Search items" />
                    </div>
                    <CatalogItems results={this.props.results} handleSearchQuery={this.handleSearchQuery} searchQuery={this.state.searchQuery} />
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
    onLoadByQuery: payload =>
        dispatch({type: 'SEARCH_CATALOG_ITEMS', payload}),
});


export default connect(mapStateToProps, mapDispatchToProps)(Catalog);