import React from "react";
import {Container, Content} from "native-base";
import {  Header, Form, Item, Input , Button, H1, H3, Label, Icon, Card, CardItem, Right, Left} from 'native-base';
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


class Options extends React.Component{
    constructor(props){
        super(props);

        this.goBack = () => {
            this.refs.options.fadeOutDown(300).then(() => {
                this.props.navigation.navigate('main')
            })
        }

        this.changeDeliveryMode = ev => {
            this.setState({deliveryMode: !this.state.deliveryMode});
            this.props.onChangeDeliveryMode(agent.Auth.update({deliveryMode: !this.state.deliveryMode}))
        }

        this.state = {
            deliveryMode: this.props.currentUser.deliveryMode
        }

        this.handleLogout = () => {
                this.props.onClickLogout()
                this.props.navigation.navigate('logout')
        }
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
                                <Text style={{color: 'rgba(0,0,0,.8)', fontFamily: 'VarelaRound-Regular', fontSize: 23,}}>Options</Text>
                            </Row>
                        </Grid>
                    </CardItem>
                </TouchableOpacity>
                <Content style={{marginTop: 30}}>
                    <Grid>
                        <Row>
                                <Image source={{uri: this.props.currentUser.image}} style={styles.image} />
                        </Row>
                        <Row>
                            <Col style={{alignItems: 'center'}}>
                                <H1 style={styles.name}>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</H1>
                            </Col>
                         </Row>
                        <Row>
                            <Col style={{alignItems: 'center'}}>
                                <H3 style={styles.username}>@{this.props.currentUser.username}</H3>
                            </Col>
                         </Row>
                        <Row style={{borderTopColor: 'rgba(0,0,0,.08)', borderTopWidth: 1, margin: 30, paddingTop: 30}}>
                            <Col style={{alignItems: 'center'}}>
                                <H3 style={styles.label}>Delivery Mode</H3>
                                <Switch
                                    onValueChange={this.changeDeliveryMode}
                                    value={this.state.deliveryMode}
                                />
                            </Col>
                        </Row>

                    </Grid>
                    <Card style={{elevation: 0, borderColor: 'transparent'}}>


                        <TouchableOpacity onPress={() => this.props.navigation.navigate('settings')}>
                            <CardItem>
                                <Icon active name="ios-options-outline" />
                                <Text style={{fontFamily: 'VarelaRound-Regular'}}>Settings</Text>
                                <Right>
                                    <Icon name="ios-arrow-forward-outline" />
                                </Right>
                            </CardItem>
                        </TouchableOpacity>

                            <TouchableOpacity onPress={this.handleLogout}>
                        <CardItem>
                                <Icon style={{color: '#E7475E'}} active name="ios-log-out-outline" />
                                <Text style={{color: '#E7475E', fontFamily: 'VarelaRound-Regular'}}>Logout</Text>
                                <Right>
                                    <Icon style={{color: '#E7475E'}} name="ios-arrow-forward-outline" />
                                </Right>
                        </CardItem>
                        
                            </TouchableOpacity>
                    </Card>
                </Content>
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
        height: 90, 
        width: 90,
        borderRadius: 90,
        elevation: 3,
        shadowColor: '#000'
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        height: 90, 
        width: 90,
        borderRadius: 90,
  },
	label: {
		color: 'rgba(0,0,0,.6)',
		fontFamily: 'VarelaRound-Regular',
		fontSize: 17,
        marginBottom: 10
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
    currentUser: state.common.currentUser
})


const mapDispatchToProps = dispatch => ({
    onClickLogout: () =>
        dispatch({type: 'LOGOUT'}),
    onChangeDeliveryMode: (payload) =>
        dispatch({type: 'CHANGE_DELIVERY_MODE', payload})
})

export default connect(mapStateToProps, mapDispatchToProps)(Options);