import React, {useState} from "react";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import { useDispatch } from 'react-redux';

import Screen from "../../components/Screen";
import store from "../../store"

import styles from "../../styling/constants/Search/addUser.styles"
import firebase from "../../../api/firebase";
import {fillUserState} from "../../usersSlice";

export default (props) => {
    const [user, setUser] = useState(props.route.params.user)

    const DATA = [
        user.display,
        user.email,
        user.bio,
        user.interests.join(", "),
    ]

    const dispatch = useDispatch();

    const uid = store.getState().user.user.uid;

    const addUser = () => {
        if (store.getState().user.user.friends.includes(user.uid)) {
            alert("User is already your friend!")
        } else {
            firebase.firestore()
                .collection('Users')
                .doc(uid)
                .update({
                    friends: firebase.firestore.FieldValue.arrayUnion(user.uid)
                }).then(() => alert("User Added!"))

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
                    await addUser()
                    dispatch(fillUserState(uid))
                }}>
                <Text style ={styles.buttonText}>Add User</Text>
            </TouchableOpacity>
        </Screen>
    )
}