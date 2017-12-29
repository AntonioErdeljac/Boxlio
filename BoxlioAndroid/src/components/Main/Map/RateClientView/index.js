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
import * as constants from "../../../../constants/routes";

Places.apiKey = 'AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ';

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);
const CardItemAnimatable = Animatable.createAnimatableComponent(CardItem);
const CardAnimatable = Animatable.createAnimatableComponent(Card);
const IconAnimatable = Animatable.createAnimatableComponent(Icon);



class RateClientView extends React.Component{


    constructor(props){
        super(props);

        this.handleChangeTravelMode = (x) => console.log(x);

        this.state = {
            transportation: ''
        }

    }

    render(){
        return (
            <Animatable.View animation="fadeInUp" style={styles.searchTo}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: this.props.deliveryGuy.image}} style={styles.image}/>
                    </View>
                        <Text style={{
                            color: 'rgba(0,0,0,.5)',
                            fontFamily: 'VarelaRound-Regular',
                            marginTop: 10
                        }}>{this.props.deliveryGuy.firstName} {this.props.deliveryGuy.lastName}</Text>
                        <View style={{backgroundColor: 'rgba(0,0,0,.08)', height: 1, width: 100, marginTop: 10, marginBottom: 10}}></View>
                        <Grid style={{padding: 20}}>
                            <Row style={{justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={this.handleChangeTravelMode('walking')}>
                                    <Icon name="star" style={this.state.transportation !== 'walking' && this.state.transportation !== 'all' ? {fontSize: 20, color:'rgba(0,0,0,.3)'} : {fontSize: 20, color:'#1fcf7c'}}></Icon>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.handleChangeTravelMode('car')}>
                                    <Icon name="star" style={this.state.transportation !== 'car' && this.state.transportation !== 'all' ? {fontSize: 20, color:'rgba(0,0,0,.3)'} : {fontSize: 20, color:'#1fcf7c'}}></Icon>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.handleChangeTravelMode('bicycle')}>
                                    <Icon name="star" style={this.state.transportation !== 'bicycle' && this.state.transportation !== 'all' ? {fontSize: 20, color:'rgba(0,0,0,.3)'} : {fontSize: 20, color:'#1fcf7c'}}></Icon>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.handleChangeTravelMode('transit')}>
                                    <Icon name="star" style={this.state.transportation !== 'transit' && this.state.transportation !== 'all' ? {fontSize: 20, color:'rgba(0,0,0,.3)'} : {fontSize: 20, color:'#1fcf7c'}}></Icon>
                                </TouchableOpacity>
                            </Row>
                        </Grid>
            </Animatable.View>
        );
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
        height: 250 ,
        width: Dimensions.get('window').width-30,
        borderRadius: 3,
        padding: 30,
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
        dispatch({type: 'CANCEL_SEND_REQUEST'}),
    onShowOptions: () =>
        dispatch({type: 'SHOW_OPTIONS'}),
    onCloseOptions: () =>
        dispatch({type: 'CLOSE_OPTIONS'})
});

export default connect(mapStateToProps, mapDispatchToProps)(RateClientView);