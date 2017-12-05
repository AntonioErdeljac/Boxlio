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
import agent from "../../../agent";
import {connect} from "react-redux";

const GridAnimated = Animatable.createAnimatableComponent(Grid);
const FormAnimated = Animatable.createAnimatableComponent(Form);
const ActivityIndicatorAnimated = Animatable.createAnimatableComponent(ActivityIndicator);


class Settings extends React.Component{
	constructor(props){
		super(props);

		this.state={
			username: '',
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			image: ''
		};

		this.submitForm = ev => {
			ev.preventDefault();

			let user = Object.assign({}, this.state);

			if(!user.password){
				delete user.password;
			}

			this.props.onSubmitForm(user);
		};

	}

	componentWillMount(){
		if(this.props.currentUser){
			Object.assign(this.state, {
				username: this.props.currentUser.username,
				firstName: this.props.currentUser.firstName,
				lastName: this.props.currentUser.lastName,
				email: this.props.currentUser.email,
				password: this.props.currentUser.password,
				image: this.props.currentUser.image || ''
			})
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.currentUser){
			this.setState(Object.assign({}, this.state, {
				firstName: nextProps.currentUser.firstName,
				lastName: nextProps.currentUser.lastName,
				username: nextProps.currentUser.username,
				email: nextProps.currentUser.email,
				password: nextProps.currentUser.password,
				image: nextProps.currentUser.image
			}))
		}
	}

	render(){
		return (
			<Container style={styles.container}>
				<Content>
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
                                            value={this.state.username}
                                            onChangeText={(text) => this.setState({username: text})} 
                                            block 
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Username" />
                                        </Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 10}}>
                                            <Input
                                            value={this.state.firstName}
                                            onChangeText={(text) => this.setState({firstName: text})}
                                            block
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="First Name" />    
                                        </Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 10}}>
                                            <Input
                                            value={this.state.lastName}
                                            onChangeText={(text) => this.setState({lastName: text})}
                                            block
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Last Name" />    
                                        </Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 10}}>
                                            <Input
                                            value={this.state.email}
                                            onChangeText={(text) => this.setState({email: text})}
                                            block
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Email" />    
                                        </Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 10}}>
                                            <Input
                                            value={this.state.password}
                                            onChangeText={(text) => this.setState({password: text})}
                                            secureTextEntry={true}
                                            block
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="New Password" />    
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
                                            <TouchableOpacity onPress={this.submitForm} style={this.props.isLoading ? styles.loginButtonDisabled : styles.loginButton}>
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
                    </Content>
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
	onClickLogout: () =>
		dispatch({type: 'LOGOUT'}),
	onSubmitForm: user =>	
		dispatch({type: 'SAVE_SETTINGS', payload: agent.Auth.update(user)})
})

const mapStateToProps = state => ({
	currentUser: state.common.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);