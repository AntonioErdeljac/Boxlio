import React from "react"
import onClickOutside from "react-onclickoutside";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as actions from "../constants/actions";

class CurrentUserDropDown extends React.Component{
    render(){
        return (
            <div style={{width: '180px', fontSize: '17px', borderStyle: 'none', marginTop: '10px', boxShadow: '0 0 10px 0 rgba(0,0,0,.1)', borderRadius: '3px', color:'rgba(0,0,0,.5)'}} className="dropdown-menu dropdown-menu-right " aria-labelledby="navbarDropdown" id="navdrop">
                <Link to={`/@${this.props.currentUser.username}`} style={{color:'rgba(0,0,0,.6)'}} className="dropdown-item"><img src={this.props.currentUser.image} height="30" width="30" style={{borderRadius: '50%', boxShadow: '0 0 20px 0 rgba(0,0,0,.1)'}} className="mx-2"/>&nbsp;@{this.props.currentUser.username}</Link>
                <div className="dropdown-divider"></div>
                <Link to="/settings" className="dropdown-item" href="#" style={{color:'rgba(0,0,0,.6)'}}><i className="fa fa-gear"></i>&nbsp;Settings</Link>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={this.props.onClickLogout} style={{color: '#e74c3c'}}><i className="fa fa-power-off"></i>&nbsp;Logout</div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onClickLogout: () =>
        dispatch({type: actions.LOGOUT})
});

export default connect(null, mapDispatchToProps)(CurrentUserDropDown);