import React from "react";
import MapView from "./Map/index";
import DestinationView from "./DestinationView";
import {Link, Switch, Route, withRouter} from "react-router-dom";
import PointsOfInterest from "./PointsOfInterest";
import io from "socket.io-client";
import store from "../../store";
import {connect} from "react-redux";
import DeliveryView from "./DeliveryView";
import DeliveryUserInterface from "./DeliveryUserInterface";
import RequestView from "./RequestView";
import Messages from "./Messages";
import Settings from "./Settings";
import {SET_REQUEST, REQUEST_ACCEPTED, CHANGE_LOCATION, REDIRECT_TO_MAIN, CHANGE_POSITION, SET_POSITION, SUCCESS_REQUEST_ACCEPTED} from "../../constants/actions";


class Main extends React.Component{

    render(){

        if(this.props.currentUser){

            if(this.props.currentUser.activeDeliveryJob && this.props.currentUser.activeDeliveryJob[0] && !this.props.checkSet){
                console.log(this.props.currentUser.activeDeliveryJob, 'JOB');
                this.props.setActiveDeliveryJob(this.props.currentUser.activeDeliveryJob);
                const data = {
                    locationName: this.props.currentUser.activeDeliveryJob[0].toName,
                    deliveryGuy: this.props.currentUser.activeDeliveryJob[0].deliveryGuy
                };
                this.props.onChangeLocationName(data);
            }

            console.log(this.props.currentUser, 'OVDJE POCINJEMO');
            const socket = io('localhost:8000');
            const user = this.props.currentUser;

            navigator.geolocation.getCurrentPosition(position => {
                if(!this.props.currentUser.isOrdering && !this.props.currentUser.isDelivering && !this.props.positionSet){
                socket.emit('SAVE_LOCATION', {
                    user: this.props.currentUser,
                    positionLat: position.coords.latitude,
                    positionLng: position.coords.longitude,
                });
                this.props.onSetPosition(position);
                } else if(!this.props.positionSet){
                    socket.emit('SAVE_LOCATION', {
                        user: this.props.currentUser,
                        positionLat: this.props.currentUser.geometry[0],
                        positionLng: this.props.currentUser.geometry[1]
                    });

                    let position2 = {
                        coords: {
                            latitude: this.props.currentUser.geometry[0],
                            longitude: this.props.currentUser.geometry[1]
                        }
                    };

                    this.props.onSetPosition(position2);
                }
            });

            if(!this.props.joinedSelfGroup){
                store.dispatch({type: 'JOIN_SELF_GROUP'});
                socket.emit('JOIN_SELF_GROUP', {
                    user: this.props.currentUser
                });
            }


            socket.on('RECEIVE_CANCEL_DELIVERY_JOB_DELIVERY_GUY', data => {
                this.props.receiveCancelFromDeliveryGuy(data);
            })


            if(this.props.currentUser.deliveryMode){
                socket.emit('JOIN_DRIVER_GROUP');
            }


            console.log('PROVJERA KLIJENTA', this.props.client)


            const client = this.props.client;
            const setRequest = data => {
                if(!client) {
                this.props.onSetRequest(data);

                }
            };

            socket.on('SUCCESS_COMPLETE_DELIVERY', data => {
                this.props.onSuccessCompleteDelivery(data);
            })

            const acceptedRequest = this.props.acceptedRequest;
                socket.on('REQUEST_DRIVER_CLIENT',  (data) => {
                        setRequest(data);
                    
                });

                const onRequestAccepted = data => {

                    this.props.onRequestAccepted(data);
                };


                socket.on('REQUEST_ACCEPTED', (data) => {
                    onRequestAccepted(data);
                });


            

            socket.on('RECEIVE_CANCEL_DELIVERY_JOB_CLIENT', data => {
                this.props.receiveCancelFromClient(data);
            })          


            socket.emit('NEAR_DRIVERS', {
                user: this.props.currentUser
            });

            socket.on('RECEIVE_NEAR_DRIVERS', (data) => {
                // add function for this
            });

            const changeLocationName = data => {
                
            };
            console.log(this.props, 'OVO SU PROPSI');



            socket.on('FAILURE_REQUEST_ACCEPTED', data => {
                console.log('failed');
                this.props.onSetFailureAccepted(data);
            });




            socket.on('DELIVERY_GUY_CHANGE_LOCATION', (data) => {
                console.log('dobivam lokaciju')
                if(this.props.deliveryGuy){
                    console.log(data, 'OVO MU TREBA ZA PROMJENU')
                    this.props.onChangeLocationName(data);
                }
            });




            socket.on('RECEIVE_COMPLETE_DELIVERY', data => {
                this.props.onSetCompleteChoice(data);
            })




            const handleConfirmRequest = data => {
                this.props.onConfirmRequest(data);
            }

            socket.on('SUCCESS_REQUEST_ACCEPTED', (data) => {
                handleConfirmRequest(data);
            });


            const handleChangePosition = pos => {
                let lat = pos.coords.latitude;
                let lng = pos.coords.longitude;
                const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ';
                fetch(url)
                    .then(function(response) {
                        if (response.status >= 400) {
                            throw new Error("Bad response from server");
                        }
                        return response.json();
                    })
                    .then(function(data) {
                        changePosition(pos, data.results[0]);
                    });
            };

                const changePosition = (pos, data) => {


                    if(this.props.acceptedRequest){
                    const client = this.props.client;
                    const currentUser = this.props.currentUser;
                    this.props.onChangePosition(pos, data);
                    socket.emit('UPDATE_DELIVERY_GUY_LOCATION', {
                        client: client,
                        deliveryGuy: currentUser,
                        locationName: data.formatted_address
                    });

                    }
                };


            let id, target, options;

            function success(pos) {
                handleChangePosition(pos);
            }

            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
            }

            options = {
                enableHighAccuracy: true, maximumAge: 1
            };


            if(this.props.currentUser.deliveryMode){
                let id = navigator.geolocation.watchPosition(success, error ,options);
            }

            if(!this.props.currentUser.deliveryMode){
                navigator.geolocation.clearWatch(id);
            }

            if(!this.props.currentUser.deliveryMode){


                return (
                    <div>
                        <MapView />
                    </div>
                );
            } else {
                return (
                    <div>
                       < MapView />
                    </div>
                );
            }
        }
        return (
            <div>
                <MapView />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    joinedSelfGroup: state.common.joinedSelfGroup,
    currentUser: state.common.currentUser,
    requestReceived: state.destinationView.requestReceived,
    positionSet: state.common.positionSet,
    ...state.requests
});

