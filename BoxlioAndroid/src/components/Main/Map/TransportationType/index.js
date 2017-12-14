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
            this.props.onChangeTravelMode(field);
            this.setState({transportation: field});
        };
    }

    render(){
            return (
            <ContainerAnimatable animation="fadeInUp" ref="locationchooser" delay={300} style={styles.searchTo}>
                    <Grid style={{padding: 20}}>
                        <Row style={{justifyContent: 'space-between'}}>
                            <TouchableOpacity onPress={this.handleChangeTravelMode('walking')}>
                                <Icon name="male" style={this.props.transportation !== 'walking' && this.props.transportation !== 'all' ? {fontSize: 20, color:'rgba(0,0,0,.3)'} : {fontSize: 20, color:'#1fcf7c'}}></Icon>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.handleChangeTravelMode('car')}>
                                <Icon name="car" style={this.props.transportation !== 'car' && this.props.transportation !== 'all' ? {fontSize: 20, color:'rgba(0,0,0,.3)'} : {fontSize: 20, color:'#1fcf7c'}}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleChangeTravelMode('bicycle')}>
                                <Icon name="bicycle" style={this.props.transportation !== 'bicycle' && this.props.transportation !== 'all' ? {fontSize: 20, color:'rgba(0,0,0,.3)'} : {fontSize: 20, color:'#1fcf7c'}}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleChangeTravelMode('transit')}>
                                <Icon name="bus" style={this.props.transportation !== 'transit' && this.props.transportation !== 'all' ? {fontSize: 20, color:'rgba(0,0,0,.3)'} : {fontSize: 20, color:'#1fcf7c'}}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleChangeTravelMode('all')}>
                                <Icon name="check" style={this.props.transportation !== 'all' && this.props.transportation !== 'all' ? {fontSize: 20, color:'rgba(0,0,0,.3)'} : {fontSize: 20, color:'#1fcf7c'}}></Icon>
                            </TouchableOpacity>
                        </Row>
                    </Grid>
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
        height: 60 ,
        width: Dimensions.get('window').width-30,
        borderRadius: 3,
        elevation: 1,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        justifyContent: 'center',
        position: 'absolute',
        top: 210,
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
    onChangeTravelMode: field =>
        dispatch({type: 'CHANGE_TRAVEL_MODE', field})
});

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalInfo);