import React from "react";
import {Row} from "react-native-easy-grid";
import {Text, View, StyleSheet} from "react-native";
import {Container} from "native-base"
import * as Animatable from "react-native-animatable";

class ErrorsList extends React.Component {
	render(){
		const {props} = this.props;
		if(this.props.errors){
			return (
				<Animatable.View animation="bounceIn" style={{
				alignItems: 'center'}}>
			    <View style={styles.errorContainer}>
			    	{
			    		Object.keys(this.props.errors).map(key => {
			    			return (
			    				<Text style={styles.errorText} key={key}>{key[0].toUpperCase()+key.slice(1)} {this.props.errors[key]}</Text>
			    			)
			    		})
			    	}
			    </View>
			    </Animatable.View>
			)
		}
		return null;
	}
}

const styles = StyleSheet.create({
	errorText: {
		marginLeft: 15,
		color: 'red',
		textAlign: 'center',
		color: '#fff'
	},
	errorContainer: {
		backgroundColor: 'rgba(239,72,54,.5)',
		width: 340,
		justifyContent: 'center',
		borderRadius: 6,
		padding: 5
	}
})

export default ErrorsList;