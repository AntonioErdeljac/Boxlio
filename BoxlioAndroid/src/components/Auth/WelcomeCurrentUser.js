import React from "react";
import {Text, View} from "react-native";
import {Container} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";
import {StyleSheet} from "react-native";
import * as Animatable from "react-native-animatable";
const WelcomeCurrentUser = props => {
	if(props.currentUser){
		return (
			<Container>
				<Grid>
					<Row>
						<Col>
							<Animatable.Text animation="fadeInDown" style={styles.userText}>Welcome, {props.currentUser.firstName}</Animatable.Text>
						</Col>
					</Row>
					<Row>
						<Col style={{alignItems: 'center'}}>
						<Animatable.View animation="fadeInDown" style={styles.imageContainer}>
                        	<Animatable.Image source={{uri: props.currentUser.image}} style={styles.userImage}></Animatable.Image>
						</Animatable.View>
						</Col>
					</Row>
				</Grid>
			</Container>
		);
	}
	return null;
}

const styles = StyleSheet.create({
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
	}
})

export default WelcomeCurrentUser;