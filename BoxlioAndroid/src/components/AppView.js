import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground
} from 'react-native';

import { Container, Header, Content, Form, Item, Input , Button, H1, Label, Icon} from 'native-base';

import {Col, Row, Grid} from "react-native-easy-grid";

export default class App extends Component<{}> {
    render() {

        return (
            <ImageBackground style={{flex: 1}} source={{uri: 'https://i.imgur.com/j8VlMLV.jpg'}}>
                <Container>
                    <Grid>
                        <Row>
                            <Content>
                                <Icon active name='ios-cart' style={styles.headerLogo} />
                                <H1 style={styles.headerText}>Boxlio</H1>
                            </Content>
                        </Row>
                        <Row>
                            <Container style={{alignItems: 'center'}}>
                                <Content >
                                    <Button iconLeft style={styles.buttonRegister}>

                                        <Icon name='ios-person-add' style={{color: '#1fcf7c', paddingRight: 10}}/>
                                        <Text style={styles.buttonText}>Register</Text>
                                    </Button>
                                </Content>
                            </Container>
                        </Row>
                    </Grid>
                </Container>
            </ImageBackground>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent'
    },
    headerText: {
        color: '#fff',
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: "VarelaRound-Regular",
        fontSize: 50,
        paddingTop: 10
    },
    headerLogo: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 50,
        marginTop: 10,
        marginBottom: 10
    },
    buttonRegister: {
        backgroundColor: '#fff',
        borderRadius: 6,
        width: 300,
        justifyContent: 'center',
        paddingRight: 20
    },
    buttonText: {
        color: '#1fcf7c',
        textAlign: 'center',
        fontFamily: 'VarelaRound-Regular'
    }
});
