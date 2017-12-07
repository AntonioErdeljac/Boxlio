import React from "react";
import Welcome2 from "../Auth/Welcome2";
import WelcomeCurrentUser from "../Auth/WelcomeCurrentUser";
import Options from "./Options";
import MapComponent from "./Map";
import {DrawerNavigator} from "react-navigation";
import {connect} from "react-redux";


const RouterComponent = DrawerNavigator({
	home: {screen: Welcome2},
	welcomecurrentuser: {screen: WelcomeCurrentUser},
	main: {screen: MapComponent},
	options: {screen: Options},
},
{
	initialRouteName: "home"
});

const mapStateToProps = state => ({
	...state.common
})

export default connect(mapStateToProps, null)(RouterComponent);

