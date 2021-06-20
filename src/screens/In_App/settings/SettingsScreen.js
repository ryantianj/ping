import React from "react";
import {ScrollView, Text, TouchableOpacity} from "react-native";
import firebase, { usersCollection } from '../../../../api/firebase';
import { useDispatch } from 'react-redux';
import { fillUserState } from '../../../usersSlice';

import Screen from "../../../components/Screen";
import store from "../../../store"

import styles from '../../../styling/screens/In_App/settings/SettingsScreen.styles'


export default (props) => {
    const dispatch = useDispatch();
    dispatch(fillUserState(store.getState().user.user.uid));

    const handleLogout = async () => {
        const response = await firebase
        .auth()
        .signOut();
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) { console.log('signed out!') }
          });
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });

    }

    return (
        <Screen style = {styles.container}>
            <ScrollView style = {styles.scroll}>
                <TouchableOpacity
                    style = {styles.Button}
                    onPress = {() => props.navigation.navigate('Security')}
                >
                    <Text style = {styles.ButtonText}>Security</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.Button}
                    onPress = {() => props.navigation.navigate('Profile')}
                >
                    <Text style = {styles.ButtonText}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.Button}
                    onPress = {() => props.navigation.navigate('FriendList')}
                >
                    <Text style = {styles.ButtonText}>Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.Button}
                    onPress = {() => props.navigation.navigate('Pending')}
                >
                    <Text style = {styles.ButtonText}>Pending Requests ({store.getState().user.user.pending.length})</Text>
                </TouchableOpacity>


            </ScrollView>
            <TouchableOpacity
                style = {styles.button}
                onPress = {handleLogout}>
                <Text style ={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </Screen>

    )
}