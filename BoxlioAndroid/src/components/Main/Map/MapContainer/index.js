import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Icon, Card, CardItem, Body} from 'native-base';
import {Grid, Col, Row} from "react-native-easy-grid";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, Dimensions, View, TouchableOpacity, Text} from "react-native";
import * as Animatable from "react-native-animatable";
import SearchPlacesFrom from "../SearchPlacesFrom";
import LocationChooserTo from "../LocationChooser/LocationChooserTo";
import DeliveryGuyProfit from "../DeliveryGuyProfit";
import TransportationType from "../TransportationType";
import ShortMessage from "../ShortMessage";
import RequestHandler from "../RequestHandler";
import SearchPlacesTo from "../SearchPlacesTo";
import mapStyles from "../mapStyles";
import LocationChooser from "../LocationChooser";
import UserIcon from "../UserIcon";
import {connect} from "react-redux";
import SendRequestButton from "../SendRequestButton";
import io from "socket.io-client";
const MapViewAnimatable = Animatable.createAnimatableComponent(MapView);
const ContainerAnimatable = Animatable.createAnimatableComponent(Container);

class MapContainer extends React.Component{
    componentWillMount(){
        if(this.props.requestSent){
            this.setState({
                disableRequestComponents: true
            })
        }
    }
    componentDidMount(){
    }
    componentWillReceiveProps(nextProps){

        if(nextProps.reanimateComponents){
            this.setState({
                disableRequestComponents: false
            })
        }
        if(!nextProps.directions && nextProps.currentUser.geometry[0] !== this.state.coordinate.latitude && nextProps.currentUser.geometry[1] !== this.state.coordinate.longitude){
            this.state.coordinate.timing({
                latitude: nextProps.currentUser.geometry[0],
                longitude: nextProps.currentUser.geometry[1],
                duration: 500
            }).start();
        }

        if(nextProps.from){
            this.setState({
                from: nextProps.from
            })
        }

        if(nextProps.to){
            this.setState({
                to: nextProps.to
            })
        }

        if(nextProps.currentUser.geometry[0] !== this.props.currentUser.geometry[0] && nextProps.currentUser.geometry[1] !== this.props.currentUser.geometry[1] && this.props.currentUser.geometry[1] && this.props.currentUser.geometry[0]){
            this.state.coordinate.timing({
                latitude: nextProps.currentUser.geometry[0],
                longitude: nextProps.currentUser.geometry[1],
                duration: 500
            }).start();

            const mode = 'driving';
            const origin = `${nextProps.currentUser.geometry[0]}, ${nextProps.currentUser.geometry[1]}`;
            const destination = `${this.props.lat}, ${this.props.lng}`;
            const APIKEY = 'AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ';
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.routes.length) {
                        this.props.onSetDirections(this.decode(responseJson.routes[0].overview_polyline.points));
                        this.setState({
                            directionsCoords: this.decode(responseJson.routes[0].overview_polyline.points)
                        })
                    }
                }).catch(e => {console.error(e)});
        }

        if(nextProps.lat && nextProps.lng && nextProps.placeFromChoosen && nextProps.from !== this.props.from){
            this.state.fromCoordinate.timing({
                latitude: nextProps.lat,
                longitude: nextProps.lng,
                duration: 0
            }).start();

            const mode = 'driving';
            const origin = `${this.props.currentUser.geometry[0]}, ${this.props.currentUser.geometry[1]}`;
            const destination = `${nextProps.lat}, ${nextProps.lng}`;
            const APIKEY = 'AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ';
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.routes.length) {
                        this.props.onSetDirections(this.decode(responseJson.routes[0].overview_polyline.points));
                        this.setState({
                            directionsCoords: this.decode(responseJson.routes[0].overview_polyline.points)
                        })
                    }
                }).catch(e => {console.error(e)});
        }

        if(nextProps.requestSent && !this.props.requestSent){
            setTimeout(() => {
                this.setState({
                    disableRequestComponents: true
                })
            }, 310)
        }

        if(nextProps.lat && nextProps.lng){
            this.refs.map.fitToElements(true);
        }
    }
      constructor(props){
        super(props);

        this.handleShowToInput = () => {
            if(!this.props.requestSent){
            this.props.onShowToInput()
            this.setState({showToInput: true})
            }
        }

          this.handleShowFromInput = () => {
            if(!this.props.requestSent){
              this.props.onShowFromInput()
              this.setState({showFromInput: true})
            }
          }

        this.mapRef = null;

        this.decode = function(t,e){for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}


          this.state = {
            region: {
                latitude: this.props.currentUser.geometry[0],
                longitude: this.props.currentUser.geometry[1],
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            coordinate: new MapView.AnimatedRegion({
                latitude: this.props.currentUser.geometry[0],
                longitude: this.props.currentUser.geometry[1]
            }),
              fromCoordinate: new MapView.AnimatedRegion({
                  latitude: this.props.lat,
                  longitude: this.props.lng
              }),
            directionsCoords: this.props.directions,
              disableRequestComponents: false,
              to: null,
              from: null,
              showToInput: true,
              showFromInput: true
        }
      }
	render(){

		return (
		    <Container style={styles.container}>
                <UserIcon navigation={this.props.navigation} />


                {this.state.disableRequestComponents && this.props.closeFromInput ? null : <SearchPlacesFrom  />}
                  {this.props.placeFromChoosen && !this.props.closeToInput && !this.state.disableRequestComponents ? <SearchPlacesTo/> : null}
                {this.state.disableRequestComponents ? null : <LocationChooser mapRef={this.refs.map} />}
                {this.state.disableRequestComponents ? null : <LocationChooserTo />}
                  {!this.state.disableRequestComponents && this.props.placeFromChoosen && this.props.placeToChoosen ? <TransportationType /> : null}
                  {!this.state.disableRequestComponents && this.props.placeFromChoosen && this.props.placeToChoosen && this.props.transportation !== '' && this.props.transportation !== null ? <DeliveryGuyProfit /> : null}
                  {!this.state.disableRequestComponents && this.props.placeFromChoosen && this.props.placeToChoosen && this.props.transportation !== '' && this.props.transportation !== null && this.props.price ? <ShortMessage /> : null}
                  {!this.state.disableRequestComponents && this.props.placeFromChoosen && this.props.placeToChoosen && this.props.transportation !== '' && this.props.transportation !== null && this.props.price && this.props.item ? <SendRequestButton handleSendRequest={this.props.handleSendRequest}/> : null}
                  {this.props.requestSent ? <RequestHandler /> : null}



                <MapView
                    provider={null}
                    customMapStyle={mapStyle}
                initialRegion={this.state.region}
                    ref="map"
                showCompass={false}
                style={styles.map} >




                    <MapView.Marker.Animated
                      coordinate={this.state.coordinate}
                    >
                      <View  style={{backgroundColor: 'rgba(31,207,124,.4)', height: 30, width: 30, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{backgroundColor: '#1fcf7c', height: 20, width: 20, borderRadius: 50}}>

                      </View>
                      </View>
                    </MapView.Marker.Animated>

                    {this.props.lat && this.props.lng && this.props.to ?
                    <MapView.Marker.Animated
                        coordinate={this.state.coordinate}
                        onPress={() => this.handleShowToInput()}
                    >
                            <View
                                style={{
                                    backgroundColor: '#1fcf7c',
                                    height: 30,
                                    width: 100,
                                    borderRadius: 3,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 140}}>
                                <Text numberOfLines={1} style={{padding:10,fontSize: 10, color: '#fff', fontFamily: 'VarelaRound-Regular'}}>
                                    {this.props.to}
                                </Text>
                            </View>
                    </MapView.Marker.Animated>
                        : null}



                    {this.props.lat && this.props.lng ?
                    <MapView.Marker.Animated
                        coordinate={this.state.fromCoordinate}
                    >
                        <View  style={{backgroundColor: 'rgba(45,137,229,.4)', height: 30, width: 30, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}}>
                            <View  style={{backgroundColor: '#2d89e5', height: 20, width: 20, borderRadius: 50}}>

                            </View>
                        </View>
                    </MapView.Marker.Animated> : null
                }


                    {this.props.lat && this.props.lng && this.props.from ?
                        <MapView.Marker.Animated
                            coordinate={this.state.fromCoordinate}

                            key='from'
                            onPress={() => this.handleShowFromInput()}
                        >
                            <View
                                style={{
                                    backgroundColor: '#2d89e5',
                                    height: 30,
                                    width: 100,
                                    borderRadius: 3,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 140,
                                }}>
                                <Text numberOfLines={1} style={{fontSize: 10, color: '#fff', fontFamily: 'VarelaRound-Regular', padding: 10}}>
                                    {this.props.from}
                                </Text>
                            </View>
                        </MapView.Marker.Animated> : null
                    }





                    {this.state.directionsCoords ?
                    <MapView.Polyline
                        coordinates={[
                            ...this.state.directionsCoords
                        ]}
                        strokeWidth={4} strokeColor="#1fcf7c"/> : null }
                </MapView>
            </Container>
		);
	}
}

const styles = StyleSheet.create({
  searchTo: {
    zIndex: 1000,
    height: 45 ,
    width: Dimensions.get('window').width-30,
    padding: 25,
    borderRadius: 3,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    position: 'absolute',
    top: 30,
    backgroundColor: '#fff'
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center', 
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});


const mapStyle =  [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#e7ecf0"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#63816b"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#638171"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f1f6f3"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#49715b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "hue": "#00ff47"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "hue": "#00BCD4"
            },
            {
                "weight": "1.47"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -70
            },
            {
                "visibility": "simplified"
            },
            {
                "hue": "#00ff4e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c6dccf"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#00ff47"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#899b8f"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -60
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d3eaf8"
            }
        ]
    }
];

const mapStateToProps = state => ({
    ...state.destinationView,
    ...state.requests
});

const mapDispatchToProps = dispatch => ({
    onSetDirections: (direction) =>
            dispatch({type: 'SET_DIRECTIONS', direction}),
    onShowToInput: () =>
            dispatch({type: 'SHOW_TO_INPUT'}),
    onShowFromInput: () =>
        dispatch({type: 'SHOW_FROM_INPUT'})
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);

