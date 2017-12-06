import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text,  } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput} from "react-native";
import * as Animatable from "react-native-animatable";


class SearchPlacesTo extends React.Component{
	render(){
		return (
			<Animatable.View animation="fadeInUp" delay={300} style={styles.searchTo}>
            <Grid style={{justifyContent: 'space-around', alignItems: 'center'}}>
              <Col size={1}>
                <Icon theme={{iconFamily: 'FontAwesome'}} style={styles.iconTo} name="dot-circle-o" />
              </Col>
              <Col size={2}>
              	<View style={{justifyContent: 'space-around', alignItems: 'center'}}>
               <TextInput style={styles.input} placeholderTextColor="gray"  placeholder="Deliver from where?"/>
               </View>
              </Col>
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
  searchTo: {
    zIndex: 1000,
    height: 45 ,
    width: Dimensions.get('window').width-30,
    padding: 25,
    borderRadius: 3,
    elevation: 3,
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

export default SearchPlacesTo;