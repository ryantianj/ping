import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import firebase, { usersCollection } from '../../api/firebase';

import Screen from "../components/Screen";

import styles from '../styling/screens/SettingsScreen.styles'

export default (props) => {

    const handleLogout = async () => {
        const response = await firebase
        .auth()
        .signOut();
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) { console.log('signed out!') }
          });
        props.navigation.navigate('Login');
    }

    return (
        <Screen style = {styles.container}>
            <TouchableOpacity
                style = {styles.button}
                onPress = {handleLogout}>
                <Text style ={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </Screen>
    )
}