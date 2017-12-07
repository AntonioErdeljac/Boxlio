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
  }
	render(){
    
    if(this.props.currentUser){

    const socket = io('localhost:8000');

    navigator.geolocation.getCurrentPosition(position => {
      if(!this.props.currentUser.isOrdering && !this.props.currentUser.isDelivering && !this.props.positionSet){
        socket.emit('SAVE_LOCATION', {
          user: this.props.currentUser,
          positionLat: position.coords.latitude,
          positionLng: position.coords.longitude
        });
        this.props.onSetPosition(position);
      }
    })

		return (
			<ContainerAnimatable ref="map-component" animation="fadeInUp" style={styles.container}>
        <MapContainer navigation={this.props.navigation} currentUser={this.props.currentUser} />
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
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onSetPosition: position => 
    dispatch({type: 'SET_POSITION', position})
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);