const mapDispatchToProps = dispatch => ({
    onSetRequest: data =>
        dispatch({type: SET_REQUEST, data}),
    onRequestAccepted: data =>
        dispatch({type: REQUEST_ACCEPTED, data}),
    onChangeLocationName: data =>
        dispatch({type: CHANGE_LOCATION, data}),
    onRedirectMain: () =>
        dispatch({type: REDIRECT_TO_MAIN}),
    onChangePosition: (pos, data) =>
        dispatch({type: CHANGE_POSITION, pos, data}),
    onSetPosition: position =>
        dispatch({type: SET_POSITION, position}),
    onConfirmRequest: data =>
        dispatch({type: SUCCESS_REQUEST_ACCEPTED, data}),
    setActiveDeliveryJob: job =>
        dispatch({type: 'SET_ACTIVE_DELIVERY_JOB', job}),
    receiveCancelFromClient: data =>
        dispatch({type: 'RECEIVE_CANCEL_FROM_CLIENT', data}),
    receiveCancelFromDeliveryGuy: data =>
        dispatch({type: 'RECEIVE_CANCEL_FROM_DELIVERY_GUY', data}),
    onSetCompleteChoice: data =>
        dispatch({type: 'SET_COMPLETE_CHOICE', data}),
    onSuccessCompleteDelivery: data =>
        dispatch({type: 'SUCCESS_COMPLETE_DELIVERY', data}),
    onSetFailureAccepted: data =>
        dispatch({type: 'SET_FAILURE_ACCEPTED', data})
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); 