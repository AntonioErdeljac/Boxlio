import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text, Right, Left, Icon  } from 'native-base';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput, TouchableOpacity, Keyboard, ActivityIndicator} from "react-native";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import RNGooglePlaces from "react-native-google-places";
import {Places} from 'google-places-web';
Places.apiKey = 'AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ';
import agent from "../../../../agent";

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);
const CardItemAnimatable = Animatable.createAnimatableComponent(CardItem);
const CardAnimatable = Animatable.createAnimatableComponent(Card);



class LocationChooserTo extends React.Component{

    componentWillMount(){
        if(this.props.to){
            RNGooglePlaces.getAutocompletePredictions(this.props.to)
                .then((results) => this.setState({predictions: results}))
                .catch((error) => {throw error})
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.to){
            RNGooglePlaces.getAutocompletePredictions(nextProps.to)
                .then((results) => this.setState({predictions: results}))
                .catch((error) => {throw error})
        }

        if(nextProps.placeToChoosen){
            this.setState({
                predictions: null
            })
        }
    }

    constructor(props){
        super(props);

        this.state = {
            predictions: null
        };

        this.handleSetTo = (prediction) => {
            Keyboard.dismiss();
            this.refs.locationchooser.fadeOutDown(100).then(() => {
                RNGooglePlaces.lookUpPlaceByID(prediction.placeID)
                    .then((place) => {
                        this.props.setTo(place);
                        Keyboard.dismiss()
                    })
            })
        };

    }

    render(){
        if(!this.props.placeToChoosen && this.props.placeFromChoosen && this.props.to){
            return (
                <ContainerAnimatable animation="fadeInUp" ref="locationchooser" style={styles.searchTo}>
                    <Content keyboardShouldPersistTaps="handled">
                        {this.state.predictions && this.state.predictions.length > 0 ?

                            <CardAnimatable ref="cardanimatable" style={styles.card}>

                                {(this.state.predictions || []).map((prediction) => {
                                    return(
                                        <TouchableOpacity key={prediction.placeID} onPress={() => this.handleSetTo(prediction)}>
                                            <CardItemAnimatable animation="slideInUp" duration={50}>
                                                <Icon active name="ios-navigate-outline" style={{color: '#1fcf7c'}} />
                                                <Text style={{fontFamily: 'VarelaRound-Regular', fontSize: 15, color: 'rgba(0,0,0,.5)'}}>{prediction.fullText}</Text>
                                            </CardItemAnimatable>
                                        </TouchableOpacity>
                                    )
                                })}

                            </CardAnimatable>
                            : <ActivityIndicator size={50} color="#1fcf7c" />}
                    </Content>
                </ContainerAnimatable>
            );
        }
        return null;
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
        color: '#2d89e5',
        fontSize: 15
    },
    searchTo: {
        zIndex: 1000,
        height: Dimensions.get('window').height-200 ,
        width: Dimensions.get('window').width-30,
        borderRadius: 3,
        elevation: 2,
        shadowOpacity: 0.1,
        alignItems: 'center',
        justifyContent: 'space-around',
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
});

const mapStateToProps = state => ({
    ...state.destinationView
});

const mapDispatchToProps = dispatch => ({
    setTo: place =>
        dispatch({type: 'SET_TO_SPECIAL', place, payload: agent.Auth.update({geometry: [place.latitude, place.longitude]})})
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationChooserTo);