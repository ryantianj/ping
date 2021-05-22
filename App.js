import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from "./src/screens/LoginScreen";
import Screen from "./src/components/Screen";

import colours from "./src/constants/colours";

export default function App() {
  return (
    <Screen style={styles.container}>
        <LoginScreen />

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.primary,

  },
});