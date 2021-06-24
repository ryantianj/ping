import React, {useState} from "react";
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from "react-native";
import { useDispatch } from 'react-redux';

import Screen from "../../../components/Screen";
import store from "../../../store"

import styles from "../../../styling/screens/In_App/app/channels/ViewProfile.styles"
import firebase, {globalNotiCollection} from "../../../../api/firebase";
import {fillUserState} from "../../../usersSlice";

export default (props) => {
    const [user, setUser] = useState(props.route.params.user)
    const [loading, isLoading] = useState(false);
    const [friend, isFriend] = useState(store.getState().user.user.friends.includes(props.route.params.user.uid));
    const [yourself, isYourself] = useState(props.route.params.user.uid === store.getState().user.user.uid)

    const DATA = [
        user.display,
        user.bio,
        user.interests.join(", "),
    ]

    const dispatch = useDispatch();

    const uid = store.getState().user.user.uid;

    const addUser = () => {
        isLoading(true)
        // if private, send request
        if (user.visibility) {
            if (store.getState().user.user.friends.includes(user.uid)) {
                alert("User is already your friend!")
                isLoading(false)
            } else {
                //private, send friend request
                firebase.firestore()
                    .collection('Users')
                    .doc(user.uid)
                    .update({
                        pending: firebase.firestore.FieldValue.arrayUnion(uid)
                    }).then(() => {
                    isLoading(false)
                    alert("Friend Request Sent!")})
                globalNotiCollection.add({
                    title: "Friend Request",
                    text: store.getState().user.user.display,
                    user: {
                        _id: uid,
                        display: store.getState().user.user.display
                    },
                    createdAt: new Date().getTime(),
                    //Users to send to
                    users: [user.uid],
                    roomname: "",
                    notiType: 5,
                })
            }

        } else {
            if (store.getState().user.user.friends.includes(user.uid)) {
                alert("User is already your friend!")
                isLoading(false)
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
                    }) ).then(() => dispatch(fillUserState(uid))).then(() => {
                    isLoading(false)
                    alert("User Added!")})
                globalNotiCollection.add({
                    title: "Friend Request Public",
                    text: store.getState().user.user.display,
                    user: {
                        _id: uid,
                        display: store.getState().user.user.display
                    },
                    createdAt: new Date().getTime(),
                    //Users to send to
                    users: [user.uid],
                    roomname: "",
                    notiType: 7,
                })
            }
        }
    }

    const renderItem = ( {item}) => {
        if (friend || yourself) {
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
        } else {
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

            {!friend && !yourself &&<TouchableOpacity
                style = {styles.button}
                onPress = {() => {
                    addUser()

                }}>
                <Text style ={styles.buttonText}>Add User</Text>
            </TouchableOpacity>}

            {friend && !yourself && <View
                style = {styles.button}
                >
                <Text style ={styles.buttonText}>You are friends with this User!</Text>
            </View>}

            {yourself && <View
                style = {styles.button}
            >
                <Text style ={styles.buttonText}>Your Profile</Text>
            </View>}


            {loading && <View style={styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color}/>
                <Text>
                    Adding User
                </Text>
            </View>
            }
        </Screen>
    )
}