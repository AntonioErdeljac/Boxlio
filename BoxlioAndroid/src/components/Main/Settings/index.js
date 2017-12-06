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
    Switch,
    Dimensions,
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
			image: '',
			deliveryMode: false
		};

		this.screenHeight = Dimensions.get('window').height;
		this.sceenWidth = Dimensions.get('window').width;

		this.changeDeliveryMode = ev => {
			this.setState({deliveryMode: !this.state.deliveryMode});
		}

		this.submitForm = ev => {
			ev.preventDefault();

			let user = Object.assign({}, this.state);

			if(!user.password){
				delete user.password;
			}

			this.refs.grid.fadeOutDown(300).then(() => {

				this.props.onSubmitForm(user);
			})
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
				image: this.props.currentUser.image || '',
				deliveryMode: this.props.currentUser.deliveryMode
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
				image: nextProps.currentUser.image || '',
				deliveryMode: nextProps.currentUser.deliveryMode
			}))
		}
	}

	render(){
		return (
			<Content style={{backgroundColor: '#fff'}}>
				<ScrollView>
                    <GridAnimated  style={{paddingBottom: 100, alignItems: 'center', justifyContent: 'space-around'}}   animation="fadeInUp">
                        <Row>
                            <Col>
	                            <View style={{justifyContent: 'space-around'}}>
	                                <Animatable.Text ref="text" style={styles.headerText}>Account Settings</Animatable.Text>
	                            </View>
                            </Col>
                        </Row>
                        <Row>
                        	<Col>
                        		<View style={{justifyContent: 'space-around', marginRight: 15}}>
                                    <FormAnimated ref="grid" style={{justifyContent: 'space-around'}}>
                                    	<Item style={{borderColor: 'transparent', marginBottom: 5, marginTop: 10, justifyContent: 'center'}}>
                                    		<Text style={styles.label}>Delivery Mode</Text>
                                    	</Item>
                                    	<Item style={{borderColor: 'transparent', marginBottom: 5, marginTop: 10, justifyContent: 'center'}}>
                                    		<Switch
                                    			onValueChange={this.changeDeliveryMode}
                                    			value={this.state.deliveryMode}
                                    		 />
                                    	</Item>
                                    	<Item style={{borderColor: 'transparent', marginBottom: 5, marginTop: 10}}>
                                    		<Text style={styles.label}>Username</Text>
                                    	</Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 15, marginTop: 10}}>
                                            <Input
                                            value={this.state.username}
                                            onChangeText={(text) => this.setState({username: text})} 
                                            block 
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Username" />
                                        </Item>
                                    	<Item style={{borderColor: 'transparent', marginBottom: 5, marginTop: 10}}>
                                    		<Text style={styles.label}>First Name</Text>
                                    	</Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 15}}>
                                            <Input
                                            value={this.state.firstName}
                                            onChangeText={(text) => this.setState({firstName: text})}
                                            block
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="First Name" />    
                                        </Item>
                                    	<Item style={{borderColor: 'transparent', marginBottom: 5, marginTop: 10}}>
                                    		<Text style={styles.label}>Last Name</Text>
                                    	</Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 15}}>
                                            <Input
                                            value={this.state.lastName}
                                            onChangeText={(text) => this.setState({lastName: text})}
                                            block
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Last Name" />    
                                        </Item>
                                    	<Item style={{borderColor: 'transparent', marginBottom: 5, marginTop: 10}}>
                                    		<Text style={styles.label}>Email</Text>
                                    	</Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 15}}>
                                            <Input
                                            value={this.state.email}
                                            onChangeText={(text) => this.setState({email: text})}
                                            block
                                            placeholderTextColor="gray" 
                                            style={styles.Input} 
                                            underlineColorAndroid='transparent'
                                            placeholder="Email" />    
                                        </Item>
                                    	<Item style={{borderColor: 'transparent', marginBottom: 5, marginTop: 10}}>
                                    		<Text style={styles.label}>New password</Text>
                                    	</Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 15}}>
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
                                    	<Item style={{borderColor: 'transparent', marginBottom: 5, marginTop: 10}}>
                                    		<Text style={styles.label}>Profile Image</Text>
                                    	</Item>
                                        <Item style={{borderColor: 'transparent', marginBottom: 15}}>
                                            <Input
                                            block
                                            placeholderTextColor="gray" 
                                            style={styles.Input}
                                            onChangeText={(text) => this.setState({image: text})} 
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
                                    </View>
                                </Col>
                        </Row>
                    </GridAnimated>
                </ScrollView>
                </Content>
		);
	}
}

const styles = StyleSheet.create({
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