import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import { useDispatch } from 'react-redux';

import Screen from "../../components/Screen";
import store from "../../store"

import styles from "../../styling/constants/Search/addUser.styles"
import firebase, {usersCollection, globalNotiCollection} from "../../../api/firebase";
import {fillUserState} from "../../usersSlice";
import {DataTable} from "react-native-paper";
import badgesage from "../../../assets/badgesage.png";
import badgeguru from "../../../assets/badgeguru.png";
import badgethinker from "../../../assets/badgethinker.png";

export default (props) => {
    const [user, setUser] = useState(props.route.params.user)
    const [loading, isLoading] = useState(false);
    const [image, setImage] = useState(props.route.params.user.photo)

    const DATA = [
        user.display,
        user.bio,
        user.interests.join(", "),
        user.badges
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
                usersCollection
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
                usersCollection
                    .doc(uid)
                    .update({
                        friends: firebase.firestore.FieldValue.arrayUnion(user.uid)
                    }).then(() => usersCollection
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

    const renderBadges = () => {
        const badgesMap = user.badges;
        console.log(badgesMap)
        const badgesArray = [];
        for (const topic in badgesMap) {
            const type = badgesMap[topic]; // number 0 1 2
            let icon = null;
            let title = "";

            if (type === 0) { // sage
                icon = badgesage
                title = 'Sage (Exclusively Appointed)'
            } else if (type === 1) { // guru
                icon = badgeguru
                title = 'Guru (Top 10th percentile for total post upvotes)'
            } else { // thinker
                icon = badgethinker
                title = 'Thinker (Top 30th percentile for total post upvotes)'
            }
            badgesArray.push({topic: topic, icon: icon, title: title, type: type});
        }
        badgesArray.sort((x, y) => {
            if (x.type < y.type) {
                return -1;
            } else if (x.type > y.type) {
                return 1;
            } else {
                return x.topic.localeCompare(y.topic);
            }
        });

        if (badgesArray.length !== 0) {
            return (
                <DataTable style = {styles.table}>
                    <DataTable.Header style = {styles.row}>
                        <DataTable.Title style = {styles.iconCell}></DataTable.Title>
                        <DataTable.Title style = {styles.titleCell}>Title</DataTable.Title>
                        <DataTable.Title style = {styles.topicCell}>Topic</DataTable.Title>
                    </DataTable.Header>
                    {badgesArray.map(badgeData => (
                        <DataTable.Row style = {styles.row}>
                            <View style = {styles.iconCell}>
                                <Image style = {styles.image} source = {badgeData.icon}/>
                            </View>
                            <Text style = {styles.titleCell}>{badgeData.title}</Text>
                            <Text style = {styles.topicCell}>{badgeData.topic}</Text>
                        </DataTable.Row>
                    ))}
                </DataTable>
            )
        } else {
            return (
                <Text style = {styles.noBadgeText}>-No badges-    </Text>
            )
        }
    }

    const renderItem = ( {item}) => {
        if (user.visibility && !store.getState().user.user.friends.includes(user.uid)) {
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
            } else if (item === DATA[2]) {
                return (
                    <View
                        style = {styles.textInputBio}
                    >
                        <Text style = {styles.selectedTextHeader}>Interests: </Text>
                        <Text style = {styles.selectedText}>This Account is Private</Text>
                    </View>
                )
            } else {
                return (
                    <View
                        style = {styles.textInputBio}
                    >
                        <Text style = {styles.selectedTextHeader}>Badges: </Text>
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
            } else if (item === DATA[2]) {
                return (
                    <View
                        style = {styles.textInputBio}
                    >
                        <Text style = {styles.selectedTextHeader}>Interests: </Text>
                        <Text style = {styles.selectedText}>{item}</Text>
                    </View>
                )
            } else {
                return (
                    <View
                        style = {styles.textInputBio}
                    >
                        <Text style = {styles.selectedTextHeader}>Badges: </Text>
                            {renderBadges()}
                    </View>
                )
            }
        }
    }

    const renderAddUserButton = () => {
        if (store.getState().user.user.friends.includes(user.uid)) {
            return (
                <View style = {styles.button}>
                    <Text style = {styles.buttonText}>
                        You are friends with this user!
                    </Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => {
                        addUser()
                    }}>
                    <Text style ={styles.buttonText}>Add User</Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <Screen style = {styles.container}>

            <Text style = {styles.profileText}>
                User Profile
            </Text>
            {image !== '' && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 100/2, }} />}
            <FlatList
                data={DATA}
                renderItem={renderItem}
                style = {styles.flatList}/>

            {renderAddUserButton()}

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