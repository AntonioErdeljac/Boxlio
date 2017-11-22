import React from "react";
import Errors from "./Errors";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import agent from "../agent";
import onClickOutside from "react-onclickoutside";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {withRouter} from "react-router-dom";

class Form extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
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
        //add deliver mode

        this.changeDeliveryMode = ev => {

            this.setState({
                deliveryMode: !this.state.deliveryMode
            })
        };

        this.submitForm = ev => {
            ev.preventDefault();

            const user = Object.assign({}, this.state);

            if(!user.password){
               delete user.password;
            }

            this.props.onSubmitForm(user);
        }
    }

    componentWillMount(){
        if(this.props.currentUser){
            Object.assign(this.state, {
                image: this.props.currentUser.image || '',
                username: this.props.currentUser.username,
                email: this.props.currentUser.email,
                about: this.props.currentUser.about,
                deliveryMode: this.props.currentUser.deliveryMode
            })
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState(Object.assign({}, this.state, {
            image: nextProps.currentUser.image || '',
            username: nextProps.currentUser.username,
            about: nextProps.currentUser.about,
            email: nextProps.currentUser.email,
            deliveryMode: this.props.currentUser.deliveryMode
        }))
    }

    render(){
        return (
            <form onSubmit={this.submitForm}>
                <fieldset>
                    <fieldset className="form-group">
                        <input type="text" placeholder="Username" value={this.state.username} disabled className="form-control"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <textarea type="text" value={this.state.about} onChange={this.changeAbout} placeholder="Something about you" className="form-control">
                        </textarea>
                    </fieldset>
                    <fieldset className="form-group">
                        <input type="text" placeholder="Email" value={this.state.email} onChange={this.changeEmail} className="form-control"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <input type="text" placeholder="URL to profile image" value={this.state.image} onChange={this.changeImage} className="form-control"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <input type="password" placeholder="New password" value={this.state.password} onChange={this.changePassword} className="form-control"/>
                    </fieldset>
                    <p className="text-center text-muted">Delivery Mode</p>
                    <i className="fa fa-truck fa-2x my-2" style={this.state.deliveryMode ? {color: '#1fcf7c'} : {color: 'rgba(0,0,0,.4)'}}></i>
                    <fieldset className="form-group">
                        <label className="switch">
                            {this.state.deliveryMode ? <input type="checkbox" checked onClick={this.changeDeliveryMode}/> : <input type="checkbox"  onClick={this.changeDeliveryMode}/>}
                            <span className="slider round"></span>
                        </label>
                    </fieldset>
                    <fieldset className="form-group">
                        <button type="submit" className="btn btn-lg login-button">Save</button>
                    </fieldset>
                </fieldset>
            </form>
        );
    }
}

class Settings extends React.Component{

    constructor(props){
        super(props);



        this.state = {
            isVisible: true
        }
    }

    handleClickOutside = ev => {
        this.setState({isVisible: false});
        setTimeout(() => {
            this.props.history.push('/')
        }, 600);
    };

    render(){
        if(this.props.currentUser){
            console.log(this.props, 'FINDING ROUTENAME');
            return (


                <ReactCSSTransitionGroup
                    transitionAppear={true}
                    transitionAppearTimeout={600}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={200}
                    transitionName={this.props.match.params === '/settings' ? 'SlideIn' : 'SlideOut'}
                >{this.state.isVisible ? <div className="Absolute-Center float-modal">
                    <div className="container float-modal-inner">
                        <div className="row">
                            <div className="col-6 offset-3">
                                <div className="text-center">
                                    <h3 className="display-5" style={{color: 'rgba(0,0,0,.6)'}}>Your Settings</h3>
                                    <Errors errors={this.props.errors}/>

                                    <Form onSubmitForm={this.props.onSubmitForm} currentUser={this.props.currentUser}/>

                                </div>
                            </div>
                        </div>
                    </div>
                </div> : null}

                </ReactCSSTransitionGroup>
            );
        } else {
            return null;
        }
    }
}


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    ...state.settings
});

const mapDispatchToProps = dispatch => ({
    onSubmitForm: user =>
        dispatch({type: 'SETTINGS_SAVED', payload: agent.Auth.update(user)})
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(onClickOutside(Settings)));