import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    KeyBoardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import agent from "../../agent";
import {connect} from "react-redux";
import { Container, Header, Content, Form, Item, Input , Button, H1, H3, Label, Icon,} from 'native-base';
import {Col, Row, Grid} from "react-native-easy-grid";
import ErrorsList from "./ErrorsList";
import * as Animatable from "react-native-animatable";

class Welcome extends Component<{}> {
    constructor(props){
        super(props);

        this.setEmail = text => 
            this.props.onSetEmail(text);


        this.setPassword = text => 
            this.props.onSetPassword(text);

        this.submitForm = (email, password) => {
            this.props.onSubmitForm(email, password);
        }


    }

    render() {
        const {email, password} = this.props;
        return (
                <Container style={styles.container}>
                <Animatable.View ref="view">
                    <Grid>
                        <Row>
                        <Image source={{uri: 'https://i.imgur.com/TpS1vMz.png'}} style={{margin: 20,justifyContent: 'center',resizeMode: 'contain', height:70, width: 70}}></Image>
                            
                        </Row>
                        <Row>
                            <Text style={styles.subtitle}>
                                Welcome back!{"\n"}
                                <Text style={styles.subtitle2}>Sign in to continue to Boxlio.</Text>
                            </Text>
                        </Row>
                        <ErrorsList errors={this.props.errors}/>
                        <Row size={2}>
                            <Container style={{marginRight: 10}}>
                                    <Form>
                                        <Item style={{borderColor: 'rgba(0,0,0,.09)', marginBottom: 10, marginTop: 10}}>
                                            <Input 
                                            value={email}
                                            onChangeText={(text) => this.setEmail(text)}
                                            block 
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Email" />
                                        </Item>
                                        <Item style={{borderColor: 'rgba(0,0,0,.09)', marginBottom: 10}}>
                                            <Input 
                                            block
                                            value={password}
                                            onChangeText={(text) => this.setPassword(text)} 
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Password" />    
                                        </Item>
                                            <TouchableOpacity onPress={() => this.submitForm(email, password)} style={styles.loginButton}>
                                            <Text style={styles.loginButtonText}>Login</Text>
                                            </TouchableOpacity>
                                    </Form>
                            </Container>
                            </Row>
                    </Grid>
                    </Animatable.View>
                </Container>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    headerText: {
        color: '#000',
        fontFamily: "VarelaRound-Regular",
        fontSize: 35,
        padding: 20
    },
    subtitle: {
        fontSize: 20,
        color: 'rgba(0,0,0,.6)',
        fontFamily: "VarelaRound-Regular",
        padding: 20
    },
    subtitle2: {
        color: '#000',
        fontFamily: 'VarelaRound-Regular',
        fontSize: 20,
        padding: 20,
        marginTop: 5,
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
    },
    Input: {
        backgroundColor: '#fff',
        color: 'rgba(0,0,0,.6)',
        borderRadius: 0,
        borderColor: '#000'
    },
    loginButton: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        marginTop: 10,
        shadowColor: 'transparent'
    },
    loginButtonText: {
        color: '#1fcf7c',
        fontSize: 25,
        marginLeft: 18,
        fontFamily: 'VarelaRound-Regular'
    }

});

const mapStateToProps = state => ({
    ...state.auth
})

const mapDispatchToProps = dispatch => ({
    onSetEmail: value =>
        dispatch({type: 'UPDATE_FIELD_AUTH', value, key: 'email'}),
    onSetPassword: value =>
        dispatch({type: 'UPDATE_FIELD_AUTH', value, key: 'password'}),
    onSubmitForm: (email, password) =>
        dispatch({type: 'LOGIN', payload: agent.Auth.login(email, password)})
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);