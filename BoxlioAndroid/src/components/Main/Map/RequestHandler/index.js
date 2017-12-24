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



class LoadingView extends React.Component{


    constructor(props){
        super(props);

        this.socket = io('https://373fc370.ngrok.io');

        this.state = {
            predictions: null
        };


        this.handleCancelRequest = ev => {
            ev.preventDefault();
            console.log(this.props.deliveryGuy);
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
        if(!this.props.requestAccepted) {
            return (

                <Animatable.View animation="fadeInUp" style={styles.searchTo}>
                    {!this.props.requestAccepted ?
                        <ActivityIndicator size={50} color="#1fcf7c"/> : null}
                    {!this.props.requestAccepted ? <Text style={{
                            color: 'rgba(0,0,0,.5)',
                            fontFamily: 'VarelaRound-Regular',
                            marginTop: 10
                        }}>Searching</Text>
                        :
                        <View style={styles.imageContainer}>
                            <Image source={{uri: this.props.deliveryGuy.image}} style={styles.image}/>
                            <Text style={{
                                color: 'rgba(0,0,0,.5)',
                                fontFamily: 'VarelaRound-Regular',
                                marginTop: 10
                            }}>{this.props.deliveryGuy.firstName} {this.props.deliveryGuy.lastName}</Text>
                        </View>
                    }
                    <TouchableOpacity onPress={this.handleCancelRequest} style={{
                        borderRadius: 30,
                        marginTop: 30,
                        backgroundColor: '#E7475E',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 43,
                        width: 100
                    }}>
                        <Text style={{color: '#fff', fontFamily: 'VarelaRound-Regular'}}>
                            Cancel&nbsp;&nbsp;&nbsp;
                            <Icon
                            name="close" style={{color: '#fff'}}></Icon></Text>
                    </TouchableOpacity>
                </Animatable.View>
            );
        }
        return (
            <Animatable.View animation="fadeInUp" style={styles.acceptedView}>
                <CardItem>
                    <View style={styles.imageContainer}>
                        <Image borderRadius={65} source={{uri: this.props.deliveryGuy.image}} style={styles.image} />
                    </View>
                    <Grid>
                        <Row>
                    <Text style={{color: 'rgba(0,0,0,.5)', fontFamily: 'VarelaRound-Regular', marginLeft: 10}}>{this.props.deliveryGuy.firstName} {this.props.deliveryGuy.lastName}</Text>
                        </Row>
                        <Row>
                            <View  style={{
                                backgroundColor: 'rgba(0,0,0,.03)',
                                height: 15,
                                width: 15,
                                borderRadius: 50,
                                marginLeft: 10,
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                                <View  style={{backgroundColor: '#fff', height: 12, width: 12, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}}>
                                    <View  style={{backgroundColor: '#F9C134', height: 10, width: 10, borderRadius: 50}}>

                                    </View>
                                </View>
                            </View>
                            <Text numberOfLines={2} style={{color: 'rgba(0,0,0,.3)', fontFamily: 'VarelaRound-Regular', marginLeft: 10, fontSize: 10}}>
                                {this.props.locationName}
                            </Text>
                        </Row>
                    </Grid>
                    <Right>
                        <TouchableOpacity style={{backgroundColor: '#2d89e5', borderRadius: 10, padding: 15}}>
                            <Icon name="envelope" style={{color: '#fff'}} />
                        </TouchableOpacity>
                    </Right>
                </CardItem>
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
        height: 100,
        width: Dimensions.get('window').width-30,
        borderRadius: 3,
        elevation: 2,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        position: 'absolute',
        justifyContent: 'center',
        alignContent: 'center',
        bottom:30,
        backgroundColor: '#fff',
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
        dispatch({type: 'CANCEL_SEND_REQUEST'})
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingView);