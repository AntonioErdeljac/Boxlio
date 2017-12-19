import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Icon, Card, CardItem, Body, Text } from 'native-base';
import {Grid, Col, Row} from "react-native-easy-grid";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, Dimensions, View} from "react-native";
import * as Animatable from "react-native-animatable";
import mapStyles from "./mapStyles";
import SearchPlacesFrom from "./SearchPlacesFrom";
import UserIcon from "./UserIcon";
import {connect} from "react-redux";
import MapContainer from "./MapContainer";
import io from "socket.io-client";
import {NavigatorActions} from "react-navigation";

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);

class Map extends React.Component{

  componentWillMount(){
  }
  constructor(props){
    super(props);

    this.watchId = navigator.geolocation.watchPosition(position => {
        if(!this.props.placeFromChoosen){
            this.socket.emit('SAVE_LOCATION', {
                user: this.props.currentUser,
                positionLat: position.coords.latitude,
                positionLng: position.coords.longitude
            });
            this.props.onSetPosition(position);
        }
    }, null, {enableHighAccuracy: true});

      navigator.geolocation.getCurrentPosition(position => {
          if(!this.props.placeFromChoosen){
              this.socket.emit('SAVE_LOCATION', {
                  user: this.props.currentUser,
                  positionLat: position.coords.latitude,
                  positionLng: position.coords.longitude
              });
              this.props.onSetPosition(position);
          }
      }, null, {enableHighAccuracy: true});

    this.socket = io('https://be2adc2a.ngrok.io');




      if(!this.props.joinedSelfGroup){
          this.props.onJoinSelfGroup();
          this.socket.emit('JOIN_SELF_GROUP', {
              user: this.props.currentUser
          });
      }

    this.socket.on('REQUEST_ACCEPTED', (data) => {
        this.props.onRequestAccepted(data);
    })
  }
	render(){

    if(this.props.currentUser){

    const handleSendRequest = ev => {
        this.props.onSendRequest();

        this.socket.emit('REQUEST_DRIVER', {
            user: this.props.currentUser,
            from: this.props.from,
            to: this.props.to,
            lat: this.props.lat,
            lng: this.props.lng,
            clientLat: this.props.currentUser.geometry[0],
            clientLng: this.props.currentUser.geometry[1],
            price: this.props.price,
            item: this.props.item,
            transportation: this.props.transportation === 'all' ? '' : this.props.transportation
        });
    };
    



		return (
			<ContainerAnimatable ref="map-component" animation="fadeInUp" style={styles.container}>
      
        <MapContainer {...this.props.destinationView} positionSet={this.props.positionSet} handleSendRequest={handleSendRequest} focusedOnInput={this.props.focusedOnInput} navigation={this.props.navigation} currentUser={this.props.currentUser} />
      
			</ContainerAnimatable>
		);
  }
  return null;
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

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
    positionSet: state.common.positionSet,
    joinedSelfGroup: state.common.joinedSelfGroup,
    ...state.destinationView
});

const mapDispatchToProps = dispatch => ({
    onSetPosition: position =>
      dispatch({type: 'SET_POSITION', position}),
    onSendRequest: () =>
      dispatch({type: 'SEND_REQUEST'}),
    onRequestAccepted: (data) =>
        dispatch({type: 'REQUEST_ACCEPTED', data}),
    onJoinSelfGroup: () =>
        dispatch({type: 'JOIN_SELF_GROUP'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

