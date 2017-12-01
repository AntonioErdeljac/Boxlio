import React from "react"
import { compose, withProps, withHandlers, lifecycle } from "recompose"
import { BicyclingLayer, withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView, DirectionsRenderer, TrafficLayer } from "react-google-maps"
import {connect} from "react-redux";
import store from "../../../store";
import DestinationView from "../DestinationView";
import RequestView from "../RequestView";
import DeliveryUserInterface from "../DeliveryUserInterface";
import {styles} from "./mapStyles";
import * as actions from "../../../constants/actions";


const mapLoaded = () => {
    store.dispatch({type: actions.MAP_LOADED});
};

const setFrom = (lat, lng, from) => {
    store.dispatch({type: actions.UPDATE_FROM, lat, lng, from})
};


const setFromHandler = (latLng) => {
    let lat = latLng.lat();
    let lng = latLng.lng();
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ';
    fetch(url)
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(function(data) {
            setFrom(lat,lng,data.results[0].formatted_address);
        });
};



const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
});

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div id="map-container" style={{ height: `100%` }} />
    }),
    withHandlers((props) => {
        return {
            onTilesLoaded: ({ onTilesLoaded }) => () => {
                mapLoaded()
            },

            onClick: ({onClick}) => ev => {
                if(!props.currentUser.isOrdering) {
                    setFromHandler(ev.latLng);
                }
            }
        }
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentWillMount(){
            const DirectionsService = new window.google.maps.DirectionsService();

            if(this.props.deliveryGuy){
                DirectionsService.route({
                    origin: new window.google.maps.LatLng(this.props.deliveryGuy.geometry[0], this.props.deliveryGuy.geometry[1]),
                    destination: new window.google.maps.LatLng(this.props.lat, this.props.lng),
                    travelMode: window.google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions3: result,
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                });
            }

            if(this.props.currentUser || this.props.lat && this.props.lng ){
                DirectionsService.route({
                    origin: new window.google.maps.LatLng(this.props.currentUser.geometry[0], this.props.currentUser.geometry[1]),
                    destination: new window.google.maps.LatLng(this.props.lat, this.props.lng),
                    travelMode: window.google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result,
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                });
            }

            if(this.props.lat && this.props.lng) {
                DirectionsService.route({
                    origin: new window.google.maps.LatLng(this.props.currentUser.geometry[0], this.props.currentUser.geometry[1]),
                    destination: new window.google.maps.LatLng(this.props.lat, this.props.lng),
                    travelMode: window.google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result,
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                });
            }


            if(this.props.currentUser.deliveryMode && this.props.clientLat && this.props.clientLng && this.props.lat && this.props.lng) {
                DirectionsService.route({
                    origin: new window.google.maps.LatLng(this.props.lat, this.props.lng),
                    destination: new window.google.maps.LatLng(this.props.clientLat, this.props.clientLng),
                    travelMode: window.google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directionsToClient: result,
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                });
            }
        },
        componentWillReceiveProps(nextProps) {
            console.log(nextProps, 'NEXT PROPS');
            const DirectionsService = new window.google.maps.DirectionsService();

            if(nextProps.currentUser.transportation){
                this.setState({
                    transportation: nextProps.currentUser.transportation
                });
            }
            

            if(nextProps.requestAccepted === false || nextProps.deliveryGuy === null){
                this.setState({
                    directions: null,
                    directions3: null,
                    directionsToClient: null
                })
            }

            if(nextProps.currentUse && !nextProps.requestSent|| nextProps.lat && nextProps.lng && nextProps.placeChoosen ){
                DirectionsService.route({
                    origin: new window.google.maps.LatLng(nextProps.currentUser.geometry[0], nextProps.currentUser.geometry[1]),
                    destination: new window.google.maps.LatLng(nextProps.lat, nextProps.lng),
                    travelMode: window.google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result,
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                });
            }



            if(nextProps.deliveryGuy && nextProps.locationName && nextProps.requestAccepted){
                DirectionsService.route({
                    origin: new window.google.maps.LatLng(nextProps.deliveryGuy.geometry[0], nextProps.deliveryGuy.geometry[1]),
                    destination: new window.google.maps.LatLng(this.props.lat, this.props.lng),
                    travelMode: window.google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions3: result,
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                });
            }


            if(nextProps.lat && nextProps.lng) {
                if(nextProps.deliveryGuy){
                    DirectionsService.route({
                        origin: new window.google.maps.LatLng(nextProps.deliveryGuy.geometry[0], nextProps.deliveryGuy.geometry[1]),
                        destination: new window.google.maps.LatLng(nextProps.lat, nextProps.lng),
                        travelMode: window.google.maps.TravelMode.DRIVING,
                    }, (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            this.setState({
                                directions3: result,
                            });
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    });
                }
                DirectionsService.route({
                    origin: new window.google.maps.LatLng(this.props.currentUser.geometry[0], this.props.currentUser.geometry[1]),
                    destination: new window.google.maps.LatLng(nextProps.lat, nextProps.lng),
                    travelMode: window.google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result,
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                });
            }
            if(nextProps.currentUser.deliveryMode && nextProps.clientLat && nextProps.clientLng && nextProps.lat && nextProps.lng) {
                DirectionsService.route({
                    origin: new window.google.maps.LatLng(nextProps.lat, nextProps.lng),
                    destination: new window.google.maps.LatLng(nextProps.clientLat, nextProps.clientLng),
                    travelMode: window.google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directionsToClient: result,
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                });
            }
        }
    })
)((props) =>
<div>
    {props.currentUser.deliveryMode ?
        <div>
            <RequestView/>
            <DeliveryUserInterface/>
        </div>:
        <DestinationView/>
    }
    <GoogleMap
        currentUser={props.currentUser || null}
        defaultZoom={16}
        onTilesLoaded={props.onTilesLoaded}
        onClick={props.requestSent || props.currentUser.deliveryMode ? null : props.onClick}
        center={{ lat: props.currentUser.geometry[0], lng: props.currentUser.geometry[1]}}
        defaultOptions={{
            disableDefaultUI: true,
            styles: styles
        }}
    >

        {props.currentUser.deliveryMode && !props.directions && props.transportation === 'car' ? <TrafficLayer autoUpdate /> : null }

        {props.currentUser.deliveryMode && !props.directions && props.transportation === 'bicycle' ? <BicyclingLayer autoUpdate/> : null}

        <OverlayView position={{lat: props.currentUser ? props.currentUser.geometry[0] : 45, lng: props.currentUser ? props.currentUser.geometry[1] : 15}}
                     mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                     getPixelPositionOffset={getPixelPositionOffset}>
                     
            <div>

            {1 === 0 ?<span><img src="images/map-marker.png" height="90" className="map-marker-user"/>
                <img src={props.currentUser.image} style={{borderRadius: '50%'}} height="50" class="map-marker-inside"/> </span>: null}
                <div className="user-marker-outside">
                    <div className="user-marker-inside">
                    </div>
                </div>
            </div>
        </OverlayView>
        {0 === 1 ?
        <Marker
            icon={{
                url: props.currentUser
                    .image,
                scaledSize: new window.google.maps.Size(40,40),
                optimized: false
            }}
            position={{ lat: 45.3430556, lng: 14.4091667}} onClick={props.onMarkerClick}  />
        : null}
        {props.directionsToClient ? <DirectionsRenderer options={{polylineOptions: {
            strokeColor: "#F9C134",
            strokeOpacity: 0.7,
            strokeWeight: 7
        }, suppressMarkers: true}} directions={props.directionsToClient} /> : null}


        {props.directions3 ? <DirectionsRenderer options={{polylineOptions: {
            strokeColor: "#F9C134",
            strokeOpacity: 0.7,
            strokeWeight: 7
        }, suppressMarkers: true}} directions={props.directions3} /> : null}

        {props.directions ? <DirectionsRenderer options={{polylineOptions: {
            strokeColor: "#1fcf7c",
            strokeOpacity: 0.7,
            strokeWeight: 7
        }, suppressMarkers: true}} directions={props.directions} /> : null}


        {props.directionsToClient ?  <OverlayView position={{lat: props.directionsToClient.request.destination.location.lat(), lng: props.directionsToClient.request.destination.location.lng()}}
                                          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                          getPixelPositionOffset={getPixelPositionOffset}>
            <div>

                <div className="up"></div>
                <div className="user-marker-outside-client-location">
                    <div className="user-marker-inside-client-location"></div>
                </div>
            </div>
        </OverlayView> : null}
        {props.directions3 ?  <OverlayView position={{lat: props.directions3.request.origin.location.lat(), lng: props.directions3.request.origin.location.lng()}}
                                          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                          getPixelPositionOffset={getPixelPositionOffset}>
            <div>

                <div className="up"></div>
                <div className="user-marker-outside-client-location">
                    <div className="user-marker-inside-client-location"></div>
                </div>
            </div>
        </OverlayView> : null}
        {props.directions ?  <OverlayView position={{lat: props.directions.request.destination.location.lat(), lng: props.directions.request.destination.location.lng()}}
                                          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                          getPixelPositionOffset={getPixelPositionOffset}>
            <div>

                <div className="up"></div>
                <div className="user-marker-outside-destination">
                    <div className="user-marker-inside-destination"></div>
                </div>
            </div>
        </OverlayView> : null}
    </GoogleMap>
</div>
);

class Map extends React.PureComponent {
    state = {
        isMarkerShown: false,
    };

    componentDidMount() {
        this.delayedShowMarker();
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    };

    handleMarkerClick = () => {
        this.getShape();
    };

    render() {
        if(this.props.currentUser) {
            return (
                <div>
                <MyMapComponent
                    currentUser={this.props.currentUser}
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                />
                </div>
            );
        }
        return (
            <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
            />
        );

    }
}

const mapDispatchToProps = dispatch => ({
    onTilesLoaded: () =>
        dispatch({type: actions.MAP_LOADED}),
    setFrom: (lat, lng) =>
        dispatch({type: actions.UPDATE_FROM, lat, lng})
});

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    ...state.destinationView,
    ...state.requests
});


export default connect(mapStateToProps, mapDispatchToProps)(MyMapComponent);
