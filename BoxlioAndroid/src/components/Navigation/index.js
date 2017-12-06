import React from "react";
import {Container} from "native-base";
import {Text, View} from "react-native";
import { Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import MapView from 'react-native-maps';
import Settings from "../Main/Settings";
import {StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";

import Map from "../Main/Map";

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);
const MapViewAnimatable = Animatable.createAnimatableComponent(MapView);


class Main extends React.Component{
	constructor(props){
		super(props);

		this.changeTab = (tab) => {
			this.props.onChangeTab(tab)
		}
	}

	render(){
		return (
			<ContainerAnimatable duration={300} animation="fadeInUp"  style={this.props.tab === 'map' ? styles.container : null }>
				<Map />
			</ContainerAnimatable>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const mapStateToProps = state => ({
	...state.navigator
})

const mapDispatchToProps = dispatch => ({
	onChangeTab: tab =>
		dispatch({type: 'CHANGE_TAB', tab})
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);