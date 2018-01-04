import React from "react";
import Errors from "../Errors";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import agent from "../../agent";
import onClickOutside from "react-onclickoutside";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {withRouter} from "react-router-dom";
import * as actions from "../../constants/actions";

class Form extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            image: '',
            email: '',
            about: '',
            password: '',
            deliveryMode: null
        };

        this.updateState = field => ev => this.setState({[field]: ev.target.value});

        this.changeImage = this.updateState('image');
        this.changeEmail = this.updateState('email');
        this.changeAbout = this.updateState('about');
        this.changePassword = this.updateState('password');
        this.changeFirstName = this.updateState('firstName');
        this.changeLastName = this.updateState('lastName');

        this.changeDeliveryMode = ev => {

            this.setState({
                deliveryMode: !this.state.deliveryMode
            })
        };



        this.handleRemoveFromTo = ev => {
            this.props.onRemoveFromTo();
        }

        this.submitForm = ev => {
            ev.preventDefault();

            const user = Object.assign({}, this.state);

            if(!user.password){
                delete user.password;
            }

            if(this.state.deliveryMode){
                this.handleRemoveFromTo();
            }

            if(!user.image){
                user.image = 'https://i.imgur.com/cDYfZwV.png';
            }

            this.props.onSubmitForm(user);
        }
    }

    componentWillMount(){
        if(this.props.currentUser){
            Object.assign(this.state, {
                image: this.props.currentUser.image === 'https://i.imgur.com/cDYfZwV.png' ? '' : this.props.currentUser.image,
                username: this.props.currentUser.username,
                email: this.props.currentUser.email,
                about: this.props.currentUser.about,
                deliveryMode: this.props.currentUser.deliveryMode,
                firstName: this.props.currentUser.firstName,
                lastName: this.props.currentUser.lastName
            })
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState(Object.assign({}, this.state, {
            image: nextProps.currentUser.image === 'https://i.imgur.com/cDYfZwV.png' ? '' : nextProps.currentUser.image,
            username: nextProps.currentUser.username,
            about: nextProps.currentUser.about,
            email: nextProps.currentUser.email,
            deliveryMode: nextProps.currentUser.deliveryMode,
            firstName: nextProps.currentUser.firstName,
            lastName: nextProps.currentUser.lastName
        }))
    }

    render(){
        return (
            <form onSubmit={this.submitForm}  className="container" >
                <fieldset >
            <div className="row">
                    <fieldset className="form-group col-4">
                        <p className="text-muted text-left">Username</p>
                        <input type="text" placeholder="Username" value={this.state.username} disabled className="form-control settings-input"/>
                    </fieldset>
                    <fieldset className="form-group col-4">
                    <p className="text-muted text-left">First Name</p>
                        <input type="text" placeholder="First Name" value={this.state.firstName} disabled={this.props.gotRequest || this.props.requestSent} onChange={this.changeFirstName} className="form-control settings-input"/>
                    </fieldset>
                    <fieldset className="form-group col-4">
                    <p className="text-muted text-left">Last Name</p>
                        <input type="text" placeholder="Last Name" value={this.state.lastName} disabled={this.props.gotRequest || this.props.requestSent} onChange={this.changeLastName} className="form-control settings-input"/>
                    </fieldset>
                    <fieldset className="form-group col-md-12">
                    <p className="text-muted text-left">About</p>
                        <textarea type="text" value={this.state.about} onChange={this.changeAbout} disabled={this.props.gotRequest || this.props.requestSent} placeholder="Something about you" className="form-control settings-input">
                        </textarea>
                    </fieldset>
                    <fieldset className="form-group col-md-4">
                    <p className="text-muted text-left">Email</p>
                        <input type="text" placeholder="Email" value={this.state.email} disabled={this.props.gotRequest || this.props.requestSent} onChange={this.changeEmail} className="form-control settings-input"/>
                    </fieldset>
                    <fieldset className="form-group col-md-4">
                    <p className="text-muted text-left">Profile Image</p>
                        <input type="text" placeholder="URL to profile image" value={this.state.image} disabled={this.props.gotRequest || this.props.requestSent} onChange={this.changeImage} className="form-control settings-input"/>
                    </fieldset>
                    <fieldset className="form-group col-md-4">
                    <p className="text-muted text-left">Password</p>
                        <input type="password" placeholder="New password" value={this.state.password} disabled={this.props.gotRequest || this.props.requestSent} onChange={this.changePassword} className="form-control settings-input"/>
                    </fieldset>

                    {this.props.gotRequest || this.props.requestSent ? null :
                    <div className="col-12">
                        <p className="text-center text-muted">Delivery Mode</p>
                        <i className="fa fa-truck fa-2x my-2" style={this.state.deliveryMode ? {color: '#1fcf7c'} : {color: 'rgba(0,0,0,.4)'}}></i>
                        <fieldset className="form-group">
                            <label className="switch">
                                {this.state.deliveryMode ? <input type="checkbox" checked onClick={this.changeDeliveryMode}/> : <input type="checkbox"  onClick={this.changeDeliveryMode}/>}
                                <span className="slider round"></span>
                            </label>
                        </fieldset>

                    </div>
                    }
                    <fieldset className="form-group col-12">
                        <button type="submit" disabled={this.props.gotRequest || this.props.requestSent} className="btn btn-lg login-button">Save</button>
                    </fieldset>
                </div>
                </fieldset>
            </form>
        );

    }
}

class Settings  extends React.Component{
    constructor(props){
        super(props);



        this.state = {
            isVisible: true
        }
    }
    render(){
        return (

                    <div style={{height: '100%', width: '100%', backgroundColor: '#fff', overflow:'auto'}}>
                        <div className="container-fluid" >
                            <div className="row">
                                <div style={{height: '100vh', paddingTop: '100px' }} className="col-6 offset-3">
                                    <div className="text-center">
                                        <img src={this.props.currentUser.image} className="my-3" height="70" style={{borderRadius: '50%', boxShadow: '0 0 5px 0 rgba(0,0,0,.2)'}} />
                                        <h4>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</h4>
                                        <hr />
                                        <Errors errors={this.props.errors}/>

                                        <Form requestSent={this.props.requestSent} gotRequest={this.props.gotRequest} onRemoveFromTo={this.props.onRemoveFromTo} onSubmitForm={this.props.onSubmitForm} currentUser={this.props.currentUser}/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    ...state.settings,
    ...state.requests
});

const mapDispatchToProps = dispatch => ({
    onSubmitForm: user =>
        dispatch({type: actions.SETTINGS_SAVED, payload: agent.Auth.update(user)}),
    onRemoveFromTo: () =>
        dispatch({type: actions.REMOVE_FROM_TO})
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));