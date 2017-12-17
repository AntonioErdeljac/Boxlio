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
    Alert,
    TextInput,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import agent from "../../agent";
import {connect} from "react-redux";
import { Container, Header, Content, Form, Item, Input , Button, H1, H3, Label, Icon,} from 'native-base';
import {Col, Row, Grid} from "react-native-easy-grid";
import ErrorsList from "./ErrorsList";
import * as Animatable from "react-native-animatable";
import WelcomeCurrentUser from "./WelcomeCurrentUser";
import {Actions} from "react-native-router-flux";
const GridAnimated = Animatable.createAnimatableComponent(Grid);
const FormAnimated = Animatable.createAnimatableComponent(Form);
const ActivityIndicatorAnimated = Animatable.createAnimatableComponent(ActivityIndicator);

class Welcome2 extends Component<{}> {
    constructor(props){
        super(props);

        this.state = {
            hideLogin: false
        }

        this.setEmail = text => 
            this.props.onSetEmail(text);


        this.setPassword = text => 
            this.props.onSetPassword(text);

        this.submitForm = (email, password) => {
            this.props.onSubmitForm(email, password);
        }


    }

    componentWillMount(){
        if(this.props.currentUser){

            this.props.navigation.navigate('main');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.currentUser){
            console.error(nextProps.currentUser);
                this.props.navigation.navigate('main');
            
        }

        if(nextProps.isLoading && this.props.errors){
            this.refs.grid.shake(300);
        }

        if(nextProps.isLoading && !this.props.errors){
            this.refs.grid.bounceOut(300);
        }
        if(nextProps.errors && !this.props.errors && !nextProps.isTyping && !nextProps.currentUser){
            this.refs.grid.bounceIn(300);
        }
    }


    render() {
        const {email, password} = this.props;
        if(this.props.appLoaded){
        return (
                <Container style={styles.container}>
                    <GridAnimated ref="all" animation="fadeInRight">
                        <Row>
                        <Animatable.Image delay={500} ref="logo" animation="bounceIn" source={{uri: 'https://i.imgur.com/TpS1vMz.png'}} style={{flex: 1, marginTop: 30,justifyContent: 'center',resizeMode: 'contain', height:70, width: 70}}></Animatable.Image>
                      
                        </Row>
                        <Row >
                            <Col>
                            <View style={{justifyContent: 'space-around'}}>
                                <Animatable.Text ref="text" style={styles.headerText}>Welcome to Boxlio</Animatable.Text>
                            </View>
                            </Col>
                        </Row>
                        <ErrorsList errors={this.props.errors}/>
                        <Row size={2}>
                            <Col size={1}>
                                <Container style={{marginRight: 10}}>
                                {this.props.isLoading && !this.props.errors ?
                                    <ActivityIndicatorAnimated animation="bounceIn" delay={300} ref="loading" size={50} color="#1fcf7c" />
                                    : null}
                                    <FormAnimated ref="grid">
                                        <Item style={{borderColor: 'transparent', marginBottom: 10, marginTop: 10}}>
                                            
                                            <Input 
                                            value={email}
                                            onChangeText={(text) => this.setEmail(text)}
                                            block 
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Email" />
                                        </Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 10}}>
                                            <Input
                                            secureTextEntry={true}
                                            block
                                            value={password}
                                            onChangeText={(text) => this.setPassword(text)} 
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Password" />    
                                        </Item>
                                            <TouchableOpacity disabled={this.props.isLoading} onPress={() => this.submitForm(email, password)} style={this.props.isLoading ? styles.loginButtonDisabled : styles.loginButton}>
                                            <Text style={styles.loginButtonText}>Login</Text>
                                            </TouchableOpacity>
                                    </FormAnimated>
                                </Container>
                            </Col>
                        </Row>
                    </GridAnimated>
                </Container>
        );
        }
        return null;
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    headerText: {
        color: 'rgba(0,0,0,.6)',
        fontFamily: "VarelaRound-Regular",
        fontSize: 25,
        padding: 20,
        textAlign: 'center'
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
        backgroundColor: 'rgba(0,0,0,.02)',
        paddingLeft: 20,
        color: 'rgba(0,0,0,.6)',
        borderRadius: 6,
        borderColor: 'transparent',
        fontFamily: 'VarelaRound-Regular'
    },
    loginButton: {
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
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'VarelaRound-Regular'
    }

});

const mapStateToProps = state => ({
    ...state.auth,
    currentUser: state.common.currentUser,
    token: state.common.token,
    userIsSaved: state.common.userIsSaved,
    appLoaded: state.common.appLoaded
})

const mapDispatchToProps = dispatch => ({
    onSetEmail: value =>
        dispatch({type: 'UPDATE_FIELD_AUTH', value, key: 'email'}),
    onSetPassword: value =>
        dispatch({type: 'UPDATE_FIELD_AUTH', value, key: 'password'}),
    onSubmitForm: (email, password) =>
        dispatch({type: 'LOGIN', payload: agent.Auth.login(email, password)})
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome2);