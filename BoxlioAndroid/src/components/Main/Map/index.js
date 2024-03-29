import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Icon, Card, CardItem, Body, Text } from 'native-base';
import {Grid, Col, Row} from "react-native-easy-grid";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, Dimensions, View, Vibration} from "react-native";
import * as Animatable from "react-native-animatable";
import mapStyles from "./mapStyles";
import SearchPlacesFrom from "./SearchPlacesFrom";
import UserIcon from "./UserIcon";
import {connect} from "react-redux";
import MapContainer from "./MapContainer";
import io from "socket.io-client";
import {NavigatorActions} from "react-navigation";
import agent from '../../../agent';
import * as constants from "../../../constants/routes";

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);

class Map extends React.PureComponent{
    constructor(props){
    super(props);
    if(this.props.currentUser){
        this.socket = io(constants.API_ROOT);

        this.watchId = navigator.geolocation.watchPosition(position => {
            if(!this.props.placeFromChoosen && !this.props.currentUser.activeDeliveryJob){
                this.socket.emit('SAVE_LOCATION', {
                    user: this.props.currentUser,
                    positionLat: position.coords.latitude,
                    positionLng: position.coords.longitude
                });
                this.props.onSetPosition(position);
            }
        }, null, {enableHighAccuracy: false});

            navigator.geolocation.getCurrentPosition(position => {
                if(!this.props.placeFromChoosen && !this.props.currentUser.activeDeliveryJob){
                    this.socket.emit('SAVE_LOCATION', {
                        user: this.props.currentUser,
                        positionLat: position.coords.latitude,
                        positionLng: position.coords.longitude
                    });
                    this.props.onSetPosition(position);
                }
            }, null, {enableHighAccuracy: false});




            if(!this.props.joinedSelfGroup){
                this.props.onJoinSelfGroup();
                this.socket.emit('JOIN_SELF_GROUP', {
                    user: this.props.currentUser
                });
            }


            this.socket.on('SUCCESS_COMPLETE_DELIVERY', data => {
                this.props.onSuccessCompleteDelivery(data);
            })

            this.socket.on('RECEIVE_CANCEL_DELIVERY_JOB_DELIVERY_GUY', data => {
                this.props.receiveCancelFromDeliveryGuy(data);
            });

            this.socket.on('REQUEST_ACCEPTED', (data) => {
                Vibration.vibrate(1000)
                this.props.onRequestAccepted(data);
            });

            this.socket.on('DELIVERY_GUY_CHANGE_LOCATION', (data) => {
                    this.props.onChangeDeliveryGuyLocation(data);
            });

            this.socket.on('RECEIVE_MESSAGE', (data) => {
                this.props.onAlertMessage(data);
            });

            this.socket.on('RECEIVE_COMPLETE_DELIVERY', data => {
                this.props.onSetCompleteChoice(data);
            });

            this.socket.on('REQUEST_DRIVER_CLIENT',  (data) => {
                this.props.onSetReceivedRequest(data);

            });

            if(this.props.currentUser.activeDeliveryJob && !this.props.checkSet){
                if(this.props.currentUser.username !== this.props.currentUser.activeDeliveryJob.deliveryGuy.username){
                    this.props.setActiveDeliveryJob(this.props.currentUser.activeDeliveryJob);
                    const data = {
                        locationName: this.props.currentUser.activeDeliveryJob.toName,
                        deliveryGuy: this.props.currentUser.activeDeliveryJob.deliveryGuy,
                        toLocation: this.props.currentUser.activeDeliveryJob.toLocation
                    };
                    this.props.onChangeDeliveryGuyLocation(data);
                } else if (this.props.currentUser.username === this.props.currentUser.activeDeliveryJob.deliveryGuy.username){
                    this.props.setActiveDeliveryJobDeliveryGuy(this.props.currentUser.activeDeliveryJob);
                }
            }
        }
    }

	render(){

    if(this.props.currentUser){

    const handleSendRequest = ev => {
        this.props.onSendRequest();

        const item = this.props.basket.map(i => {
            return `${i.name} x${i.amount}`
        });

        const finalItem = item.join();

        this.socket.emit('REQUEST_DRIVER', {
            user: this.props.currentUser,
            from: this.props.from,
            to: this.props.to,
            lat: this.props.lat,
            lng: this.props.lng,
            clientLat: this.props.currentUser.geometry[0],
            clientLng: this.props.currentUser.geometry[1],
            price: this.props.profit,
            item: finalItem,
            transportation: this.props.transportation === 'all' ? '' : this.props.transportation
        });
    };

    return (
        <ContainerAnimatable ref="map-component" animation="fadeInUp" style={styles.container}>
            <MapContainer
                {...this.props.destinationView}
                positionSet={this.props.positionSet}
                handleSendRequest={handleSendRequest}
                focusedOnInput={this.props.focusedOnInput}
                navigation={this.props.navigation}
                currentUser={this.props.currentUser} />
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
  ...state.catalog,
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
        dispatch({type: 'JOIN_SELF_GROUP'}),
    onChangeDeliveryGuyLocation: data =>
        dispatch({type: 'CHANGE_DELIVERY_GUY_LOCATION', data}),
    setActiveDeliveryJob: (job) =>
        dispatch({type: 'SET_ACTIVE_DELIVERY_JOB', job}),
    setActiveDeliveryJobDeliveryGuy: job =>
        dispatch({type: 'SET_ACTIVE_DELIVERY_JOB_DELIVERY_GUY', job}),
    onAlertMessage: data =>
        dispatch({type: 'ALERT_MESSAGE', data}),
    receiveCancelFromDeliveryGuy: data =>
        dispatch({type: 'RECEIVE_CANCEL_FROM_DELIVERY_GUY', data}),
    onSetCompleteChoice: data =>
        dispatch({type: 'SET_COMPLETE_CHOICE', data}),
    onSetReceivedRequest: data =>
        dispatch({type: 'SET_REQUEST', data}),
    onSuccessCompleteDelivery: data =>
        dispatch({type: 'SUCCESS_COMPLETE_DELIVERY', data})
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
