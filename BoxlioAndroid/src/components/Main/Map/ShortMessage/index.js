import React from "react";
import { Container, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Grid, Col, Row} from "react-native-easy-grid";
import { StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

class ShortMessage extends React.Component{
    render(){
        return (
            <Animatable.View animation="fadeInUp" ref="shortmessage" style={styles.searchTo}>
                <Grid style={{justifyContent: 'space-around', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('catalog')} style={styles.button}>
                        <Grid>
                            <Row>
                                <Icon name="shopping-basket" style={{color: '#fff', marginRight: 10}} />
                                <Text style={styles.textButton}>Open Catalog</Text>
                            </Row>
                        </Grid>
                    </TouchableOpacity>
                </Grid>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    textButton: {
        color: '#fff',
        fontFamily: 'VarelaRound-Regular',
        fontSize: 13,
    },
    button: {
        padding: 13,
        height: 43,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1fcf7c',
        width: Dimensions.get('window').width-100,
    },
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
        width: Dimensions.get('window').width-10,
        padding: 25,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        elevation: 0,
        shadowOpacity: 0.1,
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        top: 210,
        backgroundColor: 'transparent'
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


export default ShortMessage;