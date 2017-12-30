import * as Animatable from "react-native-animatable";
import Icon from 'react-native-vector-icons/FontAwesome';
import RNGooglePlaces from "react-native-google-places";
import React from "react";
import agent from "../../../../agent";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text, Right, Left, H1  } from 'native-base';
import {Container} from "native-base";
import {Grid, Col, Row} from "react-native-easy-grid";
import {Places} from 'google-places-web';
import {StyleSheet, Dimensions, View, TextInput, TouchableOpacity, Keyboard} from "react-native";
import {connect} from "react-redux";
import * as constants from "../../../../constants/routes";
import io from "socket.io-client";

const CardAnimatable = Animatable.createAnimatableComponent(Card);
const CardItemAnimatable = Animatable.createAnimatableComponent(CardItem);
const ContainerAnimatable = Animatable.createAnimatableComponent(Container);



class DeliveryModeView extends React.Component{
    componentWillMount(){
        const lat = this.props.currentUser.geometry[0];
        const lng = this.props.currentUser.geometry[1];
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ';
        if(!this.props.initialSet){
            fetch(url)
                .then((response) =>  {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                })
                .then((data) => {
                    this.props.onSetTo(data);
                });
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.requestSent){
            this.refs.travelmodechooser.fadeOutDown(300);
        }
    }
    constructor(props){
        super(props);

        this.state={
            transportation: this.props.currentUser.transportation
        };

        this.handleChangeTravelMode = field => ev => {
            agent.Auth.update({transportation: field});
            this.setState({transportation: field});
        };

        this.handleChangeAvailability = () => {
            this.props.onChangeAvailability(agent.Auth.update({available: !this.props.currentUser.available}));
        }

    }

    render(){
        return (
            <ContainerAnimatable animation="fadeInUp" ref="travelmodechooser" delay={300} style={styles.searchTo}>
                <Content scrollEnabled={false} style={{backgroundColor: 'transparent'}}>
                    <Card style={{elevation: 0, borderColor: 'transparent', padding: 25, backgroundColor: 'transparent'}}>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center'}}>
                        <H1 style={{fontFamily: 'VarelaRound-Regular', color: 'rgba(0,0,0,.6)', justifyContent: 'center', alignItems: 'center'}}>Delivery Menu</H1>
                        </CardItem>

                        <CardItem>
                            <Icon active name="dot-circle-o" style={styles.iconToSpecial} />
                            <Text numberOfLines={1} style={{fontFamily: 'VarelaRound-Regular', fontSize: 14, color: 'rgba(0,0,0,.5)', marginLeft: 10}}>{this.props.to}</Text>
                        </CardItem>
                        <View style={{backgroundColor: 'rgba(0,0,0,.08)', height: 1, width: Dimensions.get('window')-100}}></View>
                        <Grid style={{padding: 20}}>
                            <Row style={{justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={this.handleChangeTravelMode('walking')}>
                                    <Icon name="male" style={this.state.transportation !== 'walking' && this.state.transportation !== 'all' ? {fontSize: 20, color:'rgba(0,0,0,.3)'} : {fontSize: 20, color:'#1fcf7c'}}></Icon>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.handleChangeTravelMode('car')}>
                                    <Icon name="car" style={this.state.transportation !== 'car' && this.state.transportation !== 'all' ? {fontSize: 20, color:'rgba(0,0,0,.3)'} : {fontSize: 20, color:'#1fcf7c'}}></Icon>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.handleChangeTravelMode('bicycle')}>
                                    <Icon name="bicycle" style={this.state.transportation !== 'bicycle' && this.state.transportation !== 'all' ? {fontSize: 20, color:'rgba(0,0,0,.3)'} : {fontSize: 20, color:'#1fcf7c'}}></Icon>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.handleChangeTravelMode('transit')}>
                                    <Icon name="bus" style={this.state.transportation !== 'transit' && this.state.transportation !== 'all' ? {fontSize: 20, color:'rgba(0,0,0,.3)'} : {fontSize: 20, color:'#1fcf7c'}}></Icon>
                                </TouchableOpacity>
                            </Row>
                        </Grid>
                            <CardItem>
                                <Icon active name="star" style={styles.iconTo}/>
                                <Text style={{color: 'rgba(0,0,0,.5)', fontFamily: 'VarelaRound-Regular', fontSize: 16, marginLeft: 10}}>{this.props.currentUser.ratings}</Text>
                            </CardItem>
                        <CardItem>
                            <Icon active name="money" style={styles.iconTo}/>
                            <Text style={{color: 'rgba(0,0,0,.5)', fontFamily: 'VarelaRound-Regular', fontSize: 16, marginLeft: 10}}>{this.props.currentUser.earnedMoney}</Text>
                        </CardItem>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                        {this.props.currentUser.available ?
                            <TouchableOpacity onPress={this.handleChangeAvailability} style={{backgroundColor: '#E7475E', borderRadius: 10, padding: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                <Text style={{color: '#fff', fontFamily: 'VarelaRound-Regular', fontSize: 13}}>Go Offline</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={this.handleChangeAvailability} style={{backgroundColor: '#1fcf7c', borderRadius: 10, padding: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                <Text style={{color: '#fff', fontFamily: 'VarelaRound-Regular', fontSize: 13}}>Go Online</Text>
                            </TouchableOpacity>
                        }
                        </CardItem>
                        <CardItem style={{borderRadius: 30}}>
                            <Text style={{color: 'rgba(0,0,0,.5)', marginTop: 10, fontFamily: 'VarelaRound-Regular', fontSize: 10}}>
                                You are
                                    {this.props.currentUser.available ?
                                    <Text style={{color: '#1fcf7c', marginTop: 10, fontFamily: 'VarelaRound-Regular', fontSize: 10}}>
                                        &nbsp;online
                                    </Text>
                                    :
                                    <Text style={{color: '#E7475E', marginTop: 10, fontFamily: 'VarelaRound-Regular', fontSize: 10}}>
                                        &nbsp;offline
                                    </Text>
                                    }
                                . You will receive delivery requests.</Text>
                        </CardItem>
                    </Card>
                </Content>
            </ContainerAnimatable>
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
        backgroundColor: 'transparent',
        fontSize: 15,
        fontFamily: 'VarelaRound-Regular',
        color: 'rgba(0,0,0,.5)',
        zIndex: 1001,
        height: 50

    },
    iconTo:{
        color: '#1fcf7c',
        fontSize: 20
    },
    iconToSpecial:{
        color: '#1fcf7c',
        fontSize: 15
    },
    searchTo: {
        zIndex: 1000,
        height: Dimensions.get('window').height-150 ,
        width: Dimensions.get('window').width-30,
        borderRadius: 10,
        elevation: 1,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        justifyContent: 'center',
        position: 'absolute',
        top: 90,
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

const mapStateToProps = state => ({
    ...state.destinationView,
    ...state.requests,
    currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    onSetTo: data =>
        dispatch({type: 'SET_TO', data}),
    onChangeAvailability: payload =>
        dispatch({type: 'CHANGE_AVAILABILITY', payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryModeView);