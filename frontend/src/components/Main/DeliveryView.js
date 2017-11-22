import React from "react";
import SearchPlacesDelivery from "./SearchPlacesDelivery";
import {connect} from "react-redux";

class DeliveryView extends React.Component{

    render(){
        if(this.props.positionSet && this.props.currentUser) {

            const setForm = data => {
                this.props.onSetFrom(data);
            };

            const lat = this.props.currentUser.geometry[0];
            const lng = this.props.currentUser.geometry[1];
            const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ';
            if (!this.props.initialSet) {
                fetch(url)
                    .then(function (response) {
                        if (response.status >= 400) {
                            throw new Error("Bad response from server");
                        }
                        return response.json();
                    })
                    .then(function (data) {
                        setForm(data);
                    });
            }

            const updateState = ev => {
                this.setState({[ev.target.name]: ev.target.value});
            };

            const setPrice = ev => {
                this.setState({price: ev.target.value});
            };
        }
        return (
            <nav className="Absolute-Center float-modal-destination">
                <div className="container">

                    <div className="text-muted">Delivery</div>
                    <div className="row my-3">
                        <div className="col-2 mt-2" style={{marginTop: '70px'}}>
                            <i className="fa fa-dot-circle-o " style={{color: '#59ABE3'}}></i>
                        </div>
                        <div className="col-8">
                            <SearchPlacesDelivery/>
                        </div>
                    </div>
                    <hr style={{color: 'rgba(0,0,0,.05)'}}/>
                    <div className="text-muted">Options</div>
                    <div className="row my-3">
                        <div className="col-1">
                            <i className="fa fa-usd" style={{color: '#1fcf7c', fontSize: '30px'}}></i>
                        </div>
                        <div className="col-10">
                            <div className="input-group">
                                <input type="text" className="form-control form-control-lg destinationInput" style={{fontSize: '30px'}}  name="price" placeholder="Delivery Price"/>
                                <span className="input-group-addon">HRK</span>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <button className="orderbtn btn btn-primary form-control"onClick={this.handleSendRequest} style={{backgroundColor: '#1fcf7c', borderStyle: 'none'}}>Find deliverer</button>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    positionSet: state.common.positionSet,
    ...state.destinationView
});

const mapDispatchToProps = dispatch => ({
    onSetFrom: data =>
        dispatch({type: 'SET_TO', data})
});



export default connect(mapStateToProps, mapDispatchToProps)(DeliveryView);