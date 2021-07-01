import React, { useState, useEffect } from "react";
import {Alert, ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import firebase, {usersCollection, roomsCollection, channelsCollection} from "../../../../../api/firebase";
import 'react-native-gesture-handler';
import { fillUserState } from '../../../../usersSlice';
import { useDispatch } from 'react-redux';

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from '../../../../styling/screens/In_App/app/channels/ChannelRoomSettings.styles';

export default (props) => {
    const [count, setCount] = useState(0);
    const [displayArray, setDisplayArray] = useState([]);
    const [loading, isLoading] = useState(false);

    const dispatch = useDispatch();

    const uid = store.getState().user.user.uid;
    const roomid = store.getState().room.room.roomid;
    const roomname = store.getState().room.room.roomname;
    const topics = store.getState().room.room.topics.join(", ");
    const users = store.getState().room.room.users;

    const mapUidToUserName = (uidArray) => {
        uidArray.forEach(async uid => {
            const user = await usersCollection.doc(uid).get();
            addUser(user.data());
        })
    }
    if (count === 0) {
        mapUidToUserName(users)
    }


    const addUser = (item) => {
        displayArray.push(item)
        setCount( count + 1)
    }

    const renderUserItem = ({item}) => {
        return (
            <TouchableOpacity
                style = {styles.textInputBio}
                onPress = {() => props.navigation.navigate("ViewProfileChannel", {user : item})}
            >
                <Text style = {styles.selectedText2}>{item.display}</Text>
            </TouchableOpacity>
        )
    }

    const leaveChannel = async () => {
        isLoading(true);
        await usersCollection
            .doc(uid)
            .update({
                'channels': firebase.firestore.FieldValue.arrayRemove(roomid)
            })
            .then(() => {

                console.log('Removed channel from user db!');
            });
        await channelsCollection
            .doc(roomid)
            .update({
                'users': firebase.firestore.FieldValue.arrayRemove(uid)
            })
            .then(() => {
                console.log('Removed user from room db!');
            });
        dispatch(fillUserState(uid)).then(() => {
            Alert.alert("Leave Channel", "You have left the channel.")
            props.navigation.navigate("Channel")
            isLoading(false);
        })
    }

    const handleLeaveChannel = async () => {
        Alert.alert("Leave Channel", "Are you sure you want to leave this channel?",
        [
            {
                text: "Yes",
                onPress: () => {
                    leaveChannel();
                },
            },
            {
                text: "No",
                onPress: () => {},
            }
        ])
    }

    return (
        <Screen style = {styles.container}>

            <Text style = {styles.roomNameText}>
                {roomname}
            </Text>

            <View style = {styles.textInputBio}>
                <Text style = {styles.selectedTextHeader}>Topics: </Text>
                <Text style = {styles.selectedText1}>{topics}</Text>
                <Text style = {styles.selectedTextHeader}>Users: </Text>
            </View>

            <View style = {styles.flatListView}>
                <FlatList
                    data={displayArray}
                    renderItem={renderUserItem}
                    style = {styles.flatList}
                    keyExtractor={item => item.uid}/>
            </View>

            <TouchableOpacity
                style = {styles.button}
                onPress = {async () => { await handleLeaveChannel() }}
            >
                <Text style ={styles.buttonText}>Leave Channel</Text>
            </TouchableOpacity>

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Leaving Channel
                </Text>
            </View>
            }

        </Screen>
    )
}