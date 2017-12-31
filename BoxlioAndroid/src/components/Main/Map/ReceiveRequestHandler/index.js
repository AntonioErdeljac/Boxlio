import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput, Keyboard, TouchableOpacity, Image} from "react-native";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);


class ReceiveRequestHandler extends React.Component{
	render(){
        const {client} = this.props;
		return (
			<ContainerAnimatable animation="bounceIn" delay={300} style={styles.searchTo}>
                <Card style={{elevation: 0, borderColor: 'transparent'}}>
                    <CardItem style={styles.titleCard}>
                        <View style={styles.imageContainer}>
                            <Image borderRadius={65} source={{uri: this.props.currentUser.image}} style={styles.image} />
                        </View>
                        <Text style={styles.titleText}>{client.firstName} {client.lastName}'s request</Text>
                    </CardItem>
                    <CardItem>
                        <Icon active name="dot-circle-o" style={styles.iconTo} />
                        <Text style={styles.locationText}>{this.props.from}</Text>
                    </CardItem>
                    <CardItem>
                            <Icon style={{color: '#E7475E'}} active name="dot-circle-o" style={styles.iconFrom} />
                            <Text style={styles.locationText}>{this.props.locationName}</Text>
                    </CardItem>
                    <CardItem>
                            <Icon style={{color: '#1fcf7c'}} active name="money" style={styles.iconRest} />
                            <Text style={styles.locationText}>{this.props.price}</Text>
                    </CardItem>
                    <CardItem>
                            <Icon style={{color: '#1fcf7c'}} active name="shopping-basket" style={styles.iconRest} />
                            <Text style={styles.locationText}>{this.props.item}</Text>
                    </CardItem>
                    <Grid style={{
                    justifyContent: 'center',
                    alignContent: 'center',backgroundColor: 'transparent', padding: 10, marginTop: 10}}>

                    <Col style={{
                        marginBottom: 10,}}>
                        <TouchableOpacity style={{backgroundColor: '#1fcf7c', borderRadius: 10, padding: 15, justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
                            <Text style={{color: '#fff', fontFamily: 'VarelaRound-Regular', fontSize: 13}}><Icon name="check" style={{color: '#fff'}} />&nbsp;&nbsp;&nbsp;Accept</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{
                        marginBottom: 10,}}>
                        <TouchableOpacity style={{backgroundColor: '#E7475E', borderRadius: 10, padding: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                            <Text style={{color: '#fff', fontFamily: 'VarelaRound-Regular', fontSize: 13}}><Icon name="close" style={{color: '#fff'}} />&nbsp;&nbsp;&nbsp;Decline</Text>
                        </TouchableOpacity>
                    </Col>
                </Grid>
            </Card>
            </ContainerAnimatable>
		);
    }
}

const styles = StyleSheet.create({
    titleCard: {
        borderBottomColor: 'rgba(0,0,0,.05)',
        borderBottomWidth: 1
    },
    titleText: {
        fontFamily: 'VarelaRound-Regular',
        color: 'rgba(0,0,0,.55)',
        fontSize: 14,
        paddingLeft: 10
    },
    locationText: {
        fontFamily: 'VarelaRound-Regular',
        color: 'rgba(0,0,0,.45)',
        paddingLeft: 10,
        fontSize: 13
    },
	input: {
		width: Dimensions.get('window').width-100,
		backgroundColor: 'transparent',
        fontSize: 14,
        fontFamily: 'VarelaRound-Regular',
        color: 'rgba(0,0,0,.5)',
        zIndex: 1001,
        height: 90
    },
    iconRest: {
        color: '#1fcf7c'
    },
	iconTo:{
		color: '#2d89e5',
	},
	iconFrom:{
		color: '#F9C134',
	},
  searchTo: {
      zIndex: 1000,
      height: 320 ,
      width: Dimensions.get('window').width-30,
      elevation: 1,
      shadowOpacity: 0.1,
      shadowColor: '#000',
      position: 'absolute',
      bottom: 30,
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
  image: {
      flex: 1,
      resizeMode: 'contain',
      height: 37,
      width: 37,
      borderRadius: 100,
  },
  imageContainer: {
      height: 37,
      width: 37,
      borderRadius: 100,
      overflow: 'hidden',
      elevation: 1,
  }
});

const mapDispatchToProps = dispatch => ({
    onSetTo: data =>
        dispatch({type: 'SET_TO', data}),
    setToName: text =>
        dispatch({type: 'SET_TO_NAME', text})
});

const mapStateToProps = state => ({
  ...state.common,
  ...state.destinationView,
  ...state.requests,
    requestSent: state.requests.requestSent
});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveRequestHandler);