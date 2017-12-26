import React from "react";
import {Container, Content} from "native-base";
import {  Header, Form, Item, Input , Button, H1, H3, Label, Card, CardItem, Right, Left, Body, Title} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    Switch,
    Dimensions,
    AsyncStorage, Keyboard
} from "react-native";
import {Grid, Row, Col} from "react-native-easy-grid";
import agent from "../../../agent";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
const ButtonAnimatable = Animatable.createAnimatableComponent(TouchableOpacity);

class ClientCard extends React.Component{
    constructor(props){
        super(props);

        this.handleAddFriend = (client) => {
            this.props.onAddFriend(agent.Profile.add(client))
            this.props.navigation.navigate('messages')
        }
    }
    render(){
        return (
            <Card style={{borderRadius: 10, elevation:1, width: Dimensions.get('window').width - 50}}>
                <CardItem style={{alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
                    <Grid style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Row>
                    <View style={styles.imageContainer}>
                        <Image borderRadius={65} source={{uri: this.props.client.obj.image}} style={styles.image} />
                    </View>
                        </Row>
                        <Row>
                    <Text style={styles.name}>{this.props.client.obj.firstName} {this.props.client.obj.lastName}</Text>
                        </Row>
                        <Row>
                            <Text style={styles.username}>@{this.props.client.obj.username}</Text>
                        </Row>
                        <Row>
                            <View style={{height: 1, marginTop: 10, marginBottom: 10,width:Dimensions.get('window').width-150, backgroundColor: 'rgba(0,0,0,.06)'}}></View>
                        </Row>
                        <Row style={{marginTop: 10, marginBottom: 10}}>
                            <Icon name="dot-circle-o" style={{color: '#1fcf7c', fontSize: 16}}/>
                            <Text style={styles.distanceText}>{Math.floor(this.props.client.dis)} meters away</Text>
                        </Row>
                        <Row>
                            <ButtonAnimatable ref="addbutton" animation="bounceIn" onPress={() => this.handleAddFriend(this.props.client.obj)} style={{backgroundColor: '#1fcf7c', padding: 10, borderRadius: 10}}>
                                <Text style={styles.buttonText}>Add friend</Text>
                            </ButtonAnimatable>
                        </Row>
                    </Grid>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: Dimensions.get('window').width-100,
        backgroundColor: 'transparent',
        fontSize: 14,
        fontFamily: 'VarelaRound-Regular',
        color: 'rgba(0,0,0,.5)',

    },
    username: {
        justifyContent: 'center',
        fontFamily: 'VarelaRound-Regular',
        fontSize: 13,
        color: 'rgba(0,0,0,.3)',
        marginTop: 10
    },
    distanceText: {
        justifyContent: 'center',
        fontFamily: 'VarelaRound-Regular',
        fontSize: 13,
        color: 'rgba(0,0,0,.5)',
        marginBottom: 10,
        marginLeft: 15,
    },
    buttonText: {
        justifyContent: 'center',
        fontFamily: 'VarelaRound-Regular',
        fontSize: 13,
        color: '#fff',
    },
    name: {
        justifyContent: 'center',
        fontFamily: 'VarelaRound-Regular',
        color: 'rgba(0,0,0,.6)',
        marginTop: 10
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        height: 45,
        width: 45,
        borderRadius: 100,
    },
    imageContainer: {
        elevation: 1,
        height: 45,
        width: 45,
        borderRadius: 100,
        overflow: 'hidden',
    },
    label: {
        color: 'rgba(0,0,0,.5)',
        fontFamily: 'VarelaRound-Regular',
        marginLeft: 10
    },
    container: {
        backgroundColor: '#fff',
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
    Input: {
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,.4)',
        borderWidth: 0.3,
        paddingLeft: 20,
        fontSize: 15,
        color: 'rgba(0,0,0,.4)',
        borderRadius: 6,
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
        borderRadius: 6,
    },
    logoutButton: {
        borderColor: 'transparent',
        backgroundColor: '#E7475E',
        marginTop: 10,
        marginLeft: 10,
        shadowColor: 'rgba(255,255,255,1)',
        elevation: 3,
        shadowOffset: {height: 10, width: 10},
        shadowOpacity: 0.3,
        padding: 10,
        borderRadius: 6,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'VarelaRound-Regular'
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

const mapDispatchToProps = dispatch => ({
    onAddFriend: payload =>
        dispatch({type: 'ADD_FRIEND', payload}),
    onResetRedirect: () =>
        dispatch({type: 'RESET_REDIRECT'})
});


export default connect(null, mapDispatchToProps)(ClientCard);