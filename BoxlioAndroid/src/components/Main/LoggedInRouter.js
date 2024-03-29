import React from "react";
import Welcome2 from "../Auth/Welcome2";
import WelcomeCurrentUser from "../Auth/WelcomeCurrentUser";
import Options from "./Options";
import Messages from "./Messages";
import Explore from "./Explore";
import Chat from "./Messages/Chat";
import Catalog from './Catalog';
import Basket from './Basket';
import ItemPreview from './Catalog/ItemPreview';
import Settings from "./Settings";
import MapComponent from "./Map";
import {DrawerNavigator} from "react-navigation";
import {connect} from "react-redux";


const LoggedInRouter = DrawerNavigator({
	logout: {screen: Welcome2, drawerLockMode: 'locked-closed'},
	main: {screen: MapComponent, drawerLockMode: 'locked-closed'},
	options: {screen: Options, drawerLockMode: 'locked-closed'},
	messages: {screen: Messages, drawerLockMode: 'locked-closed'},
	explore: {screen: Explore, drawerLockMode: 'locked-closed'},
	settings: {screen: Settings, drawerLockMode: 'locked-closed'},
	catalog: {screen: Catalog, drawerLockMode: 'locked-closed'},
	catalogItem: {screen: ItemPreview, drawerLockMode: 'lock-closed'},
	basket: {screen: Basket, drawerLockMode: 'lock-closed'},
	chat: {
		screen: Chat,
		drawerLockMode: 'locked-closed'
	}
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
