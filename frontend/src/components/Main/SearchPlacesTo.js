import { compose, withProps, lifecycle } from "recompose";
import React from "react";
import {connect} from "react-redux";
import agent from "../../agent";
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

            const saveTo = places => {
                this.props.onSaveTo(places,
                    agent.Auth.update({geometry: [places[0].geometry.location.lat(),places[0].geometry.location.lng()]}));
            };

            const updateToName = name => {
                this.props.onUpdateToName(name)
            };

            this.setState({
                places: [this.props.to],
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    if(places.length !== 0){
                        saveTo(places);
                    }
                },
                changeTo: ev => {
                    ev.preventDefault();
                    updateToName(ev.target.value);
                }
            })
        },
    }),
    withScriptjs
)(props =>
    <div data-standalone-searchbox="" className="input-group">
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={[45, 15]}
            onPlacesChanged={props.onPlacesChanged}
        >
                <input
                    type="text"
                    disabled={props.requestSent}
                    placeholder="Deliver to where?"
                    value={props.to}
                    onChange={props.changeTo}
                    className="form-control form-control-lg destinationInput"
                />
        </StandaloneSearchBox>
        <span class="input-group-addon" id="basic-addon2"><button disabled={props.currentUser.isOrdering || props.currentUser.isDelivering || props.currentUser.activeDeliveryJob || props.requestSent} onClick={props.onLocate} className="btn" style={{backgroundColor: '#1fcf7c', color: '#fff'}}><i className="fa fa-map-marker" /></button></span>
    </div>
);

const mapStateToProps = state => ({
    ...state.common,
    to: state.destinationView.to,
    ...state.destinationView,
    requestSent: state.requests.requestSent
});

const mapDispatchToProps = dispatch => ({
    onSaveTo: (places, payload) =>
        dispatch({type: actions.SET_TO_SPECIAL, places, payload}),

    onUpdateToName:(name) =>
        dispatch({type: actions.UPDATE_TO_NAME, name})
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlaces);