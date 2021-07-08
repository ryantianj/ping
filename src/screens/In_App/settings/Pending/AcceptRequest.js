import React, {useState} from "react";
import {ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import { useDispatch } from 'react-redux';

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from "../../../../styling/screens/In_App/settings/Pending/AcceptRequest.styles"
import firebase, {globalNotiCollection} from "../../../../../api/firebase";
import {fillUserState} from "../../../../usersSlice";

export default (props) => {
    const [user, setUser] = useState(props.route.params.user)
    const [loading, isLoading] = useState(false);
    const [accept, isAccept] = useState(true);

    const DATA = [
        user.display,
        user.email,
        user.bio,
        user.interests.join(", "),
    ]

    const dispatch = useDispatch();

    const uid = store.getState().user.user.uid;

    const acceptUser = () => {
        isAccept(true);
        isLoading(true)
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
            alert(user.display + " is now your friend!")
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' },{ name: 'Main' },{ name: 'Pending' }],
                })
                // props.navigation.navigate('Pending')
                isLoading(false)
            })

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
        isAccept(false);
        isLoading(true);
        firebase.firestore()
            .collection('Users')
            .doc(uid)
            .update({
                pending: firebase.firestore.FieldValue.arrayRemove(user.uid)
            }).then(() => dispatch(fillUserState(uid)))
            .then(() => {
                alert(user.display + " was rejected :(")
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' },{ name: 'Main' },{ name: 'Pending' }],
                })
                // props.navigation.navigate('Pending')
                isLoading(false)
            })
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

            {loading && accept && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Adding User
                </Text>
            </View>
            }

            {loading && !accept && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Rejecting Request
                </Text>
            </View>
            }

        </Screen>
    )
}