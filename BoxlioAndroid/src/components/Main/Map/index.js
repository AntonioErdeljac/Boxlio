import React from "react";
import {Container} from "native-base";
import {Text} from "react-native";
import { Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import MapView from 'react-native-maps';
import {StyleSheet} from "react-native";
import * as Animatable from "react-native-animatable";
const ContainerAnimatable = Animatable.createAnimatableComponent(Container);

class Map extends React.Component{
	render(){
		return (
			<ContainerAnimatable animation="fadeInUp" style={styles.container}>
				<MapView style={styles.map} />
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

export default Map;

