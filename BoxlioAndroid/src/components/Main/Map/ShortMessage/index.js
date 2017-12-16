import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text,  } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput} from "react-native";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";


class ShortMessage extends React.Component{

    componentWillReceiveProps(nextProps){
        if(nextProps.requestSent){
            this.refs.shortmessage.fadeOutDown(300);
        }
    }
    constructor(props){
        super(props);

        this.handleSetItem = text => {
            this.props.onSetItem(text);
        }
    }
    render(){
        if(this.props.currentUser){
            return (
                <Animatable.View animation="fadeInUp" ref="shortmessage" style={styles.searchTo}>
                    <View style={{justifyContent: 'space-around', alignItems: 'center'}}>
                    <TextInput
                        style={styles.input}
                        multiline = {true}
                        value={this.props.item}
                        onChangeText={(text) => this.handleSetItem(text)}
                        numberOfLines = {5}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholderTextColor="rgba(0,0,0,.3)"
                        placeholder="Short message eg. (I want you to buy me 2 bottles of milk)"/>
                    </View>
                </Animatable.View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    input: {
        width: Dimensions.get('window').width-100,
        marginRight: 30,
        backgroundColor: 'transparent',
        fontSize: 14,
        fontFamily: 'VarelaRound-Regular',
        color: 'rgba(0,0,0,.5)',
        zIndex: 1001,
        height: 90

    },
    iconTo:{
        color: '#1fcf7c',
        fontSize: 15
    },
    searchTo: {
        zIndex: 1000,
        height:Dimensions.get('window').height-500 ,
        width: Dimensions.get('window').width-30,
        padding: 25,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        elevation: 1,
        shadowOpacity: 0.1,
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000',
        position: 'absolute',
        top: 340,
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

const mapDispatchToProps = dispatch => ({
    onSetTo: data =>
        dispatch({type: 'SET_TO', data}),
    setToName: text =>
        dispatch({type: 'SET_TO_NAME', text}),
    onSetProfit: amount =>
        dispatch({type: 'SET_PROFIT', amount}),
    onSetItem: text =>
        dispatch({type: 'SET_ITEM', text}),
});

const mapStateToProps = state => ({
    ...state.common,
    ...state.destinationView,
    requestSent: state.requests.requestSent
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortMessage);