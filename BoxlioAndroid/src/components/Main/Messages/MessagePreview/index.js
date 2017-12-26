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
    AsyncStorage} from "react-native"
import {Grid, Row, Col} from "react-native-easy-grid";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import agent from "../../../../agent";

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);
const FormAnimated = Animatable.createAnimatableComponent(Form);
const ActivityIndicatorAnimated = Animatable.createAnimatableComponent(ActivityIndicator);

class MessagePreview extends React.Component{
    componentWillMount(){
        const name = this.props.currentUser.username+'_and_'+this.props.client.username;

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${this.props.currentUser.token}`);

        fetch(`https://373fc370.ngrok.io/api/chatrooms/${name}/lastmessage`, {headers: myHeaders})
            .then(results => {
                return results.json()
            }).then(data => handleData(data))

        const handleData = data => {
            function timeformat(date) {
                let h = date.getHours();
                let m = date.getMinutes();
                let x = h >= 12 ? 'pm' : 'am';
                h = h % 12;
                h = h ? h : 12;
                m = m < 10 ? '0'+m: m;
                let mytime = h + ':' + m + ' ' + x;
                return mytime;
            }
            const date = new Date(data.message.createdAt);
            let finalDate = timeformat(date);
            this.setState({
                lastMessage: data.message.body,
                lastMessageDate: finalDate
            })
        }
    }

    constructor(props){
        super(props);

        this.state = {
            lastMessage: null,
            lastMessageDate: null
        }
    }

    render(){
        const {client} = this.props;
        return (

            <TouchableOpacity onPress={() => this.props.navigation.navigate('chat', {client: this.props.client})} style={{justifyContent: 'center', alignItems: 'center'}}>
            <CardItem key={client._id}>
                <Grid style={{marginLeft: 13}}>
                    <Row>
                        <Text style={{fontFamily: 'VarelaRound-Regular', color: 'rgba(0,0,0,.8)'}}>{client.firstName} {client.lastName}</Text>
                    </Row>
                    <Row>
                        <Text numberOfLines={1} style={{fontFamily: 'VarelaRound-Regular', color: 'rgba(0,0,0,.4)'}}>{this.state.lastMessage}</Text>
                    </Row>
                </Grid>
                <Right>
                    <Text style={{fontFamily: 'VarelaRound-Regular', color: 'rgba(0,0,0,.2)'}}>{this.state.lastMessageDate}</Text>
                </Right>
            </CardItem>
            <View style={{width: Dimensions.get('window').width-30, height: 1, backgroundColor: 'rgba(0,0,0,.08)', justifyContent: 'space-around', alignItems: 'center'}}></View>
            </TouchableOpacity>
        )
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
});

const mapDispatchToProps = dispatch => ({
    onLoad: name =>
        dispatch({type: 'MESSAGE_PREVIEW_PAGE_LOADED', payload: agent.Clients.clientMessage(name)})
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagePreview);