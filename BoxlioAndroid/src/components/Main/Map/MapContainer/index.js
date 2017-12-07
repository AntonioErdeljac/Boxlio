import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Icon, Card, CardItem, Body, Text } from 'native-base';
import {Grid, Col, Row} from "react-native-easy-grid";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, Dimensions, View} from "react-native";
import * as Animatable from "react-native-animatable";
import SearchPlacesFrom from "../SearchPlacesFrom";
import SearchPlacesTo from "../SearchPlacesTo";
import LocationChooser from "../LocationChooser";
import UserIcon from "../UserIcon";
import {connect} from "react-redux";
import io from "socket.io-client";
const MapViewAnimatable = Animatable.createAnimatableComponent(MapView);

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);

class MapContainer extends React.Component{
  constructor(props){
    super(props);
  }
	render(){

		return (
			<Container style={styles.container}>
          <UserIcon navigation={this.props.navigation} />
          <SearchPlacesFrom />
          <LocationChooser />
        <MapViewAnimatable 
        
        initialRegion={{
          latitude: this.props.currentUser.geometry[0],
          longitude: this.props.currentUser.geometry[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showCompass={false}
        style={styles.map} >
            <MapView.Marker 
              coordinate={{
                latitude: this.props.currentUser.geometry[0],
                longitude: this.props.currentUser.geometry[1]
              }}
            >
              <Animatable.View animation="pulse" iterationCount="infinite" easing="ease-out" style={{backgroundColor: 'rgba(31,207,124,.4)', height: 30, width: 30, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Animatable.View animation="pulse" iterationCount="infinite" easing="ease-out" style={{backgroundColor: '#1fcf7c', height: 20, width: 20, borderRadius: 50}}>

              </Animatable.View>
              </Animatable.View>
            </MapView.Marker>
        </MapViewAnimatable>
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


export default MapContainer;

