import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import io from "socket.io-client";
import SearchPlaces from "./SearchPlaces";
import SearchPlacesTo from "./SearchPlacesTo";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as actions from "../../constants/actions";
import agent from "../../agent";


class RequestView extends React.Component{
    componentWillMount(){

    }

    componentDidMount(){

    }

    constructor(props){
        super(props);

        this.setTo = (to) => {
            this.setState({to: to});
        }

        this.state = {
            from: '',
            to: '',
            price: '',
            item: 0
        };

        this.socket = io('localhost:8000');

        this.handleDeclineRequest = ev => {
            if(this.props.acceptedRequest){
                this.socket.emit('CANCEL_DELIVERY_JOB_DELIVERY_GUY', {
                    client: this.props.client,
                    deliveryGuy: this.props.currentUser
                })
                this.props.onDeclineRequest(agent.Auth.update({isOrdering: false, isDelivering: false, activeDeliveryJob: null}))
            }
            this.props.onDeclineRequest(agent.Auth.update({isOrdering: false, isDelivering: false, activeDeliveryJob: null}));
        };

        this.handleAcceptRequest = ev => {
            ev.preventDefault();
            this.socket.emit('ACCEPT_REQUEST', {
                client: this.props.client,
                deliveryGuy: this.props.currentUser,
                locationName: this.props.locationName,
                deliveryGuyLocationName: this.props.to,
                fromName: this.props.from,
                price: this.props.price,
                item: this.props.item,
                lat: this.props.lat,
                lng: this.props.lng

            });
            this.props.onAcceptRequest(this.props.client);
        };

        this.handleCompleteDelivery = ev => {
            ev.preventDefault();
            this.socket.emit('COMEPLETE_DELIVERY', {
                client: this.props.client
            });

            this.props.setSentCompleteChoice();
        }

        this.handleSendRequest = ev => {
            ev.preventDefault();

            this.socket.emit('REQUEST_DRIVER', {
                user: this.props.currentUser,
                from: this.props.from,
                to: this.props.to,
                price: this.state.price,
                lat: this.props.lat,
                lng: this.props.lng
            })
        }


    }

