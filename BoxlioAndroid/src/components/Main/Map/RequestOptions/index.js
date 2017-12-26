import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Right, Left  } from 'native-base';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Text, Image} from "react-native";
import * as Animatable from "react-native-animatable";
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";
import RNGooglePlaces from "react-native-google-places";
import {Places} from 'google-places-web';
import agent from "../../../../agent";
import io from "socket.io-client";

Places.apiKey = 'AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ';

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);
const CardItemAnimatable = Animatable.createAnimatableComponent(CardItem);
const CardAnimatable = Animatable.createAnimatableComponent(Card);
const IconAnimatable = Animatable.createAnimatableComponent(Icon);



class RequestOptions extends React.Component{


    constructor(props){
        super(props);



        this.socket = io('https://373fc370.ngrok.io');


        this.handleCancelRequest = ev => {
            ev.preventDefault();
            console.log(this.props.deliveryGuy);
            this.props.onCloseOptions();
            if(this.props.requestAccepted) {
                this.socket.emit('CANCEL_DELIVERY_JOB_CLIENT', {
                    deliveryGuy: this.props.deliveryGuy,
                    client: this.props.currentUser
                });
            }
            this.props.onCancelRequest(agent.Auth.update({isRequesting: false, isOrdering: false, isDelivering: false, activeDeliveryJob: null}));

        };

    }

    render(){
        return (
            <Animatable.View animation="fadeInUp" duration={200} style={styles.acceptedView}>
                <Grid style={{
                    justifyContent: 'center',
                    alignContent: 'center',backgroundColor: 'transparent'}}>

                    <Col style={{
                        marginBottom: 10,}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('chat', {client: this.props.deliveryGuy})} style={{backgroundColor: '#2d89e5', borderRadius: 10, padding: 15, justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
                            <Text style={{color: '#fff', fontFamily: 'VarelaRound-Regular', fontSize: 13}}><Icon name="envelope" style={{color: '#fff'}} />&nbsp;&nbsp;&nbsp;Message</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col style={{
                        marginBottom: 10,}}>
                        <TouchableOpacity onPress={this.handleCancelRequest} style={{backgroundColor: '#E7475E', borderRadius: 10, padding: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                            <Text style={{color: '#fff', fontFamily: 'VarelaRound-Regular', fontSize: 13}}><Icon name="close" style={{color: '#fff'}} />&nbsp;&nbsp;&nbsp;Cancel</Text>
                        </TouchableOpacity>
                    </Col>
                </Grid>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    card:{
        width: Dimensions.get('window').width-50,
        alignItems: 'flex-start',
        elevation: 0
    },
    input: {
        width: Dimensions.get('window').width-100,
        marginRight: 30,
        backgroundColor: 'transparent',
        fontSize: 20,
        fontFamily: 'VarelaRound-Regular',
        color: 'rgba(0,0,0,.5)',
        zIndex: 1001,
        height: 200

    },
    iconTo:{
        color: '#1fcf7c',
        fontSize: 30,
    },
    searchTo: {
        zIndex: 1000000000000,
        height: 200 ,
        width: Dimensions.get('window').width-30,
        borderRadius: 3,
        elevation: 2,
        shadowOpacity: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        position: 'absolute',
        bottom:30,
        backgroundColor: '#fff'
    },
    acceptedView: {
        zIndex: 1000000000000,
        height: 45,
        width: Dimensions.get('window').width-30,
        borderRadius: 3,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        position: 'absolute',
        justifyContent: 'center',
        alignContent: 'center',
        bottom:140,
        backgroundColor: 'transparent',
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
        height: 45,
        width: 45,
        borderRadius: 100,
    },
    imageContainer: {
        height: 45,
        width: 45,
        borderRadius: 100,
        overflow: 'hidden',
    }
});

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    ...state.destinationView,
    ...state.requests
});

const mapDispatchToProps = dispatch => ({
    setFrom: place =>
        dispatch({type: 'SET_FROM', place}),
    onCancelRequest: () =>
        dispatch({type: 'CANCEL_ACTIVE_REQUEST'}),
    onCloseOptions: () =>
        dispatch({type: 'CLOSE_OPTIONS'})
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestOptions);