import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/store';

import styles from "./src/styling/app/App.styles";

import LogIn from "./src/navigation/LoginNavi";

export default function App() {
  return (
    <Provider store = {store}>
      <View style = {styles.container}>
          <LogIn/>
      </View>
    </Provider>
  );
}

