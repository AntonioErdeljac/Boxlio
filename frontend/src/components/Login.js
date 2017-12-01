import React from "react";
import onClickOutside from 'react-onclickoutside';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import agent from "../agent";
import Errors from "./Errors";
import {Link} from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as actions from "../constants/actions";

class Login extends React.Component{
    handleClickOutside = evt => {
       this.setState({isVisible: false});

       setTimeout(() => {
           if(this.props.history.location.pathname === '/login'){
            this.props.history.push('/')
           }
       }, 600);
    };
    constructor(props){
        super(props);

        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);

        this.submitForm = (email, password) => ev => {
            ev.preventDefault();

            this.props.onSubmitForm(email, password);
        };

        this.state = {
            isVisible: true
        }
    }
    render(){
        const {emailL, passwordL} = this.props;

        const email = emailL;
        const password = passwordL;
        return (
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={200}
                transitionName={this.props.history.location.pathname === '/login' ? 'SlideIn' : 'SlideOut'}
            >
                {this.state.isVisible ? <nav className="Absolute-Center float-modal">
                    <div className="container">
                        <div className="text-center row">
                            <div className="col-6 offset-3">
                                <img src="images/logo.png" className="mb-3" height="50" alt=""/>
                                <h1 className="display-5 d-none d-lg-block" style={{color: 'rgba(0,0,0,.6)'}}>Login to <b style={{color: "#1fcf7c"}}>Boxlio</b></h1>
                                <h6 className="display-7 d-md-none" style={{color: 'rgba(0,0,0,.6)'}}>Login to <b style={{color: "#1fcf7c"}}>Boxlio</b></h6>
                                <p className="">Or <Link to="/register"><b style={{color: "#1fcf7c"}}>Register</b></Link></p>
                                <Errors errors={this.props.errors}/>
                                <form onSubmit={this.submitForm(email, password)}>
                                    <fieldset>
                                        <fieldset className="form-group">
                                            <input type="text" className="form-control" value={email} onChange={this.changeEmail} placeholder="Email"/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <input type="password" placeholder="Password" value={password} onChange={this.changePassword} className="form-control"/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <button disabled={this.props.inProgress} className="btn btn-primary login-btn" type="submit" style={{backgroundColor: '#1fcf7c', outline: "none"}}>Login</button>
                                        </fieldset>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav> : null}

            </ReactCSSTransitionGroup>
        )
    }
}

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
        dispatch({type: actions.UPDATE_FIELD_LOGIN, key: 'emailL', value}),
    onChangePassword: value =>
        dispatch({type: actions.UPDATE_FIELD_LOGIN, key: 'passwordL', value}),
    onSubmitForm: (email, password) =>
        dispatch({type: actions.LOGIN, payload: agent.Auth.login(email, password)})
});

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(Login));