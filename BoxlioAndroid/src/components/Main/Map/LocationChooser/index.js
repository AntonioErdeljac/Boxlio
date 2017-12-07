import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text, Right, Left, Icon  } from 'native-base';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput, TouchableOpacity} from "react-native";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import RNGooglePlaces from "react-native-google-places";
import {Places} from 'google-places-web';
Places.apiKey = 'AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ';

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);
const CardItemAnimatable = Animatable.createAnimatableComponent(CardItem);
const CardAnimatable = Animatable.createAnimatableComponent(Card);



class LocationChooser extends React.Component{

  componentWillReceiveProps(nextProps){
    if(nextProps.from){
        RNGooglePlaces.getAutocompletePredictions(nextProps.from)
      .then((results) => this.setState({predictions: results}))
          .catch((error) => {throw error})
    }

    if(nextProps.placeFromChoosen){
      this.setState({
          predictions: null
      })
    }
  }

  constructor(props){
    super(props);

    this.state = {
      predictions: null
    };

    this.handleSetFrom = (prediction) => {
      this.refs.locationchooser.fadeOutDown().then(() => {
        RNGooglePlaces.lookUpPlaceByID(prediction.placeID)
            .then((place) => this.props.setFrom(place))
      })
    };
    
  }

	render(){
    if(!this.props.placeFromChoosen && this.props.from && this.state.predictions && this.state.predictions.length > 0){
  		return (
  			<ContainerAnimatable ref="locationchooser" style={styles.searchTo}>
              <Content keyboardShouldPersistTaps="handled">
                  <CardAnimatable ref="cardanimatable" style={styles.card}>
                    {(this.state.predictions || []).map((prediction) => {
                      return(
                          <TouchableOpacity key={prediction.placeID} onPress={() => this.handleSetFrom(prediction)}>
                            <CardItemAnimatable animation="slideInUp" duration={50}>
                                <Icon active name="ios-navigate-outline" />
                                <Text style={{fontFamily: 'VarelaRound-Regular', fontSize: 15, color: 'rgba(0,0,0,.5)'}}>{prediction.fullText}</Text>
                            </CardItemAnimatable>
                          </TouchableOpacity>
                          )
                    })}
                  </CardAnimatable>
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

const mapDispatchToProps = dispatch => ({
    setFrom: place =>
        dispatch({type: 'SET_FROM', place})
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationChooser);