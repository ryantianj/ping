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
        user.bio,
        user.interests.join(", "),
    ]

    const dispatch = useDispatch();

    const uid = store.getState().user.user.uid;

    const addUser = () => {
        // if private, send request
        if (user.visibility) {
            if (store.getState().user.user.friends.includes(user.uid)) {
                alert("User is already your friend!")
            } else {
                //public, send friend request
                firebase.firestore()
                    .collection('Users')
                    .doc(user.uid)
                    .update({
                        pending: firebase.firestore.FieldValue.arrayUnion(uid)
                    }).then(() => alert("Friend Request Sent!"))
            }
        } else {
            if (store.getState().user.user.friends.includes(user.uid)) {
                alert("User is already your friend!")
            } else {
                //public, add to both users list
                firebase.firestore()
                    .collection('Users')
                    .doc(uid)
                    .update({
                        friends: firebase.firestore.FieldValue.arrayUnion(user.uid)
                    }).then(() => firebase.firestore()
                    .collection('Users')
                    .doc(user.uid)
                    .update({
                        friends: firebase.firestore.FieldValue.arrayUnion(uid)
                    }) ).then(() => dispatch(fillUserState(uid))).then(() => alert("User Added!"))
            }
        }
    }

    const renderItem = ( {item}) => {
        if (user.visibility) {
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
                        <Text style = {styles.selectedTextHeader}>Bio: </Text>
                        <Text style = {styles.selectedText}>This Account is Private</Text>
                    </View>
                )
            } else {
                return (
                    <View
                        style = {styles.textInputBio}
                    >
                        <Text style = {styles.selectedTextHeader}>Interests: </Text>
                        <Text style = {styles.selectedText}>This Account is Private</Text>
                    </View>
                )
            }
        } else {
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
                onPress = {() => {
                    addUser()

                }}>
                <Text style ={styles.buttonText}>Add User</Text>
            </TouchableOpacity>
        </Screen>
    )
}