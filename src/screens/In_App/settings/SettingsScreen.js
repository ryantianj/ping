import React from "react";
import {Text, TouchableOpacity} from "react-native";

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/settings/SettingsScreen.styles'

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
            <Text style = {styles.settings}>Settings</Text>

            <TouchableOpacity
                style = {styles.securityButton}
                onPress = {() => props.navigation.navigate('Security')}
            >
                <Text style = {styles.securityButtonText}>Security</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {styles.button}
                onPress = {handleLogout}>
                <Text style ={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </Screen>
    )
}