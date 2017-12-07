import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text, Right, Left, Icon  } from 'native-base';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput} from "react-native";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import RNGooglePlaces from "react-native-google-places";

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);
const CardItemAnimatable = Animatable.createAnimatableComponent(CardItem);



class LocationChooser extends React.Component{
  componentWillReceiveProps(nextProps){
    if(nextProps.from){
      RNGooglePlaces.getAutocompletePredictions(nextProps.from, {
        radius: 0.1
      })
      .then((results) => this.setState({predictions: results}))
    }
  }
  constructor(props){
    super(props);

    this.state = {
      predictions: null
    }

    
  }
	render(){
    if(this.props.from && this.state.predictions && this.state.predictions.length > 0){
		return (
			<ContainerAnimatable animation="fadeInUp" style={styles.searchTo}>
            <Content>
                <Card style={styles.card}>
                  {this.state.predictions.map((prediction) => {
                    return(
                          <CardItem key={prediction.placeID}>
                              <Icon active name="ios-navigate-outline" />
                              <Text style={{fontFamily: 'VarelaRound-Regular', fontSize: 15, color: 'rgba(0,0,0,.5)'}}>{prediction.fullText}</Text>
                          </CardItem>
                        )
                        })}
                    </Card>
            </Content>
      </ContainerAnimatable>
		);
    }
    return null;
	}
}

const styles = StyleSheet.create({
  card:{
    width: Dimensions.get('window').width-50,
    alignItems: 'flex-start',
    elevation: 0
  },
	input: {
		width: Dimensions.get('window').width-100,
		marginRight: 30,
		backgroundColor: 'transparent',
    fontSize: 20,
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
    height: Dimensions.get('window').height-200 ,
    width: Dimensions.get('window').width-30,
    borderRadius: 10,
    elevation: 2,
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

const mapStateToProps = state => ({
  ...state.destinationView
});

export default connect(mapStateToProps, null)(LocationChooser);