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
import agent from "../../../agent";

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);
const FormAnimated = Animatable.createAnimatableComponent(Form);
const ActivityIndicatorAnimated = Animatable.createAnimatableComponent(ActivityIndicator);


class Messages extends React.Component{

    componentWillMount(){
        this.props.onLoad(agent.Clients.all())
    }

    constructor(props){
        super(props);

        this.goBack = () => {
            this.refs.options.fadeOutDown(300).then(() => {
                this.props.navigation.navigate('main')
            })
        };

        this.handleLogout = () => {
            this.props.onClickLogout();
            this.props.navigation.navigate('logout')
        };
    }

    render(){
        if(this.props.currentUser){
            return (
                <ContainerAnimatable ref="options" animation="fadeInDown" style={styles.container}>
                    <TouchableOpacity onPress={this.goBack}>
                        <CardItem style={{justifyContent: 'center', alignItems: 'center'}}>

                            <Icon name='ios-arrow-round-back-outline' style={{color: 'rgba(0,0,0,.6)', fontSize: 30}} />
                            <Grid>
                                <Row>
                                    <Text style={{color: 'rgba(0,0,0,.8)', fontFamily: 'VarelaRound-Regular', fontSize: 23,}}>Messages</Text>
                                </Row>
                            </Grid>
                        </CardItem>
                    </TouchableOpacity>
                    {this.props.clients ?
                        <Content>
                            <Card style={{elevation: 0, borderColor: 'transparent'}}>
                                {this.props.clients.map(client => {
                                    return (
                                        <CardItem key={client._id}>
                                            <View style={styles.imageContainer}>
                                                <Image borderRadius={65} source={{uri: client.image}} style={styles.image} />
                                            </View>
                                            <Grid style={{marginLeft: 13}}>
                                                <Row>
                                            <Text style={{fontFamily: 'VarelaRound-Regular', color: 'rgba(0,0,0,.8)'}}>{client.firstName} {client.lastName}</Text>
                                                </Row>
                                                <Row>
                                                    <Text style={{fontFamily: 'VarelaRound-Regular', color: 'rgba(0,0,0,.4)'}}>Hej jesi li...</Text>
                                                </Row>
                                            </Grid>
                                            <Right>
                                                <Text style={{fontFamily: 'VarelaRound-Regular', color: 'rgba(0,0,0,.2)'}}>12:33</Text>
                                            </Right>
                                        </CardItem>
                                    )
                                })}
                            </Card>
                        </Content>
                     : null}
                </ContainerAnimatable>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
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
        height: 45,
        width: 45,
        borderRadius: 100,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        height: 45,
        width: 45,
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
    ...state.messages
})


const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: 'MESSAGES_PAGE_LOADED', payload})
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages);