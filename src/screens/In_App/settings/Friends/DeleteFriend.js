import React, {useState} from "react";
import {ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import { useDispatch } from 'react-redux';

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from "../../../../styling/screens/In_App/settings/Friends/DeleteFriend.styles"
import firebase from "../../../../../api/firebase";
import {fillUserState} from "../../../../usersSlice";

export default (props) => {
    const [user, setUser] = useState(props.route.params.user)
    const [loading, isLoading] = useState(false);

    const DATA = [
        user.display,
        user.email,
        user.bio,
        user.interests.join(", "),
    ]

    const dispatch = useDispatch();

    const uid = store.getState().user.user.uid;

    const deleteUser = () => {
        isLoading(true);
        if (store.getState().user.user.friends.includes(user.uid)) {
            firebase.firestore()
                .collection('Users')
                .doc(uid)
                .update({
                    friends: firebase.firestore.FieldValue.arrayRemove(user.uid)
                }).then(() => firebase.firestore()
                .collection('Users')
                .doc(user.uid)
                .update({
                    friends: firebase.firestore.FieldValue.arrayRemove(uid)
                })).then(() => {
                    alert("User Removed!")
                    isLoading(false);
                    props.navigation.navigate('Settings')})
        }
    }

    const renderItem = ( {item}) => {
        if (item === DATA[0]) {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Display Name: </Text>
                    <Text style = {styles.selectedText}>{item}</Text>
                </View>
            )
        } else if (item === DATA[1]) {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Email: </Text>
                    <Text style = {styles.selectedText}>{item}</Text>
                </View>
            )
        } else if (item === DATA[2]) {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Bio: </Text>
                    <Text style = {styles.selectedText}>{item}</Text>
                </View>
            )
        } else {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Interests: </Text>
                    <Text style = {styles.selectedText}>{item}</Text>
                </View>
            )
        }

    }


    return (
        <Screen style = {styles.container}>

            <Text style = {styles.profileText}>
                User Profile
            </Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                style = {styles.flatList}/>

            <TouchableOpacity
                style = {styles.button}
                onPress = {async () => {
                    await deleteUser()
                    dispatch(fillUserState(uid))
                }}>
                <Text style ={styles.buttonText}>Delete User</Text>
            </TouchableOpacity>

            {loading && <View style={styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color}/>
                <Text>
                    Removing User from Friend List
                </Text>
            </View>
            }
        </Screen>
    )
}