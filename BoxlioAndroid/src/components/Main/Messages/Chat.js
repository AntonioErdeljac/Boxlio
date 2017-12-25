import React from "react";
import {Container, Content} from "native-base";
import {  Header, Form, Item, Input , Button, H1, H3, Label, Icon, Card, CardItem, Right, Left, Body, Title} from 'native-base';
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
    AsyncStorage} from "react-native";
import {Grid, Row, Col} from "react-native-easy-grid";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import MessagePreview from './MessagePreview';
import agent from "../../../agent";

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);
const FormAnimated = Animatable.createAnimatableComponent(Form);
const ActivityIndicatorAnimated = Animatable.createAnimatableComponent(ActivityIndicator);


class Chat extends React.Component{
    componentWillMount(){
        let name = this.props.currentUser.deliveryMode ? this.props.currentUser.username+'_and_'+this.props.navigation.state.params.client.username : this.props.navigation.state.params.client.username+'_and_'+this.props.currentUser.username;
        this.props.onLoad(Promise.all([
            agent.Chat.byName(name),
            agent.Chat.messagesByName(name)
        ]))
    }

    render(){
        if(this.props.currentUser){
            return (
                <ContainerAnimatable ref="options" animation="fadeInDown" style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('messages')}>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center'}}>

                            <Icon name='ios-arrow-round-back-outline' style={{color: 'rgba(0,0,0,.6)', fontSize: 30}} />
                            <Grid>
                                <Row>
                                    <Text style={{color: 'rgba(0,0,0,.8)', fontFamily: 'VarelaRound-Regular', fontSize: 23,}}>{this.props.navigation.state.params.client.firstName} {this.props.navigation.state.params.client.lastName}</Text>
                                </Row>
                            </Grid>
                        </CardItem>
                    </TouchableOpacity>
                    <Container>
                    <ScrollView
                        ref="scrollView"
                        onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}
                        style={{margin: 10, marginBottom: 100,}}>
                        {(this.props.messages || []).map(message => {
                            return (
                                <Grid key={Math.random()}>
                                    <Row>
                                        <View style={message.author.username !== this.props.currentUser.username ? {backgroundColor: '#1fcf7c', margin: 10, borderRadius: 10, padding: 10} : {backgroundColor: 'rgba(0,0,0,.07)', margin: 10, borderRadius: 10, padding: 10}} >
                                            <Text style={message.author.username !== this.props.currentUser.username ? {fontFamily: 'VarelaRound-Regular', color: '#fff'} : {fontFamily: 'VarelaRound-Regular', color: 'rgba(0,0,0,.5)'}}>{message.body}</Text>
                                        </View>
                                    </Row>
                                </Grid>
                            )
                        })}
                    </ScrollView>
                    </Container>
                    <CardItem style={{position: 'absolute', bottom: 10, borderTopColor: 'rgba(0,0,0,.1)', borderTopWidth: 1}}>
                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            style={styles.input}
                            placeholderTextColor="gray"
                            placeholder="Write a message"/>

                        <Icon name='ios-paper-plane-outline' style={{color: 'rgba(0,0,0,.6)', fontSize: 30}} />
                    </CardItem>
                </ContainerAnimatable>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({

    input: {
        width: Dimensions.get('window').width-70,
        marginRight: 10,
        backgroundColor: 'transparent',
        fontSize: 14,
        fontFamily: 'VarelaRound-Regular',
        color: 'rgba(0,0,0,.5)',

    },
    username: {
        justifyContent: 'center',
        fontFamily: 'VarelaRound-Regular',
        color: 'rgba(0,0,0,.3)',
        marginTop: 10
    },
    name: {
        justifyContent: 'center',
        fontFamily: 'VarelaRound-Regular',
        color: 'rgba(0,0,0,.6)',
        marginTop: 10
    },
    imageContainer: {
        height: 25,
        width: 25,
        borderRadius: 100,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        height: 25,
        width: 25,
        borderRadius: 100,
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
    buttonText: {
        color: '#1fcf7c',
        textAlign: 'center',
        fontFamily: 'VarelaRound-Regular'
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

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    ...state.messages,
    ...state.chat
})


const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: 'CHAT_PAGE_LOADED', payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);