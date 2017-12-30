import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text,  } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput, Keyboard} from "react-native";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";


class ReceiveRequestHandler extends React.Component{
	render(){
		return (
			<Animatable.View animation="bounceIn" delay={300} style={styles.searchTo}>
            <Grid style={{justifyContent: 'space-around', alignItems: 'center'}}>
                <Row>
                    <Col>
                        <Icon theme={{iconFamily: 'FontAwesome'}} style={styles.iconTo} name="dot-circle-o" />
                    </Col>
                    <Col size={3}>
                        <View style={{justifyContent: 'space-around', alignItems: 'center'}}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="gray"
                            onSubmitEditing={Keyboard.dismiss}
                            placeholder="Deliver to where?"/>
                        </View>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Icon theme={{iconFamily: 'FontAwesome'}} style={styles.iconTo} name="dot-circle-o" />
                    </Col>
                    <Col size={3}>
                        <View style={{justifyContent: 'space-around', alignItems: 'center'}}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="gray"
                            onSubmitEditing={Keyboard.dismiss}
                            placeholder="Deliver to where?"/>
                        </View>
                    </Col>
                </Row>
            </Grid>
          </Animatable.View>
		);
    }
}

const styles = StyleSheet.create({
	input: {
		width: Dimensions.get('window').width-100,
		marginRight: 30,
		backgroundColor: 'transparent',
    fontSize: 14,
    fontFamily: 'VarelaRound-Regular',
    color: 'rgba(0,0,0,.5)',
    zIndex: 1001,
    height: 90

	},
	iconTo:{
		color: '#1fcf7c',
		fontSize: 15
	},
  searchTo: {
      zIndex: 1000,
      height: 200 ,
      width: Dimensions.get('window').width-30,
      padding: 25,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      borderBottomRightRadius: 3,
      borderBottomLeftRadius: 3,
      elevation: 1,
      shadowOpacity: 0.1,
      alignItems: 'center',
      justifyContent: 'space-around',
      shadowColor: '#000',
      position: 'absolute',
      bottom: 30,
      backgroundColor: '#fff'
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const mapDispatchToProps = dispatch => ({
    onSetTo: data =>
        dispatch({type: 'SET_TO', data}),
    setToName: text =>
        dispatch({type: 'SET_TO_NAME', text})
});

const mapStateToProps = state => ({
  ...state.common,
  ...state.destinationView,
    requestSent: state.requests.requestSent
});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveRequestHandler);