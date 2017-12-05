import React from "react";
import {Container, Content} from "native-base";
import {  Header, Form, Item, Input , Button, H1, H3, Label, Icon,} from 'native-base';
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
    AsyncStorage} from "react-native";
import {Grid, Row, Col} from "react-native-easy-grid";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";

const GridAnimated = Animatable.createAnimatableComponent(Grid);
const FormAnimated = Animatable.createAnimatableComponent(Form);
const ActivityIndicatorAnimated = Animatable.createAnimatableComponent(ActivityIndicator);


class Settings extends React.Component{
	render(){
		return (
			<Container style={styles.container}>
                    <GridAnimated  animation="fadeInUp">
                        <Row>
                            <Col>
	                            <View style={{justifyContent: 'space-around'}}>
	                                <Animatable.Text ref="text" style={styles.headerText}>Your Settings</Animatable.Text>
	                            </View>
                            </Col>
                        </Row>
                        <Row size={3}>
                            <Col size={1}>
                                <Container style={{marginRight: 10}}>
                                    <FormAnimated ref="grid">
                                        <Item style={{borderColor: 'transparent', marginBottom: 10, marginTop: 10}}>
                                            
                                            <Input 
                                            block 
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Username" />
                                        </Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 10}}>
                                            <Input
                                            secureTextEntry={true}
                                            block
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="First Name" />    
                                        </Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 10}}>
                                            <Input
                                            secureTextEntry={true}
                                            block
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Last Name" />    
                                        </Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 10}}>
                                            <Input
                                            secureTextEntry={true}
                                            block
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Password" />    
                                        </Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 10}}>
                                            <Input
                                            secureTextEntry={true}
                                            block
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Image" />    
                                        </Item>
                                            <TouchableOpacity style={this.props.isLoading ? styles.loginButtonDisabled : styles.loginButton}>
                                            <Text style={styles.loginButtonText}>Save</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.onClickLogout()} style={this.props.isLoading ? styles.loginButtonDisabled : styles.logoutButton}>
                                            <Text style={styles.logoutButtonText}>Logout</Text>
                                            </TouchableOpacity>
                                    </FormAnimated>
                                </Container>
                            </Col>
                        </Row>
                    </GridAnimated>
                </Container>
		);
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
        borderRadius: 30,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 20,
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
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'VarelaRound-Regular'
    }

});

const mapDispatchToProps = dispatch => ({
	onClickLogout: () =>
		dispatch({type: 'LOGOUT'})
})

export default connect(null, mapDispatchToProps)(Settings);