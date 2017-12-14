import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text, Right, Left  } from 'native-base';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput, TouchableOpacity} from "react-native";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import RNGooglePlaces from "react-native-google-places";
import {Places} from 'google-places-web';
import Icon from 'react-native-vector-icons/FontAwesome';
const ContainerAnimatable = Animatable.createAnimatableComponent(Container);
const CardItemAnimatable = Animatable.createAnimatableComponent(CardItem);
const CardAnimatable = Animatable.createAnimatableComponent(Card);



class AdditionalInfo extends React.Component{
    constructor(props){
        super(props);

        this.state={
          transportation: ''
        };

        this.handleChangeTravelMode = field => ev => {
            this.setState({transportation: field});
        };
    }

    render(){
            return (
            <ContainerAnimatable animation="fadeInUp" ref="locationchooser" delay={300} style={styles.searchTo}>
                <Content keyboardShouldPersistTaps="handled">
                    <Grid style={{padding: 30}}>
                        <Row>
                            <Text style={{fontFamily: 'VarelaRound-Regular', fontSize: 15, color:'rgba(0,0,0,.4)', marginBottom: 30}}>Transportation</Text>
                        </Row>
                        <Row style={{justifyContent: 'space-between'}}>
                            <TouchableOpacity onPress={this.handleChangeTravelMode('walking')}>
                                <Icon name="male" style={this.state.transportation !== 'walking' && this.state.transportation !== 'all' ? {fontSize: 23, color:'rgba(0,0,0,.3)'} : {fontSize: 23, color:'#1fcf7c'}}></Icon>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.handleChangeTravelMode('car')}>
                                <Icon name="car" style={this.state.transportation !== 'car' && this.state.transportation !== 'all' ? {fontSize: 23, color:'rgba(0,0,0,.3)'} : {fontSize: 23, color:'#1fcf7c'}}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleChangeTravelMode('bicycle')}>
                                <Icon name="bicycle" style={this.state.transportation !== 'bicycle' && this.state.transportation !== 'all' ? {fontSize: 23, color:'rgba(0,0,0,.3)'} : {fontSize: 23, color:'#1fcf7c'}}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleChangeTravelMode('transit')}>
                                <Icon name="bus" style={this.state.transportation !== 'transit' && this.state.transportation !== 'all' ? {fontSize: 23, color:'rgba(0,0,0,.3)'} : {fontSize: 23, color:'#1fcf7c'}}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleChangeTravelMode('all')}>
                                <Icon name="check" style={this.state.transportation !== 'all' && this.state.transportation !== 'all' ? {fontSize: 23, color:'rgba(0,0,0,.3)'} : {fontSize: 23, color:'#1fcf7c'}}></Icon>
                            </TouchableOpacity>
                        </Row>
                    </Grid>
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
        height: Dimensions.get('window').height-270 ,
        width: Dimensions.get('window').width-30,
        borderRadius: 3,
        elevation: 2,
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
});

const mapStateToProps = state => ({
    ...state.destinationView
});

const mapDispatchToProps = dispatch => ({
    setFrom: place =>
        dispatch({type: 'SET_FROM', place})
});

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalInfo);