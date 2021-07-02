import React, {useState} from "react";
import {Alert, ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View, Image} from "react-native";
import { useDispatch } from 'react-redux';

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from "../../../../styling/screens/In_App/settings/Friends/DeleteFriend.styles"
import firebase from "../../../../../api/firebase";
import {fillUserState} from "../../../../usersSlice";
import {DataTable} from "react-native-paper";
import badgesage from "../../../../../assets/badgesage.png";
import badgeguru from "../../../../../assets/badgeguru.png";
import badgethinker from "../../../../../assets/badgethinker.png";

export default (props) => {
    const [user, setUser] = useState(props.route.params.user)
    const [loading, isLoading] = useState(false);

    const DATA = [
        user.display,
        user.email,
        user.bio,
        user.interests.join(", "),
        user.badges,
    ]

    const dispatch = useDispatch();

    const uid = store.getState().user.user.uid;

    const removeFriend = () => {
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
                    dispatch(fillUserState(uid))
                    })
                .then(() => {
                    alert("User Removed!")
                    isLoading(false);
                    props.navigation.navigate('Settings')
                })
        }
    }

    const handleRemoveFriend = async () => {
        Alert.alert("Remove Friend", "Are you sure you want to remove this friend?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                    removeFriend()},
                },
                {
                    text: "No",
                    onPress: () => {},
                }
            ],)
    }

    const renderBadges = () => {
        const badgesMap = store.getState().user.user.badges; // key:value is topic:0/1/2
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

        return badgesArray
            ? badgesArray.map(badgeData => (
                <DataTable.Row style = {styles.row}>
                    <View style = {styles.iconCell}>
                        <Image style = {styles.image} source = {badgeData.icon}/>
                    </View>
                    <Text style = {styles.titleCell}>{badgeData.title}</Text>
                    <Text style = {styles.topicCell}>{badgeData.topic}</Text>
                </DataTable.Row>
            ))
            : null;
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
        } else if (item === DATA[3]) {
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
                    <DataTable style = {styles.table}>
                        <DataTable.Header style = {styles.row}>
                            <DataTable.Title style = {styles.iconCell}></DataTable.Title>
                            <DataTable.Title style = {styles.titleCell}>Title</DataTable.Title>
                            <DataTable.Title style = {styles.topicCell}>Topic</DataTable.Title>
                        </DataTable.Header>
                        {renderBadges()}
                    </DataTable>
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
                    await handleRemoveFriend()
                }}>
                <Text style ={styles.buttonText}>Remove Friend</Text>
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