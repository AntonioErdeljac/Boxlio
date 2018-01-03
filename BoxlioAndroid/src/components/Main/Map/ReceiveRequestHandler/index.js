import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput, Keyboard, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import io from "socket.io-client";
import * as constants from "../../../../constants/routes";
import agent from "../../../../agent";

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);


class ReceiveRequestHandler extends React.Component{
    constructor(props){
        super(props);

        this.socket = io(constants.API_ROOT);

        this.handleCompleteDelivery = ev => {
            ev.preventDefault();
            this.socket.emit('COMEPLETE_DELIVERY', {
                client: this.props.client
            });
            this.props.setSentCompleteChoice();
        }

        this.handleDeclineRequest = ev => {
            if(this.props.acceptedRequest){
                this.socket.emit('CANCEL_DELIVERY_JOB_DELIVERY_GUY', {
                    client: this.props.client,
                    deliveryGuy: this.props.currentUser
                })
                this.props.onDeclineRequest(agent.Auth.update({isOrdering: false, isDelivering: false, activeDeliveryJob: null}))
            }
            this.props.onDeclineRequest(agent.Auth.update({isOrdering: false, isDelivering: false, activeDeliveryJob: null}));
        }

        this.handleAcceptRequest = ev => {
            ev.preventDefault();
            this.socket.emit('ACCEPT_REQUEST', {
                client: this.props.client,
                deliveryGuy: this.props.currentUser,
                locationName: this.props.locationName,
                deliveryGuyLocationName: this.props.to,
                fromName: this.props.from,
                price: this.props.price,
                item: this.props.item,
                lat: this.props.lat,
                lng: this.props.lng

            });
            this.props.onAcceptRequest(this.props.client);
        };
    }
	render(){
        const { client, acceptedRequest, currentUser, sentCompleteRequest } = this.props;

        if (!acceptedRequest && !currentUser.activeDeliveryJob) {
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
                                <TouchableOpacity onPress={this.handleAcceptRequest} style={{backgroundColor: '#1fcf7c', borderRadius: 10, padding: 15, justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
                                    <Text style={{color: '#fff', fontFamily: 'VarelaRound-Regular', fontSize: 13}}><Icon name="check" style={{color: '#fff'}} />&nbsp;&nbsp;&nbsp;Accept</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col style={{
                                marginBottom: 10,}}>
                                <TouchableOpacity onPress={this.handleDeclineRequest} style={{backgroundColor: '#E7475E', borderRadius: 10, padding: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                    <Text style={{color: '#fff', fontFamily: 'VarelaRound-Regular', fontSize: 13}}><Icon name="close" style={{color: '#fff'}} />&nbsp;&nbsp;&nbsp;Decline</Text>
                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    </Card>
                </ContainerAnimatable>
            );
        } else {
            return (
                <ContainerAnimatable animation="bounceIn" delay={300} style={styles.searchToAccepted}>
                        {!sentCompleteRequest ?
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
                                <Grid style={{
                                    justifyContent: 'center',
                                    alignContent: 'center',backgroundColor: 'transparent', padding: 10, marginTop: 10}}>
                                    <Col size={3} style={{
                                        marginBottom: 10,}}>
                                        <TouchableOpacity onPress={this.handleCompleteDelivery} style={{backgroundColor: '#1fcf7c', borderRadius: 10, padding: 15, justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
                                            <Text style={{color: '#fff', fontFamily: 'VarelaRound-Regular', fontSize: 13}}><Icon name="check" style={{color: '#fff'}} />&nbsp;&nbsp;&nbsp;Mark as delivered</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={{
                                        marginBottom: 10,}}>
                                        <TouchableOpacity onPress={this.handleDeclineRequest} style={{backgroundColor: '#E7475E', borderRadius: 10, padding: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                            <Text><Icon name="close" style={{color: '#fff', fontSize: 15}} /></Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Grid>
                            </Card>
                        :
                            <Card style={{elevation: 0, borderColor: 'transparent'}}>
                                <CardItem style={styles.titleCard}>
                                    <View style={styles.imageContainer}>
                                        <Image borderRadius={65} source={{uri: this.props.currentUser.image}} style={styles.image} />
                                    </View>
                                    <Text style={styles.titleText}>{client.firstName} {client.lastName}'s request</Text>
                                </CardItem>
                                <CardItem style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <ActivityIndicator size={50} color="#1fcf7c"/>
                                </CardItem>
                                <CardItem style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.locationText}>Waiting for client to confirm.</Text>
                                </CardItem>
                            </Card>
                        }
                </ContainerAnimatable>
            )
        }
        return null;
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
    searchToAccepted: {
        zIndex: 1000,
        height: 240 ,
        width: Dimensions.get('window').width-30,
        elevation: 1,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        position: 'absolute',
        bottom: 30,
        backgroundColor: '#fff'
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
        dispatch({type: 'SET_TO_NAME', text}),
    onDeclineRequest: payload =>
        dispatch({type: 'DECLINE_REQUEST', payload}),
    onAcceptRequest: client =>
        dispatch({type: 'ACCEPT_REQUEST', client}),
    setSentCompleteChoice: () =>
        dispatch({type: 'SEND_COMPLETE_REQUEST'})
});

const mapStateToProps = state => ({
  ...state.common,
  ...state.destinationView,
  ...state.requests,
});


export default connect(mapStateToProps, mapDispatchToProps)(ReceiveRequestHandler);