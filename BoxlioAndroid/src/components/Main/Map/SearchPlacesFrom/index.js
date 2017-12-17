import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text,  } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput, TouchableWithoutFeedback, Keyboard} from "react-native";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";


class SearchPlacesFrom extends React.Component{
    componentWillReceiveProps(nextProps){
        if(nextProps.requestSent){
            this.refs.searchplacesfrom.fadeOutDown(300);
        }
    }
	render(){
        if(!this.props.closeFromInput){
		return (
			<Animatable.View animation="bounceIn" ref="searchplacesfrom" style={styles.searchTo}>
            <Grid style={{justifyContent: 'space-around', alignItems: 'center'}}>
              <Col>
                <Icon theme={{iconFamily: 'FontAwesome'}} style={styles.iconTo} name="dot-circle-o" />
              </Col>
              <Col size={3}>
              	<View style={{justifyContent: 'space-around', alignItems: 'center'}}>
               <TextInput
                   value={this.props.from}
                   onChangeText={(text) => this.props.setFrom(text)}
                   style={styles.input}
                   placeholderTextColor="gray"
                   onSubmitEditing={Keyboard.dismiss}
                   placeholder="Deliver from where?"/>
               </View>
              </Col>
            </Grid>
          </Animatable.View>
		);
        }return null;
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
        height: 200
	},
	iconTo:{
		color: '#2d89e5',
		fontSize: 15
	},
  searchTo: {
    zIndex: 1000,
    height: 45 ,
    width: Dimensions.get('window').width-30,
    padding: 25,
    borderTopLeftRadius: 3,
    borderTopRightRadius:3,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    elevation: 1,
    shadowOpacity: 0.1,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    position: 'absolute',
    top: 90,
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
  setFrom: text =>
    dispatch({type: 'SET_FROM_NAME', text}),
  onSetFocused: () =>
    dispatch({type: 'FOCUSED_ON_INPUT'})
});

const mapStateToProps = state => ({
  ...state.destinationView,
    requestSent: state.requests.requestSent
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlacesFrom);