import React from "react";
import {Container} from "native-base";
import {Text} from "react-native";
import { Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import MapView from 'react-native-maps';
import {StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";

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
			<ContainerAnimatable animation="fadeInUp" style={styles.container}>
			{this.props.tab === 'main' ?
				<MapView style={styles.map} />
				: null
			}
			{this.props.tab === 'explore' ?
				null : null
			}
			<Content >
			</Content>
				<Footer>
		          <FooterTab style={{backgroundColor: '#1fcf7c'}}>
		            <Button style={{backgroundColor: '#1fcf7c'}} onPress={() => this.changeTab('main')}>
		              <Icon style={this.props.tab !== 'main' ? {color: '#fff', opacity: 0.5} : {color: '#fff'}} name="globe" />
		            </Button>
		            <Button style={{backgroundColor: '#1fcf7c'}} onPress={() => this.changeTab('explore')}>
		              <Icon style={this.props.tab !== 'explore' ? {color: '#fff', opacity: 0.5} : {color: '#fff'}} name="ios-compass-outline" />
		            </Button>
		            <Button style={{backgroundColor: '#1fcf7c'}}>
		              <Icon style={this.props.tab !== 'settings' ? {color: '#fff', opacity: 0.5} : {color: '#fff'}} name="ios-mail-outline" />
		            </Button>
		          </FooterTab>
		        </Footer>
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