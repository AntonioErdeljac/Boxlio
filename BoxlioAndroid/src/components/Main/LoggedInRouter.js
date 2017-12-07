import React from "react";
import Welcome2 from "../Auth/Welcome2";
import WelcomeCurrentUser from "../Auth/WelcomeCurrentUser";
import Options from "./Options";
import MapComponent from "./Map";
import {DrawerNavigator} from "react-navigation";
import {connect} from "react-redux";


const LoggedInRouter = DrawerNavigator({
	logout: {screen: Welcome2},
	main: {screen: MapComponent},
	options: {screen: Options},
},
{
	initialRouteName: "main"
});


export default LoggedInRouter;

