import React from "react";
import MapView from "./Map/index";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
import store from "../../store";
import {connect} from "react-redux";
import * as actions from "../../constants/actions";


class Main extends React.Component{
    constructor(props){
        super(props);

            if(this.props.currentUser.activeDeliveryJob && !this.props.checkSet){
                this.props.setActiveDeliveryJob(this.props.currentUser.activeDeliveryJob);
                const data = {
                    locationName: this.props.currentUser.activeDeliveryJob.toName,
                    deliveryGuy: this.props.currentUser.activeDeliveryJob.deliveryGuy
                };
                this.props.onChangeLocationName(data);
            }

            const socket = io('localhost:8000');

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
                if(this.props.client){
                    socket.emit('UPDATE_DELIVERY_GUY_LOCATION', {
                        client: this.props.client,
                        deliveryGuy: this.props.currentUser,
                        locationName: this.props.to
                    });
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

            socket.on('UPDATE_CURRENT_USER', data => {
                this.props.onUpdateCurrentUser(data);
            })


            if(this.props.currentUser.deliveryMode){
                socket.emit('JOIN_DRIVER_GROUP');
            }


            const client = this.props.client;
            const setRequest = data => {
                if(!client) {
                this.props.onSetRequest(data);

                }
            };

            socket.on('SUCCESS_COMPLETE_DELIVERY', data => {
                this.props.onSuccessCompleteDelivery(data);
            })

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

            socket.on('RECEIVE_MESSAGE', (data) => {
                this.props.onAlertMessage();
            });



            socket.on('FAILURE_REQUEST_ACCEPTED', data => {
                this.props.onSetFailureAccepted(data);
            });




            socket.on('DELIVERY_GUY_CHANGE_LOCATION', (data) => {
                if(1){
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
                if(lat !== this.props.currentUser.geometry[0] && lng !== this.props.currentUser.geometry[1]){
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
                }
            };

            const changePosition = (pos, data) => {
                if(this.props.acceptedRequest || this.props.currentUser.deliveryMode){
                    const client = this.props.client;
                    this.props.onChangePosition(pos, data);
                    let currentUser2 = {
                        ...this.props.currentUser,
                        geometry: [pos.coords.latitude, pos.coords.longitude]
                    }
                    if(this.props.acceptedRequest) {
                        socket.emit('UPDATE_DELIVERY_GUY_LOCATION', {
                            client: client,
                            deliveryGuy: currentUser2,
                            locationName: data.formatted_address
                        });
                    }

                }
            };

            function success(pos) {
                handleChangePosition(pos);
            }


            if(this.props.currentUser.deliveryMode){
                this.id = navigator.geolocation.watchPosition(success);
            }

            if(!this.props.currentUser.deliveryMode){
                navigator.geolocation.clearWatch(this.id);
            }
    }

    render(){

        if(this.props.currentUser){


            if(!this.props.currentUser.deliveryMode){


                return (
                    <div>
                        <MapView />
                    </div>
                );
            } else {
                return (
                    <div>
                       <MapView />
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
        dispatch({type: actions.SET_REQUEST, data}),
    onRequestAccepted: data =>
        dispatch({type: actions.REQUEST_ACCEPTED, data}),
    onChangeLocationName: data =>
        dispatch({type: actions.CHANGE_LOCATION, data}),
    onRedirectMain: () =>
        dispatch({type: actions.REDIRECT_TO_MAIN}),
    onChangePosition: (pos, data) =>
        dispatch({type: actions.CHANGE_POSITION, pos, data}),
    onSetPosition: position =>
        dispatch({type: actions.SET_POSITION, position}),
    onConfirmRequest: data =>
        dispatch({type: actions.SUCCESS_REQUEST_ACCEPTED, data}),
    setActiveDeliveryJob: job =>
        dispatch({type: actions.SET_ACTIVE_DELIVERY_JOB, job}),
    receiveCancelFromClient: data =>
        dispatch({type: actions.RECEIVE_CANCEL_FROM_CLIENT, data}),
    receiveCancelFromDeliveryGuy: data =>
        dispatch({type: actions.RECEIVE_CANCEL_FROM_DELIVERY_GUY, data}),
    onSetCompleteChoice: data =>
        dispatch({type: actions.SET_COMPLETE_CHOICE, data}),
    onSuccessCompleteDelivery: data =>
        dispatch({type: actions.SUCCESS_COMPLETE_DELIVERY, data}),
    onSetFailureAccepted: data =>
        dispatch({type: actions.SET_FAILURE_ACCEPTED, data}),
    onUpdateCurrentUser: data =>
        dispatch({type: actions.UPDATE_CURRENT_USER, data}),
    onAlertMessage: () =>
        dispatch({type: 'ALERT_MESSAGE'})
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));