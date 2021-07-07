import React, {useState} from "react";
import {Alert, ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from "react-native";
import firebase, { usersCollection } from '../../../../api/firebase';
import { useDispatch } from 'react-redux';
import { fillUserState } from '../../../usersSlice';

import Screen from "../../../components/Screen";
import store from "../../../store"

import styles from '../../../styling/screens/In_App/settings/SettingsScreen.styles'

// NO LONGER IN USE
export default (props) => {
    const [loading, isLoading] = useState(false);

    const dispatch = useDispatch();
    dispatch(fillUserState(store.getState().user.user.uid));
    // this is done to update badges state

    const handleLogout = async () => {
        Alert.alert("Log Out", "Are you sure you want to log out?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                    logOut()},
                },
                {
                    text: "No",
                    onPress: () => {},
                }
            ],)
        
        const logOut = async () => {
            isLoading(true);
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
            isLoading(false);
        }
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

                <TouchableOpacity
                    style = {styles.Button}
                    onPress = {() => props.navigation.navigate('Help')}
                >
                    <Text style = {styles.ButtonText}>Help</Text>
                </TouchableOpacity>


            </ScrollView>
            <TouchableOpacity
                style = {styles.button}
                onPress = {handleLogout}>
                <Text style ={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Logging Out
                </Text>
            </View>
            }
        </Screen>

    )
}