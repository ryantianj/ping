import React, { useState, useEffect } from "react";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import firebase, {usersCollection, roomsCollection, channelsCollection} from "../../../../../api/firebase";
import 'react-native-gesture-handler';
import { fillUserState } from '../../../../usersSlice';
import { useDispatch } from 'react-redux';

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from '../../../../styling/screens/In_App/app/channels/ChannelRoomSettings.styles';

export default (props) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [displayArray, setDisplayArray] = useState([]);

    const mapUidToUserName = (uidArray) => {
        uidArray.forEach(async uid => {
            const user = await usersCollection.doc(uid).get();
            addUser(user.data());
        })
    }

    const uid = store.getState().user.user.uid;
    const roomid = store.getState().room.room.roomid;
    const roomname = store.getState().room.room.roomname;
    const topics = store.getState().room.room.topics.join(", ");


    if (displayArray.length === 0) {
        mapUidToUserName(store.getState().room.room.users)
    }


    const addUser = (item) => {
        displayArray.push(item)
        setCount(count + 1)
    }

    const renderUserItem = ({item}) => {
        return (
            <TouchableOpacity
                style = {styles.textInputBio}
            >
                <Text style = {styles.selectedText2}>{item.display}</Text>
            </TouchableOpacity>
        )
    }

    const handleLeaveChannel = async () => {
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
        await dispatch(fillUserState(uid));
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
                    style = {styles.flatList}/>
            </View>


            <TouchableOpacity
                style = {styles.button}
                onPress = {async () => {
                    await handleLeaveChannel()
                        .then(() => props.navigation.navigate("Channel"));

                }
                }>
                <Text style ={styles.buttonText}>Leave Channel</Text>
            </TouchableOpacity>

        </Screen>
    )
}