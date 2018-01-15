import CurrentUserDropdown from "./CurrentUserDropdown";
import NotificationDropdown from "./NotificationDropdown";
import React from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";


class NavigationBar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            color: 'rgba(0,0,0,.6)',
            height: '6%',
            isLoggingIn: false,
            width: '60%',
            opacity: '1'
        };

        this.changeColor = ev => {

            this.setState({
                color: '#1fcf7c'
            });
        };

    }
    render(){
            return (
                <nav className=" navbar fixed-top navbar-expand-md " style={{borderRadius: '0px',opacity: this.state.opacity}}>
                    <div className="container-fluid">
                        <LoggedOutTabs currentUser={this.props.currentUser}/>
                        <LoggedInTabs alertMessage={this.props.alertMessage} history={this.props.history} currentUser={this.props.currentUser}/>

                    <a href="/" className="navbar-brand mr-0 abs-center-x">
                        {this.props.isLoading && this.props.currentUser && this.props.history.location.pathname === '/' ? <div className="actionLoad"></div> : <img src="images/logo.png" className="userimg" height="35" alt=""/>}
                    </a>
                        <LoggedOut currentUser={this.props.currentUser}/>
                        <LoggedIn currentUser={this.props.currentUser}/>
                    </div>
                </nav>
            );
    }
}

const LoggedIn = props => {
    if(props.currentUser){
        return (
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item" style={{marginTop: '13px', textTransform:"capitalize"}} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span style={{textTransform: 'capitalize'}}>{props.currentUser.firstName}</span> <i className="fa fa-caret-down"></i>
                </li>
                <li className="nav-item dropdown ml-3" id="userimg">
                    <img src={props.currentUser.image}  alt="" height="50" width="50" style={{borderRadius: '50%', boxShadow: '0 0 1px rgba(0,0,0,.1)'}}  className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                    <CurrentUserDropdown currentUser={props.currentUser}/>
                </li>
            </ul>

        );
    }
    return null;
};
const LoggedOut = props => {
    if(!props.currentUser){
        return (
            <ul className="nav navbar-nav ml-auto py-2">
                <Link to="login" className="login-button">
                    <i className="fa fa-user"></i>&nbsp;Login
                </Link>
            </ul>

        );
    }
    return null;
};

const LoggedInTabs = props => {
    if(props.currentUser){
        return (
            <ul className="navbar-nav">
                <li className="nav-item mx-3">
                    <Link to="/" className={props.history.location.pathname === '/' ? "nav-button-active" : 'nav-button'} style={{textDecoration: 'none', color: 'rgba(0,0,0,.7)'}}>
                        <i className="fa fa-globe"></i>&nbsp;Map
                    </Link>
                </li>
                <li className="nav-item mx-3">
                    <Link to="/messages" style={{textDecoration: 'none', color: 'rgba(0,0,0,1)'}} className={props.history.location.pathname === '/messages' || props.history.location.pathname.split('/')[1] === 'messages' ? "nav-button-active" : 'nav-button'}>
                        {props.alertMessage || props.currentUser.alertMessage ? <i className="fa fa-circle mr-3" style={{fontSize: '10px',bottom:'10px',position:'relative', color: '#1fcf7c'}}/> : null} {props.alertMessage || props.currentUser.alertMessage ? <i className="fa fa-envelope"></i> : <i className="fa fa-envelope-o"></i>} &nbsp;Messages
                    </Link>
                </li>
                <li className="nav-item mx-3">
                    <Link to="/explore" style={{textDecoration: 'none', color: 'rgba(0,0,0,.7)'}} className={props.history.location.pathname === '/explore' ? "nav-button-active" : 'nav-button'}>
                        <i className="fa fa-compass"></i>&nbsp;Explore
                    </Link>
                </li>
                <li className="nav-item mx-3">
                    <Link to="/catalog" style={{textDecoration: 'none', color: 'rgba(0,0,0,.7)'}} className={props.history.location.pathname === '/catalog' ? "nav-button-active" : 'nav-button'}>
                        <i className="fa fa-shopping-cart"></i>&nbsp;Catalog
                    </Link>
                </li>
            </ul>
        );
    }
    return null;
};

const LoggedOutTabs = props => {
    if(!props.currentUser){
        return (
            <ul className="navbar-nav">
                <li className="nav-item mx-3">
                    <div className="nav-button-active">
                        Home
                    </div>
                </li>
            </ul>
        )
    }
    return null;
};

const mapStateToProps = state => ({
    ...state.common,
    ...state.notifications
});

export default withRouter(connect(mapStateToProps, null)(NavigationBar));