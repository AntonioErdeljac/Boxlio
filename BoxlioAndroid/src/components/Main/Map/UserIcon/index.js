import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text,   } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput, Image, TouchableOpacity} from "react-native";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";


class UserIcon extends React.Component{
	render(){
    if(this.props.currentUser){
		return (
      <TouchableOpacity onPress={() => this.refs.user.bounceOut(300).then(() => Actions.options())} style={styles.TouchableOpacityComponent}>
  			<Animatable.View ref="user" animation="bounceIn" delay={300} style={styles.searchTo}>
              <Grid>
                <Col>
                  <View style={styles.imageContainer}>
                  <Image source={{uri: this.props.currentUser.image}} style={styles.image} />
                  </View>
                </Col>
              </Grid>
         </Animatable.View>
       </TouchableOpacity>
		);
  }
  return null;
	}
}

const styles = StyleSheet.create({

  imageContainer: {
    borderRadius: 70,
    height: 70,
    width: 70,
    backgroundColor: '#fff',
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    resizeMode: 'contain', 
    height: 60, 
    width: 60,
    borderRadius: 60,
  },
	input: {
		width: Dimensions.get('window').width-100,
		marginRight: 30,
		backgroundColor: 'transparent',
    fontSize: 20,
    fontFamily: 'VarelaRound-Regular',
    color: 'rgba(0,0,0,.5)',
    zIndex: 1001,
    height: 90

	},
	iconTo:{
		color: '#2d89e5',
		fontSize: 15
	},
  TouchableOpacityComponent:{
    zIndex: 1000,
    height: 70 ,
    width: 70,
    borderRadius: 70,
    alignItems: 'center',
    position: 'absolute',
    top: 10
  },
  searchTo: {
    zIndex: 1000,
    height: 70 ,
    width: 70,
    borderColor: '#fff',
    elevation: 3,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    backgroundColor: '#fff',
    position: 'absolute'
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

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
})

export default connect(mapStateToProps, null)(UserIcon);