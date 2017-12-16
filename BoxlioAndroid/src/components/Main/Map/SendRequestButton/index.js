import React from "react";
import {TouchableOpacity, Text, StyleSheet, TouchableHighlight, Alert} from "react-native";
import {Left, CardItem} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from "react-native-animatable";

const TouchableOpacityAnimatable = Animatable.createAnimatableComponent(TouchableOpacity);

class  SendRequestButton extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
    return (
        <TouchableOpacityAnimatable animation="fadeInUp" ref="searchbutton" onPress={() => this.refs.searchbutton.bounceOutDown(300).then(this.props.handleSendRequest)}  style={styles.loginButton}>
            <CardItem style={{backgroundColor: 'transparent'}}>
                <Left>
                    <Icon name="truck" style={{color: '#fff', fontSize: 20}}/>
                </Left>
                <Text style={styles.loginButtonText}>Send Request</Text>
            </CardItem>
        </TouchableOpacityAnimatable>
    );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    userText: {
        fontFamily: 'VarelaRound-Regular',
        fontSize: 25,
        textAlign: 'center'
    },
    userImage: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
        height:150,
        width: 150,
        borderRadius: 150,
    },
    imageContainer: {
        borderRadius: 150,
        height: 150,
        width: 150,
        borderColor: '#1fcf7c',
        alignItems: 'center'
    },
    loginButton: {
        borderColor: 'transparent',
        zIndex: 100000000,
        backgroundColor: '#1fcf7c',
        height: 50,
        width: 200,
        bottom: 30,
        marginLeft: 10,
        shadowColor: 'rgba(255,255,255,1)',
        elevation: 3,
        shadowOffset: {height: 10, width: 10},
        shadowOpacity: 0.3,
        padding: 5,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButtonDisabled: {
        opacity: 0.5,
        borderColor: 'transparent',
        backgroundColor: '#1fcf7c',
        marginTop: 10,
        marginLeft: 10,
        shadowColor: 'rgba(255,255,255,1)',
        elevation: 3,
        shadowOffset: {height: 10, width: 10},
        shadowOpacity: 0.3,
        padding: 10,
        borderRadius: 30,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'VarelaRound-Regular'
    }
});

export default SendRequestButton;