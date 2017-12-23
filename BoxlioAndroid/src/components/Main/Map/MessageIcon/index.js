import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text,   } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput, Image, TouchableOpacity} from "react-native";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";

const TouchableOpacityAnimatable = Animatable.createAnimatableComponent(TouchableOpacity);


class MessageIcon extends React.Component{
    render(){
        if(this.props.currentUser){
            return (
                <TouchableOpacity onPress={() => this.refs.user.bounceOut(300).then(() => this.props.navigation.navigate('options'))} style={styles.TouchableOpacityComponent}>
                    <Animatable.View  ref="user"  style={styles.searchTo}>
                        <View style={styles.imageContainer}>
                            <Icon name="envelope-o" style={{color: '#1fcf7c', fontSize: 17}}></Icon>
                        </View>
                    </Animatable.View>
                </TouchableOpacity>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({

    imageContainer: {
        borderRadius: 45,
        height: 45,
        width: 45,
        backgroundColor: '#fff',
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        shadowColor: '#000',
        elevation: 0
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        borderRadius: 45,
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: Dimensions.get('window').width-100,
        marginRight: 30,
        backgroundColor: 'transparent',
        fontSize: 20,
        fontFamily: 'VarelaRound-Regular',
        color: 'rgba(0,0,0,.5)',
        zIndex: 1001,
        height: 90

    },
    iconTo:{
        color: '#2d89e5',
        fontSize: 15
    },
    TouchableOpacityComponent:{
        zIndex: 1000,
        height: 45 ,
        width: 45,
        borderRadius: 45,
        alignItems: 'center',
        marginTop: 22,
        elevation: 3
    },
    searchTo: {
        zIndex: 1000,
        height: 45 ,
        width: 45,
        borderColor: '#fff',
        borderRadius: 45,
        elevation: 0,
        alignItems: 'center',
        shadowColor: '#000',
        backgroundColor: '#fff',
        position: 'absolute'
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
    currentUser: state.common.currentUser
})

export default connect(mapStateToProps, null)(MessageIcon);