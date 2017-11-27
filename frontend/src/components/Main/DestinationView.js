import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import io from "socket.io-client";
import SearchPlaces from "./SearchPlaces";
import SearchPlacesTo from "./SearchPlacesTo";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {SEND_REQUEST, SET_TO, CANCEL_REQUEST} from "../../constants/actions";
import agent from "../../agent";


class DestinationView extends React.Component{
    componentWillMount(){

    }

    constructor(props){
        super(props);

        this.setTo = (to) => {
            this.setState({to: to});
        };

        this.state = {
            from: '',
            to: '',
            price: '',
            item: '',
            transportation: '',
            rating: 0
        };

        this.handleChangeTravelMode = field => ev => {
            if(!this.props.requestSent){
                this.props.onChangeTravelMode(field);
                this.setState({transportation: field}); 
            }
        }

        this.socket = io('localhost:8000');

        this.handleCancelRequest = ev => {
            ev.preventDefault();
            console.log(this.props.deliveryGuy);
            this.socket.emit('CANCEL_DELIVERY_JOB_CLIENT', {
                deliveryGuy: this.props.deliveryGuy,
                client: this.props.currentUser
            })
            this.props.onCancelRequest(agent.Auth.update({isRequesting: false, isOrdering: false, isDelivering: false, activeDeliveryJob: null}));
            
        };

        this.handleSendRequest = ev => {
            ev.preventDefault();
            console.log(this.props.to, 'JELI OVO TOCNO');

            this.socket.emit('REQUEST_DRIVER', {
                user: this.props.currentUser,
                from: this.props.from,
                to: this.props.to,
                lat: this.props.lat,
                lng: this.props.lng,
                clientLat: this.props.currentUser.geometry[0],
                clientLng: this.props.currentUser.geometry[1],
                price: this.state.price,
                item: this.state.item,
                transportation: this.state.transportation
            });

            this.props.onSendRequest();
        }

        this.handleConfirmDelivered = ev => {
            ev.preventDefault();

            this.socket.emit('CONFIRM_COMPLETED_DELIVERY', {
                deliveryGuy: this.props.deliveryGuy,
                client: this.props.currentUser,
                rating: this.state.rating
            });

            this.props.confirmCompletedDelivery()
        };

        this.handleDeclineDelivered = ev => {
            ev.preventDefault();
            this.socket.emit('DECLINE_COMPLETED_DELIVERY', {
                deliveryGuy: this.props.deliveryGuy,
                client: this.props.currentUser
            })

            this.props.confirmCompletedDelivery(); //možemo isto koristiti jer iste props postavlja
        }
    }