    render(){
        if(this.props.currentUser && this.props.gotRequest){

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
                <nav className="Absolute-Center float-modal-destination">
                    <div className="container">

                        <div className="clientClass" style={{color: 'rgba(0,0,0,.6)'}}><h6>Request from <b><span style={{textTransform: 'capitalize'}}>{this.props.client.firstName}</span> <span style={{textTransform: 'capitalize'}}>{this.props.client.lastName}</span></b><img src={this.props.client.image} className="ml-3 mr-2"  height="40" style={{borderRadius: '50%', boxShadow: '0 0 10px 0 rgba(0,0,0,.3)'}} alt=""/></h6>
                            </div>
                        <hr/>
                        <div className="row my-3">
                            <div className="col-2 mt-2" style={{marginTop: '70px'}}>
                                <i className="fa fa-dot-circle-o " style={{color: '#1fcf7c'}}></i>
                                <br/>
                                <i className="fa fa-ellipsis-v fa-3x my-2" style={{fontSize: '30px', marginLeft: '3px', color:'rgba(0,0,0,.2)'}}></i>
                                <br/>
                                <i className="fa fa-dot-circle-o " style={{color: '#2d89e5'}}></i>
                                <br/>
                                <i className="fa fa-ellipsis-v fa-3x my-2" style={{fontSize: '30px', marginLeft: '3px', color:'rgba(0,0,0,.2)'}}></i>
                                <br/>
                                <i className="fa fa-dot-circle-o " style={{color: '#F9C134'}}></i>
                            </div>
                            <div className="col-8">
                                <input
                                    type="text"
                                    placeholder="Deliver from where?"
                                    style={{fontSize: '3px'}}
                                    value={this.props.to}
                                    className="form-control form-control-lg destinationInput"
                                />
                                <hr/>
                                <input
                                    type="text"
                                    placeholder="Deliver from where?"
                                    style={{fontSize: '3px'}}
                                    value={this.props.from}
                                    className="form-control form-control-lg destinationInput"
                                />
                                <hr/>
                                <input
                                    type="text"
                                    style={{fontSize: '3px'}}
                                    placeholder="Deliver from where?"
                                    value={this.props.locationName}
                                    className="form-control form-control-lg destinationInput"
                                />
                            </div>
                        </div>
                        {!this.props.acceptedRequest && !this.props.sentCompleteChoice ?
                        <div>
                        <hr style={{color: 'rgba(0,0,0,.05)'}}/>
                        <div className="text-muted">Requirements</div>
                        <div className="row my-3">
                            <div className="col-2">
                                <i className="fa fa-usd" style={{color: '#1fcf7c', fontSize: '30px'}}></i>
                            </div>
                            <div className="col-10">
                                <div className="input-group">
                                    <input type="text" className="form-control form-control-lg destinationInput" style={{fontSize: '30px'}} value={this.props.price} onChange={setPrice} name="price" placeholder="Delivery Price"/>
                                    <span className="input-group-addon">HRK</span>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row my-3">
                            <div className="col-2">
                                <i className="fa fa-envelope-o" style={{color: '#1fcf7c', fontSize: '30px'}}></i>
                            </div>
                            <div className="col-10">
                                <div className="input-group">
                                    <input type="text" className="form-control form-control-lg destinationInput" style={{fontSize: '30px'}} value={this.props.item} name="items" placeholder="Short description"/>
                                </div>
                            </div>
                        </div>
                        </div> : null }
                        <hr/>
                        {!this.props.acceptedRequest && !this.props.sentCompleteChoice ?
                            <div className="container">
                                <div className="row">

                                    <div className="col">
                                        <button className="orderbtn btn btn-primary form-control"
                                                onClick={this.handleAcceptRequest}
                                                style={{backgroundColor: '#1fcf7c', borderStyle: 'none'}}>
                                            <i className="fa fa-check"></i> Accept
                                        </button>
                                    </div>
                                    <div className="col">
                                        <button className="orderbtn btn btn-primary form-control"
                                                onClick={this.handleDeclineRequest}
                                                style={{backgroundColor: '#E7475E', borderStyle: 'none'}}>
                                            <i className="fa fa-close"></i> Decline
                                        </button>
                                    </div>
                                </div>
                            </div>
                        : !this.props.sentCompleteChoice ?
                        <div className="container">
                                <div className="row">

                                    <div className="col">
                                        <Link to={`/messages/${this.props.client.username}`} className="orderbtn btn btn-primary form-control"
                                                style={{backgroundColor: '#2d89e5', borderStyle: 'none'}}>
                                            <i className="fa fa-envelope"></i> Message
                                        </Link>
                                    </div>
                                    <div className="col">
                                        <button className="orderbtn btn btn-primary form-control"
                                                onClick={this.handleDeclineRequest}
                                                style={{backgroundColor: '#E7475E', borderStyle: 'none'}}>
                                            <i className="fa fa-close"></i> Cancel
                                        </button>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                        <div className="col">
                                            <button className="orderbtn btn btn-primary form-control mb-3"
                                                    onClick={this.handleCompleteDelivery}
                                                    style={{backgroundColor: '#1fcf7c', borderStyle: 'none'}}>
                                                <i className="fa fa-check"></i> Mark as delivered
                                            </button>
                                        </div>
                                    </div>
                        </div> : null}
                        {this.props.sentCompleteChoice ?
                            <div className="mt-3 text-center" style={{marginTop: '100px'}}>
                            <i className="fa fa-circle-o-notch fa-spin fa-3x my-2" style={{color: '#1fcf7c'}}></i>
                            <p className="text-muted">Waiting for the client to confirm.</p>
                        </div> : null
                             }


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
    to: state.destinationView.to,
    ...state.destinationView,
    ...state.requests
});

const mapDispatchToProps = dispatch => ({
    onSetFrom: data =>
        dispatch({type: actions.SET_TO, data}),
    onDeclineRequest: payload =>
        dispatch({type: actions.DECLINE_REQUEST, payload}),
    onCancelRequest: payload =>
        dispatch({type: actions.CANCEL_REQUEST, payload}),
    onAcceptRequest: client =>
        dispatch({type: actions.ACCEPT_REQUEST, client}),
    setSentCompleteChoice: () =>
        dispatch({type: actions.SET_SENT_COMPLETE_CHOICE})
});



export default connect(mapStateToProps, mapDispatchToProps)(RequestView);
