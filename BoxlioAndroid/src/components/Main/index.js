import React from "react";
import {Container} from "native-base";
import {Text} from "react-native";
import { Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import MapView from 'react-native-maps';
import {StyleSheet} from "react-native";


class Main extends React.Component{
	render(){
		return (
			<Container style={styles.container}>
				<MapView style={styles.map} />
			<Content >
			</Content>
				<Footer>
		          <FooterTab style={{backgroundColor: '#1fcf7c'}}>
		            <Button style={{backgroundColor: '#1fcf7c'}}>
		              <Icon style={{color: '#fff'}} name="globe" />
		            </Button>
		            <Button style={{backgroundColor: '#1fcf7c'}}>
		              <Icon style={{color: '#fff', opacity: 0.7}} name="ios-compass-outline" />
		            </Button>
		            <Button style={{backgroundColor: '#1fcf7c'}}>
		              <Icon style={{color: '#fff', opacity: 0.7}} name="person" />
		            </Button>
		          </FooterTab>
		        </Footer>
			</Container>
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

export default Main;