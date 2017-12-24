import React from "react";
import Welcome2 from "../Auth/Welcome2";
import WelcomeCurrentUser from "../Auth/WelcomeCurrentUser";
import Options from "./Options";
import Messages from "./Messages";
import MapComponent from "./Map";
import {DrawerNavigator} from "react-navigation";
import {connect} from "react-redux";


const LoggedInRouter = DrawerNavigator({
	logout: {screen: Welcome2, drawerLockMode: 'locked-closed'},
	main: {screen: MapComponent, drawerLockMode: 'locked-closed'},
	options: {screen: Options, drawerLockMode: 'locked-closed'},
	messages: {screen: Messages, drawerLockMode: 'locked-closed'},
},
{
	navigationOptions: {
		drawerLockMode: 'locked-closed'
	}
},
{
	initialRouteName: "main"
});


export default LoggedInRouter;

