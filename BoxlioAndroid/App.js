import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    Image,
    ImageBackground
} from 'react-native';

import AppView from "./src/components/AppView";

export default class App extends Component<{}> {
  render() {

    return (
        <AppView />
    );
  }
}

