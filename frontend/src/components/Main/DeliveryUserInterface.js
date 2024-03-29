import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import io from "socket.io-client";
import SearchPlaces from "./SearchPlaces";
import SearchPlacesTo from "./SearchPlacesTo";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import agent from "../../agent";
import * as actions from "../../constants/actions";


class DeliveryUserInterface extends React.Component{
    componentWillMount() {
        this.onLocate();
    }

    constructor(props){
        super(props);

        this.state = {
            transportation: this.props.currentUser.transportation
        };

        this.onLocate = ev => {
            console.log('radi');
            navigator.geolocation.getCurrentPosition(position => {
                if(!this.props.currentUser.isOrdering && !this.props.currentUser.isDelivering){
                    console.log(position.coords.latitude);
                this.socket.emit('SAVE_LOCATION', {
                    user: this.props.currentUser,
                    positionLat: position.coords.latitude,
                    positionLng: position.coords.longitude,
                });
                this.props.onSetPosition(position);
                const lat = this.props.currentUser.geometry[0];
                const lng = this.props.currentUser.geometry[1];
                const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ';
                fetch(url)
                    .then((response) => {
                        if (response.status >= 400) {
                            throw new Error("Bad response from server");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        this.props.onSetFrom(data);
                    });
                } else if(!this.props.positionSet){
                    console.log(this.props.currentUser.geometry, 'ovo trazim?');
                    this.socket.emit('SAVE_LOCATION', {
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
                    this.socket.emit('UPDATE_DELIVERY_GUY_LOCATION', {
                        client: this.props.client,
                        deliveryGuy: this.props.currentUser,
                        locationName: this.props.to
                    });
                }
            });
        }

        this.changeTransportation = field => ev => {
            if(!this.props.gotRequest){
                ev.preventDefault();
                this.props.onChangeTransportation(field, agent.Auth.update({transportation: field}));
                this.setState({transportation: field})
            }
        }

        this.socket = io('localhost:8000');

        if(this.props.currentUser.deliveryMode){
            this.socket.emit('NEAR_CLIENTS', {
                user: this.props.currentUser
            })
        }

        const setClientCount = data => {
            this.props.onSetClientCount(data);
        };

        this.socket.on('RECEIVE_NEAR_CLIENTS', (data) => {
            console.log(data, 'CLIENTS NEAR YOU');
            setClientCount(data);
        });

        this.handleChangeAvailable = () => {
            this.props.onChangeAvailable(agent.Auth.update({available: !this.props.currentUser.available}))
        }


    }

    render(){
        if(this.props.currentUser){

            const setForm = data => {
                this.props.onSetFrom(data);
            };

            const lat = this.props.currentUser.geometry[0];
            const lng = this.props.currentUser.geometry[1];
            const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ';
            if(!this.props.initialSet){
                fetch(url)
                    .then(function(response) {
                        if (response.status >= 400) {
                            throw new Error("Bad response from server");
                        }
                        return response.json();
                    })
                    .then(function(data) {
                        setForm(data);
                    });
            }

            const updateState = ev => {
                this.setState({[ev.target.name]: ev.target.value});
            };

            const setPrice = ev => {
                this.setState({price: ev.target.value});
            };


            return (
                <ReactCSSTransitionGroup
                    transitionAppear={true}
                    transitionAppearTimeout={600}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={200}
                    transitionName={'SlideIn'}
                >
                    <nav className="Absolute-Center float-modal-delivery-interface">
                        <div className="container">

                            <div style={{color: 'rgba(0,0,0,.6)'}} className="text-center">
                                <img src={this.props.currentUser.image} className="my-2" height="50px" style={{borderRadius: '50%', boxShadow: '0 0 20px 0 rgba(0,0,0,.1)'}} alt=""/>
                                <h4 className="text-muted"><span style={{textTransform: 'capitalize'}}>{this.props.currentUser.firstName}</span> <span style={{textTransform: 'capitalize'}}>{this.props.currentUser.lastName}</span></h4>
                                <button disabled={this.props.inProgress || this.props.gotRequest} onClick={this.handleChangeAvailable} className="btn btn-primary" style={this.props.currentUser.available ? {backgroundColor: '#E7475E', borderStyle: 'none'} : {backgroundColor: '#1fcf7c', borderStyle: 'none'}}>{this.props.currentUser.available ? "Go Offline" : "Go Online" }</button>
                            </div>
                            <div className="row my-3">
                                <div className="col-2 mt-2" style={{marginTop: '70px'}}>
                                    <i className="fa fa-dot-circle-o " style={this.props.currentUser.available ? {color: '#1fcf7c'} : {color: '#E7475E'}}></i>
                                </div>
                                <div className="col-8">
                                    <input
                                        type="text"
                                        placeholder="Deliver to where?"
                                        value={this.props.to}
                                        className="form-control form-control-lg destinationInput"
                                    />
                                </div>
                            </div>
                            <hr syle={{color: 'rgba(0,0,0,.05)'}} />
                            <div className="text-muted">Transportation</div>
                            <div className="row my-3 ml-3">
                                <div className="col my-2" style={{marginTop: '70px'}}>
                                        <i className="fa fa-male " onClick={this.changeTransportation('walking')} style={this.state.transportation === 'walking' ? {color: '#1fcf7c', fontSize: '30px', cursor: 'pointer'} : {color: 'rgba(0,0,0,.3)', fontSize: '30px', cursor: 'pointer'}}></i>
                                </div>
                                <div className="col my-2" style={{marginTop: '70px'}}>
                                        <i className="fa fa-car " onClick={this.changeTransportation('car')} style={this.state.transportation === 'car' ? {color: '#1fcf7c', fontSize: '30px', cursor: 'pointer'} : {color: 'rgba(0,0,0,.3)', fontSize: '30px', cursor: 'pointer'}}></i>
                                </div>
                                <div className="col my-2" style={{marginTop: '70px'}}>
                                        <i className="fa fa-bicycle " onClick={this.changeTransportation('bicycle')} style={this.state.transportation === 'bicycle' ? {color: '#1fcf7c', fontSize: '30px', cursor: 'pointer'} : {color: 'rgba(0,0,0,.3)', fontSize: '30px', cursor: 'pointer'}}></i>
                                </div>
                                <div className="col my-2" style={{marginTop: '70px'}}>
                                        <i className="fa fa-bus " onClick={this.changeTransportation('transit')} style={this.state.transportation === 'transit' ? {color: '#1fcf7c', fontSize: '30px', cursor: 'pointer'} : {color: 'rgba(0,0,0,.3)', fontSize: '30px', cursor: 'pointer'}}></i>
                                </div>
                            </div>
                            <hr style={{color: 'rgba(0,0,0,.05)'}}/>
                            <div className="text-muted">Driver Statistics</div>
                            <div className="row my-3">
                                <div className="col-1">
                                    <i className="fa fa-star" style={{color: '#1fcf7c', fontSize: '30px'}}></i>
                                </div>
                                <div className="col-10">
                                    <div className="input-group">
                                        <input type="number" className="form-control form-control-lg destinationInput" style={{fontSize: '30px'}} value={this.props.currentUser.ratings} name="items" placeholder="Number of items"/>
                                        <span className="input-group-addon">Rating</span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row my-3">
                                <div className="col-1">
                                    <i className="fa fa-money" style={{color: '#1fcf7c', fontSize: '30px'}}></i>
                                </div>
                                <div className="col-10">
                                    <div className="input-group">
                                        <input type="text" className="form-control form-control-lg destinationInput" style={{fontSize: '30px'}} value={this.props.currentUser.earnedMoney} onChange={setPrice} name="price" placeholder="Delivery Price"/>
                                        <span className="input-group-addon">HRK</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </ReactCSSTransitionGroup>
            )
        }
        return null;
    }
}


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    positionSet: state.common.positionSet,
    inProgress: state.common.inProgress,
    ...state.destinationView,
    ...state.requests,
    ...state.deliveryUserInterface
});

const mapDispatchToProps = dispatch => ({
    onSetFrom: data =>
        dispatch({type: actions.SET_TO, data}),
    onDeclineRequest: () =>
        dispatch({type: actions.DECLINE_REQUEST}),
    onSetClientCount: data =>
        dispatch({type: actions.SET_CLIENT_COUNT, data}),
    onChangeTransportation: field =>
        dispatch({type: actions.CHANGE_TRANSPORTATION, field}),
    onChangeAvailable: (payload) =>
        dispatch({type: actions.CHANGE_AVAILABLE, payload}),
    onSetPosition: position =>
        dispatch({type: actions.SET_POSITION, position}),
});



export default connect(mapStateToProps, mapDispatchToProps)(DeliveryUserInterface);