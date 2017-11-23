import React from "react";
import {connect} from "react-redux";
import agent from "../agent";
import Errors from "./Errors";
import onClickOutside from "react-onclickoutside";
import {Link} from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {UPDATE_FIELD_AUTH, REGISTER, UPDATE_FIELD_AUTH_LOCATION} from "../constants/actions";

class Register extends React.Component{
    constructor(props){
        super(props);


        this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.changeFirstName = ev => this.props.onChangeFirstName(ev.target.value);
        this.changeLastName = ev => this.props.onChangeLastName(ev.target.value);
        this.changeType = ev => {
            this.props.onChangeType(ev.target.value)};
        this.submitForm = (firstName, lastName, username, email, password, location,type) => ev => {
            ev.preventDefault();
            this.props.onSubmitForm(firstName, lastName, username, email, password, location,type);
        };

        const setPosition = position => {
            this.props.onSetPosition(position);
        };

        if (navigator.geolocation){

            navigator.geolocation.getCurrentPosition(position => {

                const positionValues  = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };


                setPosition(positionValues);
            });
        }

        this.state = {
            isVisible: true
        }
    };
    render(){
        const {email, password, username, firstName, lastName, location, type} = this.props;
        return (
            <div className="bg-register" style={{overflow: 'auto',backgroundColor: '#fff', height: '100vh', position: 'absolute', width: '100vw'}}>
            <div className="container register" >
                <div className="row">
                    <div className="col-8">
                    <div className="row">
                        <h1>Join <b>Boxlio</b> today.</h1>
                    </div>
                    <div className="row" style={{marginTop: '50px'}}>
                        <h4><i className="fa fa-circle-o mx-3" />Get cheap deliveries</h4>
                    </div>
                    <div className="row my-3">
                        <h4><i className="fa fa-circle-o mx-3" />Earn money delivering</h4>                    
                    </div>
                    </div>
                    <div className="col-4 card" style={{color: 'rgba(0,0,0,.7)', borderRadius: '10px'}}>
                        <div className="card-body">
                        <h3 className="card-title text-center" style={{color: 'rgba(0,0,0,.7)'}}>Sign Up.</h3>
                        <Errors errors={this.props.errors}/>
                        <form onSubmit={this.submitForm(firstName, lastName, username, email, password, location, type)}>
                            <fieldset>
                                <fieldset className="form-group my-3">
                                    <input type="text" style={{borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px'}} placeholder="First Name (e.g. John)" value={firstName} onChange={this.changeFirstName} className="form-control"/>
                                </fieldset>
                                <fieldset className="form-group my-3">
                                    <input type="text" style={{borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px'}}  placeholder="Last Name (e.g. Doe)" value={lastName} onChange={this.changeLastName} className="form-control"/>
                                </fieldset>
                                <fieldset className="form-group my-3">
                                    <input type="text" style={{borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px'}}  placeholder="Username (e.g. Doe123)" value={username} onChange={this.changeUsername} className="form-control"/>
                                </fieldset>
                                <fieldset className="form-group my-3">
                                    <input type="text" style={{borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px'}}  placeholder="Email (e.g. john@doe.com)" value={email} onChange={this.changeEmail} className="form-control"/>
                                </fieldset>
                                <fieldset className="form-group my-3">
                                    <select className="form-control" style={{borderStyle: 'none', borderBottomStyle: 'solid', bordeRadius: '0px'}}  onChange={this.changeType} placeholder="I want to...">
                                        <option disabled selected>I want to...</option>
                                        <option value="order">Order</option>
                                        <option value="deliver">Deliver</option>
                                    </select>
                                </fieldset>
                                <fieldset className="form-group my-3">
                                    <input type="password" style={{borderStyle: 'none', borderBottomStyle: 'solid', borderRadius: '0px'}}  placeholder="Password" value={password} onChange={this.changePassword} className="form-control"/>
                                </fieldset>
                                <fieldset className="form-group my-3">
                                    <button type="submit" className="login-button form-control"><i className="fa fa-user-plus"></i>&nbsp;Register</button>
                                </fieldset>
                            </fieldset>
                        </form>
                            </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onChangeUsername: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'username', value}),
    onChangeEmail: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'email', value}),
    onChangePassword: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'password', value}),
    onChangeLastName: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'lastName', value}),
    onChangeFirstName: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'firstName', value}),
    onChangeType: value =>
        dispatch({type: UPDATE_FIELD_AUTH, key: 'type', value}),
    onSubmitForm: (firstName, lastName, username, email, password, location, type) =>
        dispatch({type: REGISTER, payload: agent.Auth.register(firstName, lastName, username, email, password, location, type)}),
    onSetPosition: value =>
        dispatch({type: UPDATE_FIELD_AUTH_LOCATION, key: 'location', value})

});

const mapStateToProps = state => ({
    ...state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

/*<div className="Absolute-Center" >
 <div className="container">
 <div className="row">
 <div className="col-6 offset-3 text-center">
 <img src="images/logo2.png" className="mb-3" height="50" alt=""/>
 <h1 className="display-5 d-none d-lg-block" style={{color: 'rgba(0,0,0,.6)'}}>Register for <b style={{color: "#1fcf7c"}}>Boxlio</b></h1>
 <h6 className="display-7 d-md-none" style={{color: 'rgba(0,0,0,.6)'}}>Register for <b style={{color: "#1fcf7c"}}>Boxlio</b></h6>
 <p className="">Or <Link to="/login"><b style={{color: "#1fcf7c"}}>Login</b></Link></p>
 <Errors errors={this.props.errors}/>
 <form onSubmit={this.submitForm(firstName, lastName, username, email, password)}>
 <fieldset>
 <fieldset className="form-group">
 <input type="text" placeholder="First Name" value={firstName} onChange={this.changeFirstName} className="form-control"/>
 </fieldset>
 <fieldset className="form-group">
 <input type="text" placeholder="Last Name" value={lastName} onChange={this.changeLastName} className="form-control"/>
 </fieldset>
 <fieldset className="form-group">
 <input type="text" className="form-control" value={username} onChange={this.changeUsername} placeholder="Username"/>
 </fieldset>
 <fieldset className="form-group">
 <input type="text" className="form-control" value={email} onChange={this.changeEmail} placeholder="Email"/>
 </fieldset>
 <fieldset className="form-group">
 <input type="password" placeholder="Password" value={password} onChange={this.changePassword} className="form-control"/>
 </fieldset>
 <fieldset className="form-group">
 <button disabled={this.props.inProgress} className="btn btn-primary login-btn" type="submit" style={{backgroundColor: '#1fcf7c', outline: "none"}}>Register</button>
 </fieldset>
 </fieldset>
 </form>
 </div>
 </div>
 </div>
 </div>*/