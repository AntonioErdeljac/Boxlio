import React from "react";
import {Container, Content} from "native-base";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {  Text, Header, Form, Item, Input , Button, H1, H3, Icon, Label, Card, CardItem, Right, Left, Body, Title} from 'native-base';
import {
    Platform,
    StyleSheet,
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
    AsyncStorage,
    Keyboard,
    ListView
} from "react-native";
import {Grid, Row, Col} from "react-native-easy-grid";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import agent from "../../../agent";

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);
const FormAnimated = Animatable.createAnimatableComponent(Form);
const ActivityIndicatorAnimated = Animatable.createAnimatableComponent(ActivityIndicator);


class ItemPreview extends React.Component{

    constructor(props){
        super(props);

        this.goBack = this.goBack.bind(this);
        this.handleSearchQuery = this.handleSearchQuery.bind(this);
        this.handleAddToBasket = this.handleAddToBasket.bind(this);

        this.state = {
            search: ''
        }
    }

    handleAddToBasket() {
        this.props.addToBasket(this.props.navigation.state.params.item, 1, Math.random())
        this.props.navigation.navigate('catalog');
    }

    goBack() {
        this.props.navigation.navigate('catalog');
    };

    handleSearchQuery(text) {
        this.setState({
            search: text
        }, () => {
            this.props.onLoadByQuery(agent.Catalog.search(this.state.search));
        })
    };

    render(){
        return (
            <ContainerAnimatable ref="catalog" animation="fadeInDown" style={styles.container}>
                <TouchableOpacity onPress={this.goBack}>
                    <CardItem style={{justifyContent: 'center', alignItems: 'center'}}>

                        <Icon name='ios-arrow-round-back-outline' style={{color: 'rgba(0,0,0,.6)', fontSize: 30}} />
                        <Grid>
                            <Row>
                                <Text style={{color: 'rgba(0,0,0,.8)', fontFamily: 'VarelaRound-Regular', fontSize: 23,}}>Catalog</Text>
                            </Row>
                        </Grid>
                    </CardItem>
                </TouchableOpacity>
                    <Content>
                        <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                <Text>{this.props.navigation.state.params.item.name}</Text>
                                <Text note>{this.props.navigation.state.params.item.price}$</Text>
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={{uri: this.props.navigation.state.params.item.image}} style={styles.image}/>
                            </CardItem>
                            <CardItem style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={this.handleAddToBasket} style={styles.button}>
                                <Grid>
                                    <Row>
                                        <FAIcon name="shopping-basket" style={{color: '#fff', marginRight: 10, fontSize: 14}} />
                                        <Text style={styles.textButton}>Add to basket</Text>
                                    </Row>
                                </Grid>
                            </TouchableOpacity>
                            </CardItem>
                        </Card>
                    </Content>
            </ContainerAnimatable>
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
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1fcf7c',
        width: Dimensions.get('window').width-100,
    },
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
        height: 105,
        width: 105,
        borderRadius: 10,
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
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width-100,
        height: 50,
        shadowColor: 'rgba(255,255,255,1)',
        elevation: 3,
        shadowOffset: {height: 10, width: 10},
        shadowOpacity: 0.3,
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
    ...state.catalog,
});


const mapDispatchToProps = dispatch => ({
    addToBasket: (item, amount, uniqueID) =>
        dispatch({type: 'ADD_ITEM_TO_BASKET', item, amount, uniqueID}),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPreview);