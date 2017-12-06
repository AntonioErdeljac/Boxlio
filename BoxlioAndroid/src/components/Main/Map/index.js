import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Icon, Card, CardItem, Body, Text } from 'native-base';
import {Grid, Col, Row} from "react-native-easy-grid";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, Dimensions, View} from "react-native";
import * as Animatable from "react-native-animatable";
import mapStyles from "./mapStyles";
const ContainerAnimatable = Animatable.createAnimatableComponent(Container);

class Map extends React.Component{
	render(){
		return (
			<ContainerAnimatable animation="fadeInUp" style={styles.container}>
        <Container style={styles.container}>
          <View style={styles.searchTo}>
            <Grid style={{justifyContent: 'space-around', alignItems: 'center'}}>
              <Col size={1}>
                <Icon name="ios-home" />
              </Col>
              <Col>
                <Text>test</Text>
              </Col>
            </Grid>
          </View>
				<MapView 
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyles}
        style={styles.map} />
        </Container>
			</ContainerAnimatable>
		);
	}
}

const styles = StyleSheet.create({
  searchTo: {
    zIndex: 1000,
    height: 45 ,
    width: Dimensions.get('window').width-30,
    padding: 25,
    borderRadius: 3,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    position: 'absolute',
    top: 10,
    backgroundColor: '#fff'
  },
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

