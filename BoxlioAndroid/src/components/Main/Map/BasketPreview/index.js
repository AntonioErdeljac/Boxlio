import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text,  } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput, Keyboard} from "react-native";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";


class BasketPreview extends React.Component{
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
                    <Grid style={{justifyContent: 'space-around', alignItems: 'center'}}>
                        <Col>
                            <Icon theme={{iconFamily: 'FontAwesome'}} style={styles.iconTo} name="shopping-basket" />
                        </Col>
                        <Col size={3}>
                            <View style={{justifyContent: 'space-around', alignItems: 'center'}}>

                                <TextInput
                                    onSubmitEditing={Keyboard.dismiss}
                                    style={styles.input}
                                    value={this.props.basket.length + ' Items'}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    placeholderTextColor="rgba(0,0,0,.3)"
                                    placeholder="What to buy?"/>
                            </View>
                        </Col>
                    </Grid>
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
        height: 45,
        width: Dimensions.get('window').width-30,
        padding: 25,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        elevation: 1,
        shadowOpacity: 0.1,
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000',
        position: 'absolute',
        top: 200,
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
    onSetItem: text =>
        dispatch({type: 'SET_ITEM', text}),
});

const mapStateToProps = state => ({
    ...state.common,
    ...state.catalog,
    requestSent: state.requests.requestSent
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketPreview);