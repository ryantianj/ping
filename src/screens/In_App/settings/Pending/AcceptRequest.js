import React, {useState} from "react";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import { useDispatch } from 'react-redux';

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from "../../../../styling/screens/In_App/settings/Pending/AcceptRequest.styles"
import firebase, {globalNotiCollection} from "../../../../../api/firebase";
import {fillUserState} from "../../../../usersSlice";

export default (props) => {
    const [user, setUser] = useState(props.route.params.user)
    const [count, setCount] = useState(props.route.params.count)

    const DATA = [
        user.display,
        user.email,
        user.bio,
        user.interests.join(", "),
    ]

    const dispatch = useDispatch();

    const uid = store.getState().user.user.uid;

    const acceptUser = () => {
        firebase.firestore()
            .collection('Users')
            .doc(uid)
            .update({
                pending: firebase.firestore.FieldValue.arrayRemove(user.uid)
            }).then(() => firebase.firestore()
            .collection('Users')
            .doc(uid)
            .update({
                friends: firebase.firestore.FieldValue.arrayUnion(user.uid)
            })).then(() => firebase.firestore()
            .collection('Users')
            .doc(user.uid)
            .update({
                friends: firebase.firestore.FieldValue.arrayUnion(uid)
            })).then(() => dispatch(fillUserState(uid)))
            .then(() => {
            alert(user.display + " is now your friend")
            props.navigation.goBack( {count: count })})
        globalNotiCollection.add({
            title: "Friend Request Accepted",
            text: store.getState().user.user.display,
            user: {
                _id: uid,
                display: store.getState().user.user.display
            },
            createdAt: new Date().getTime(),
            //Users to send to
            users: [user.uid],
            roomname: "",
            notiType: 6,
        })
    }

    const rejectUser = () => {
        firebase.firestore()
            .collection('Users')
            .doc(uid)
            .update({
                pending: firebase.firestore.FieldValue.arrayRemove(user.uid)
            }).then(() => dispatch(fillUserState(uid)))
            .then(() => {
                alert(user.display + " rejected")
                props.navigation.navigate('Settings', {count: count})})
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

            <View style = {styles.buttons}>
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => {
                        acceptUser()
                    }}>
                    <Text style ={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.buttonReject}
                    onPress = {() => {
                        rejectUser()
                    }}>
                    <Text style ={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
            </View>

        </Screen>
    )
}