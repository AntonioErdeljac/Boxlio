import { compose, withProps, lifecycle } from "recompose";
import React from "react";
import {connect} from "react-redux";
import {
    withScriptjs,
} from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import {SET_TO_SPECIAL, UPDATE_TO_NAME} from "../../constants/actions";

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
                this.props.onSaveTo(places);
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
                    saveTo(places);
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
    <div data-standalone-searchbox="">
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={[45, 15]}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Deliver to where?"
                value={props.to}
                onChange={props.changeTo}
                className="form-control form-control-lg destinationInput"
            />
        </StandaloneSearchBox>
    </div>
);

const mapStateToProps = state => ({
    to: state.destinationView.to
});

const mapDispatchToProps = dispatch => ({
    onSaveTo: places =>
        dispatch({type: SET_TO_SPECIAL, places}),

    onUpdateToName:(name) =>
        dispatch({type: UPDATE_TO_NAME, name})
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlaces);