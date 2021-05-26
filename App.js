import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';

import styles from "./src/styling/app/App.styles";

import LogIn from "./src/navigation/LoginNavi";


export default function App() {
  return (
      <View style = {styles.container}>
          <LogIn/>
      </View>
  );
}

