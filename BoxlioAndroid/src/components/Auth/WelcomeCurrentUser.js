import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {Container} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import {StyleSheet} from "react-native";
import * as Animatable from "react-native-animatable";
const TouchableOpacityAnimated = Animatable.createAnimatableComponent(TouchableOpacity);
import {connect} from "react-redux";

const WelcomeCurrentUser = props => {
	if(props.currentUser){
		return (
			<Container style={styles.container}>
				<Grid>
					<Row size={2}>
						<Col style={{marginTop: 90}}>
							<Animatable.Text animation="fadeInDown" style={styles.userText}>Welcome, {props.currentUser.firstName}</Animatable.Text>
						</Col>
					</Row>
					<Row size={2}>
						<Col style={{alignItems: 'center'}}>
						<Animatable.View animation="fadeInDown" style={styles.imageContainer}>
                        	<Animatable.Image source={{uri: props.currentUser.image}} style={styles.userImage}></Animatable.Image>
						</Animatable.View>
						</Col>
					</Row>
					<Row >
						<Col style={{alignItems: 'center'}}>
							<TouchableOpacityAnimated animation="fadeInDown" style={styles.loginButton}>
								<Text style={styles.loginButtonText}>Continue</Text>
							</TouchableOpacityAnimated>
						</Col>
					</Row>
				</Grid>
			</Container>
		);
	}
	return null;
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
		shadowColor: '#000',
        elevation: 3,
        shadowOffset: {height: 2, width: 2},
        shadowOpacity: 0.2,
        shadowRadius: 11,
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
})

export default connect(mapStateToProps, null)(WelcomeCurrentUser);