    render(){
        if(this.props.positionSet && this.props.currentUser){

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

            const setItem = ev => {
                this.setState({item: ev.target.value})
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
                        {this.props.requestAccepted ? null :
                            <div>
                                <div className="text-muted">Delivery</div>
                                <div className="row my-3">
                                    <div className="col-2 mt-2" style={{marginTop: '70px'}}>
                                        <i className="fa fa-dot-circle-o " style={{color: '#1fcf7c'}}></i>
                                        <br/>
                                        <i className="fa fa-ellipsis-v fa-3x my-2"
                                           style={{marginLeft: '2px',  color: 'rgba(0,0,0,.2)'}}></i>
                                        <br/>
                                        <i className="fa fa-dot-circle-o " style={{color: '#59ABE3'}}></i>
                                    </div>
                                    <div className="col-8">
                                        <SearchPlacesTo/>
                                        <hr/>
                                        <SearchPlaces/>
                                    </div>
                                </div>

                                <hr syle={{color: 'rgba(0,0,0,.05)'}} />
                            <div className="text-muted">Transportation</div>
                            <div className="row my-3 ml-3">
                                <div className="col my-2" style={{marginTop: '70px'}}>
                                        <i className="fa fa-male " onClick={this.handleChangeTravelMode('walking')} style={this.state.transportation === 'walking' || this.state.transportation === '' ? {color: '#1fcf7c', fontSize: '30px', cursor: 'pointer'} : {color: 'rgba(0,0,0,.3)', fontSize: '30px', cursor: 'pointer'}}></i>
                                </div>
                                <div className="col my-2" style={{marginTop: '70px'}}>
                                        <i className="fa fa-car " onClick={this.handleChangeTravelMode('car')}style={this.state.transportation === 'car' || this.state.transportation === '' ? {color: '#1fcf7c', fontSize: '30px', cursor: 'pointer'} : {color: 'rgba(0,0,0,.3)', fontSize: '30px', cursor: 'pointer'}}></i>
                                </div>
                                <div className="col my-2" style={{marginTop: '70px'}}>
                                        <i className="fa fa-bicycle " onClick={this.handleChangeTravelMode('bicycle')}  style={this.state.transportation === 'bicycle' || this.state.transportation === '' ? {color: '#1fcf7c', fontSize: '30px', cursor: 'pointer'} : {color: 'rgba(0,0,0,.3)', fontSize: '30px', cursor: 'pointer'}}></i>
                                </div>
                                
                                <div className="col my-2" style={{marginTop: '70px'}}>
                                        <i className="fa fa-bus " onClick={this.handleChangeTravelMode('transit')}  style={this.state.transportation === 'transit' || this.state.transportation === '' ? {color: '#1fcf7c', fontSize: '30px', cursor: 'pointer'} : {color: 'rgba(0,0,0,.3)', fontSize: '30px', cursor: 'pointer'}}></i>
                                </div>
                                
                                <div className="col my-2" style={{marginTop: '70px'}}>
                                        <i className="fa fa-check " onClick={this.handleChangeTravelMode('')}  style={this.state.transportation === '' ? {color: '#1fcf7c', fontSize: '30px', cursor: 'pointer'} : {color: 'rgba(0,0,0,.3)', fontSize: '30px', cursor: 'pointer'}}></i>
                                </div>
                            </div>
                                <hr style={{color: 'rgba(0,0,0,.05)'}}/>
                                <div className="text-muted">Options</div>
                                <div className="row my-3">
                                    <div className="col-1">
                                        <i className="fa fa-usd" style={{color: '#1fcf7c'}}></i>
                                    </div>
                                    <div className="col-10">
                                        <div className="input-group">
                                            <input disabled={this.props.requestSent} type="number"
                                                   className="form-control form-control-lg destinationInput"
                                                   style={{fontSize: '30px'}} value={this.state.price}
                                                   onChange={setPrice} name="price" placeholder="Delivery guy's profit"/>
                                            <span className="input-group-addon">HRK</span>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row my-3">
                                    <div className="col-1">
                                        <i className="fa fa-shopping-cart"
                                           style={{color: '#1fcf7c'}}></i>
                                    </div>
                                    <div className="col-10">
                                        <div className="input-group">
                                            <input disabled={this.props.requestSent} type="number"
                                                   className="form-control form-control-lg destinationInput"
                                                   style={{fontSize: '30px'}} value={this.state.item} onChange={setItem}
                                                   name="items" placeholder="Number of items"/>
                                            <span className="input-group-addon">Items</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        { this.props.requestSent && !this.props.requestAccepted ?
                            <div className="mt-3 text-center" style={{marginTop: '100px'}}>
                                <i className="fa fa-circle-o-notch fa-spin fa-3x my-2" style={{color: '#1fcf7c'}}></i>
                                <p className="text-muted">Waiting for a delivery person to accept.</p>
                                <button className="orderbtn btn btn-primary form-control" onClick={this.handleCancelRequest} style={{backgroundColor: '#E7475E', borderStyle: 'none'}}><i className="fa fa-close"></i> Cancel</button>
                            </div> : !this.props.requestAccepted ?
                        <button className="orderbtn btn btn-primary form-control" disabled={!this.state.price || !this.props.to || !this.props.from || !this.state.item ? true : false || !this.props.placeChoosen || !this.props.placeChoosenFrom} onClick={this.handleSendRequest} style={{backgroundColor: '#1fcf7c', borderStyle: 'none'}}><i className="fa fa-search"></i> Find a delivery person</button>
                                :
                                !this.props.completeChoice ? 
                                <div>
                                    <div style={{color: 'rgba(0,0,0,.6)'}}><h6>Accepted by <b><span style={{textTransform: 'capitalize'}}>{this.props.deliveryGuy.firstName}</span> <span style={{textTransform: 'capitalize'}}>{this.props.deliveryGuy.lastName}</span></b><img src={this.props.deliveryGuy.image} className="ml-3 mr-2"  height="40" style={{borderRadius: '50%', boxShadow: '0 0 10px 0 rgba(0,0,0,.3)'}} alt=""/></h6>
                                    </div>
                                    <hr/>
                                    <p className="text-muted">Live Location</p>
                                    <div className="row my-3">
                                        <div className="col-2 mt-2" style={{marginTop: '70px'}}>
                                            <i className="fa fa-dot-circle-o " style={{color: '#F9C134'}}></i>
                                            <br/>
                                        </div>
                                        <div className="col-8">
                                            <input
                                                type="text"
                                                placeholder="Deliver from where?"
                                                value={this.props.locationName}
                                                className="form-control form-control-lg destinationInput"
                                            />
                                        </div>
                                    </div>
                                    <hr/>
                                    <p className="text-muted">Rating</p>
                                    <div className="row my-3">
                                        <div className="col-2 mt-2" style={{marginTop: '70px'}}>
                                            <i className="fa fa-star " style={{color: '#1fcf7c'}}></i>
                                            <br/>
                                        </div>
                                        <div className="col-8">
                                            <input
                                                type="text"
                                                placeholder="Deliver from where?"
                                                value={this.props.deliveryGuy.ratings}
                                                className="form-control form-control-lg destinationInput"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                    <Link to={`/messages/${this.props.deliveryGuy.username}`} className="mb-3 orderbtn btn btn-primary form-control"
                                            style={{backgroundColor: '#2d89e5', borderStyle: 'none'}}>
                                        <i className="fa fa-envelope"></i> Message
                                    </Link>
                                        <button className="orderbtn btn btn-primary form-control"
                                                onClick={this.handleCancelRequest}
                                                style={{backgroundColor: '#E7475E', borderStyle: 'none'}}>
                                            <i className="fa fa-close"></i> Cancel
                                        </button>
                                    </div>
                                </div>
                                : 
                                <div className="text-center">
                                <div style={{color: 'rgba(0,0,0,.6)'}} className="text-center"><h6><img src={this.props.deliveryGuy.image} className="ml-3 mr-2"  height="40" style={{borderRadius: '50%', boxShadow: '0 0 10px 0 rgba(0,0,0,.3)'}} alt=""/><span style={{textTransform: 'capitalize'}}>{this.props.deliveryGuy.firstName}</span> <span style={{textTransform: 'capitalize'}}>{this.props.deliveryGuy.lastName}</span></h6>
                                </div>

                                <div className="row my-3">
                                        <div className="col-2 mt-2" style={{marginTop: '70px'}}>
                                            <i className="fa fa-dot-circle-o " style={{color: '#F9C134'}}></i>
                                            <br/>
                                        </div>
                                        <div className="col-8">
                                            <input
                                                type="text"
                                                placeholder="Deliver from where?"
                                                value={this.props.locationName}
                                                className="form-control form-control-lg destinationInput"
                                            />
                                        </div>
                                    </div>
                                <hr/>
                                <p className="text-muted text-center">Marked delivery as completed,<br /> please leave a rating.</p>
                                <div>
                                    <div className="container">
                                        <div className="row">
                                        <div className="col-10 offset-1">
                                        <div className="row my-3">
                                            <div className="col">
                                                <i style={{color: '#1fcf7c', cursor: 'pointer', fontSize: '20px'}} onClick={() => this.setState({rating: 1})} className={this.state.rating >= 1 ? "fa fa-star" : "fa fa-star-o"}></i>
                                            </div>
                                            <div className="col">
                                                <i style={{color: '#1fcf7c', cursor: 'pointer', fontSize: '20px'}} onClick={() => this.setState({rating: 2})} className={this.state.rating >= 2 ? "fa fa-star" : "fa fa-star-o"}></i>
                                            </div>
                                            <div className="col">
                                                <i style={{color: '#1fcf7c', cursor: 'pointer', fontSize: '20px'}} onClick={() => this.setState({rating: 3})} className={this.state.rating >= 3 ? "fa fa-star" : "fa fa-star-o"}></i>
                                            </div>
                                            <div className="col">
                                                <i style={{color: '#1fcf7c', cursor: 'pointer', fontSize: '20px'}} onClick={() => this.setState({rating: 4})} className={this.state.rating >= 4 ? "fa fa-star" : "fa fa-star-o"}></i>
                                            </div>
                                            <div className="col">
                                                <i style={{color: '#1fcf7c', cursor: 'pointer', fontSize: '20px'}} onClick={() => this.setState({rating: 5})} className={this.state.rating == 5 ? "fa fa-star" : "fa fa-star-o"}></i>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                <button className="orderbtn btn btn-primary form-control"
                                        onClick={this.handleConfirmDelivered}
                                        disabled={this.state.rating < 1}
                                        style={{backgroundColor: '#1fcf7c', borderStyle: 'none'}}>
                                    <i className="fa fa-check"></i> Delivered
                                </button>
                                    <p className="text-muted my-3"
                                        style={{color: '#2d89e5', cursor: 'pointer'}}
                                            onClick={this.handleDeclineDelivered}>
                                        Not delivered?
                                    </p>
                                </div>
                            </div>

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
    requestSent: state.requests.requestSent,
    ...state.destinationView,
    ...state.requests
});

const mapDispatchToProps = dispatch => ({
    onSetFrom: data =>
        dispatch({type: SET_TO, data}),
    onSendRequest: () =>
        dispatch({type: SEND_REQUEST}),
    onCancelRequest: payload =>
        dispatch({type: CANCEL_REQUEST, payload}),
    onChangeTravelMode: field =>
        dispatch({type: 'CHANGE_TRAVEL_MODE', field}),
    confirmCompletedDelivery: () =>
        dispatch({type: 'CONFIRM_COMPLETED_DELIVERY'})
});



export default connect(mapStateToProps, mapDispatchToProps)(DestinationView);


