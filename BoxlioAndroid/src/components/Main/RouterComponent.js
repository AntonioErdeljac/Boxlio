import React from "react";
import Welcome2 from "../Auth/Welcome2";
import WelcomeCurrentUser from "../Auth/WelcomeCurrentUser";
import Options from "./Options";
import MapComponent from "./Map";
import {DrawerNavigator} from "react-navigation";
import {connect} from "react-redux";


const RouterComponent = DrawerNavigator({
	home: {screen: Welcome2, drawerLockMode: 'locked-closed'},
	main: {screen: MapComponent, drawerLockMode: 'locked-closed'},
	options: {screen: Options, drawerLockMode: 'locked-closed'},
},
{
	navigationOptions: {
		drawerLockMode: 'locked-closed'
	}
},
{
	initialRouteName: "home"
});

const mapStateToProps = state => ({
	...state.common
});

export default connect(mapStateToProps, null)(RouterComponent);

