import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    Image,
    ImageBackground
} from 'react-native';
import {Provider} from "react-redux";
import store from "./src/store";

import AppView from "./src/components/AppView";

//glavna aplikacija wrapped u Provider koji prima store
export default class App extends Component{
  render() {
    return (
        <Provider store={store}>
          <AppView />
        </Provider>
    )
  }
}
