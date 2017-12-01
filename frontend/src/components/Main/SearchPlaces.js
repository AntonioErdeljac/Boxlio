import { compose, withProps, lifecycle } from "recompose";
import React from "react";
import {connect} from "react-redux";
import {
    withScriptjs,
} from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import * as actions from "../../constants/actions";

const SearchPlaces = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};

            const saveFrom = places => {
                this.props.onSaveFrom(places);
            };

            const updateFromName = name => {
                this.props.onUpdateFromName(name)
            };

            this.setState({
                places: [this.props.from],
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    saveFrom(places);
                },
                changeFrom: ev => {
                    ev.preventDefault();
                    updateFromName(ev.target.value);
                }
            })
        },
    }),
    withScriptjs
)(props =>
    <div data-standalone-searchbox="">
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                disabled={props.requestSent}
                type="text"
                placeholder="Deliver from where?"
                value={props.from}
                onChange={props.changeFrom}
                className="form-control form-control-lg destinationInput"
            />
        </StandaloneSearchBox>
    </div>
);

const mapStateToProps = state => ({
    from: state.destinationView.from,
    ...state.destinationView,
    requestSent: state.requests.requestSent
});

const mapDispatchToProps = dispatch => ({
    onSaveFrom: places =>
        dispatch({type: actions.SET_FROM, places}),

    onUpdateFromName:(name) =>
        dispatch({type: actions.UPDATE_FROM_NAME, name})
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlaces);