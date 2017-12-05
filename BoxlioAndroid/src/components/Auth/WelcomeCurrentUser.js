import React from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import {Container} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import {StyleSheet} from "react-native";
import * as Animatable from "react-native-animatable";
import {Actions} from "react-native-router-flux";
const TouchableOpacityAnimated = Animatable.createAnimatableComponent(TouchableOpacity);
const ColAnimated = Animatable.createAnimatableComponent(Col);
const ContainerAnimated = Animatable.createAnimatableComponent(Container);
import {connect} from "react-redux";

class WelcomeCurrentUser extends React.Component {
	constructor(props){
		super(props);
		this.routeToMain = () => {
				this.refs.container.fadeOutDown(300);
				setTimeout(() => {
					Actions.main();
				}, 350)
			}
	}
	render(){
		const props = this.props;
		if(props.currentUser){
			
			return (
				<ContainerAnimated ref="container" style={styles.container}>
					<Grid>
						<Row size={2}>
							<Col style={{marginTop: 90}}>
								<Text  style={styles.userText}>Welcome, {props.currentUser.firstName}</Text>
							</Col>
						</Row>
						<Row size={2}>
							<Col style={{alignItems: 'center'}}>
							<View  style={styles.imageContainer}>
	                        	<Image source={{uri: props.currentUser.image}} style={styles.userImage}></Image>
							</View>
							</Col>
						</Row>
						<Row >
							<Col  style={{alignItems: 'center'}}>
								<TouchableOpacity onPress={() => this.routeToMain()} style={styles.loginButton}>
									<Text style={styles.loginButtonText}>Continue</Text>
								</TouchableOpacity>
							</Col>
						</Row>
					</Grid>
				</ContainerAnimated>
			);
		}
		return null;
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff'
	},
	userText: {
		fontFamily: 'VarelaRound-Regular',
		fontSize: 25,
		textAlign: 'center'
	},
	userImage: {
		flex: 1,
		justifyContent: 'center',
		resizeMode: 'cover', 
		height:150, 
		width: 150,
		borderRadius: 50,
	},
	imageContainer: {
		borderRadius: 50,
		height: 150,
		width: 150,
		borderWidth: 5,
		borderColor: '#1fcf7c',
		alignItems: 'center'
	},
    loginButton: {
        borderColor: 'transparent',
        backgroundColor: '#1fcf7c',
        marginTop: 10,
        height: 50,
        width: 300,
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
})

const mapStateToProps = state => ({
	currentUser: state.common.currentUser
});

export default connect(mapStateToProps, null)(WelcomeCurrentUser);