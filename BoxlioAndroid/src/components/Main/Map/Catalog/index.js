import React from "react";
import {Container} from "native-base";
import { Header, Content, Footer, FooterTab, Button, Card, CardItem, Body, Text, Right, Left, Icon  } from 'native-base';
import {Grid, Col, Row} from "react-native-easy-grid";
import {StyleSheet, Dimensions, View, TextInput, TouchableOpacity, Keyboard, ActivityIndicator} from "react-native";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import RNGooglePlaces from "react-native-google-places";
import {Places} from 'google-places-web';
Places.apiKey = 'AIzaSyC6Dsjr-pf4kg0LeT78j8yvJVuttcCj4bQ';
import agent from '../../../../agent';

const ContainerAnimatable = Animatable.createAnimatableComponent(Container);
const CardAnimatable = Animatable.createAnimatableComponent(Card);
const CardItemAnimatable = Animatable.createAnimatableComponent(CardItem);

class Catalog extends React.Component {

    componentWillMount(){
        if(this.props.from){
            RNGooglePlaces.getAutocompletePredictions(this.props.from)
                .then((results) => this.setState({predictions: results}))
                .catch((error) => {throw error})
        }
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.from){
            RNGooglePlaces.getAutocompletePredictions(nextProps.from)
        .then((results) => {
            this.setState({predictions: results})
        })
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
      this.refs.locationchooser.fadeOutDown(100).then(() => {
        RNGooglePlaces.lookUpPlaceByID(prediction.placeID)
            .then((place) => {
              this.props.setFrom(place)
              Keyboard.dismiss()
            })
      })
    };

  }



    render() {
        return (
            <ContainerAnimatable animation="fadeInUp" duration={100} ref="locationchooser" style={styles.searchTo}>
              <Content keyboardShouldPersistTaps="handled">
                      {this.props.results && this.props.results.length > 0 ?

                          <CardAnimatable ref="cardanimatable" style={styles.card}>

                              {(this.props.results || []).map((prediction) => {
                      return(
                          <TouchableOpacity style={{borderWidth: 0}} key={prediction.id} onPress={() => this.handleSetFrom(prediction)}>
                            <CardItemAnimatable animation="slideInUp" duration={50} style={{borderWidth: 0}}>
                                <Icon active name="ios-basket-outline" style={{color: '#1fcf7c'}} />
                                <Text style={{fontFamily: 'VarelaRound-Regular', fontSize: 15, color: 'rgba(0,0,0,.5)'}}>{prediction.name}</Text>
                            </CardItemAnimatable>
                          </TouchableOpacity>
                          )
                    })}

                          </CardAnimatable>
                    : <ActivityIndicator size={50} color="#2d89e5" />}
              </Content>
            </ContainerAnimatable>
        )
    }
}

const styles = StyleSheet.create({
    card:{
      width: Dimensions.get('window').width-50,
      alignItems: 'flex-start',
      elevation: 0,
      borderWidth: 0,
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
      height: Dimensions.get('window').height-350 ,
      width: Dimensions.get('window').width-30,
      borderRadius: 3,
      elevation: 2,
      shadowOpacity: 0.1,
      alignItems: 'center',
      justifyContent: 'space-around',
      shadowColor: '#000',
      position: 'absolute',
      bottom: 70,
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
    ...state.destinationView,
    ...state.catalog,
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: 'CATALOG_PAGE_LOADED', payload}),
    onLoadByQuery: payload =>
        dispatch({type: 'SEARCH_CATALOG_ITEMS', payload}),
});

  export default connect(mapStateToProps, mapDispatchToProps)(Catalog);