import React, {useState} from "react";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import { useDispatch } from 'react-redux';

import Screen from "../../components/Screen";
import store from "../../store"

import styles from "../../styling/constants/Search/addChannel.styles"
import firebase from "../../../api/firebase";
import {fillUserState} from "../../usersSlice";

export default (props) => {
    const [channel, setChannel] = useState(props.route.params.channel)

    const DATA = [
        channel.roomname,
        channel.topics
    ]

    const dispatch = useDispatch();

    const uid = store.getState().user.user.uid;

    const addChannel = () => {
        if (store.getState().user.user.channels.includes(channel.roomid)) {
            alert("You are already in this Channel!")
        } else {
            firebase.firestore()
                .collection('Users')
                .doc(uid)
                .update({
                    channels: firebase.firestore.FieldValue.arrayUnion(channel.roomid)
                }).then(() => firebase.firestore()
                .collection('Channel')
                .doc(channel.roomid)
                .update({
                    users: firebase.firestore.FieldValue.arrayUnion(uid)
                }) ).then(() => dispatch(fillUserState(uid))).then(() => alert("Channel Added!"))
        }
    }

    const renderItem = ( {item}) => {
        if (item === DATA[0]) {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Room Name: </Text>
                    <Text style = {styles.selectedText}>{item}</Text>
                </View>
            )
        } else {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Topics: </Text>
                    <Text style = {styles.selectedText}>{item}</Text>
                </View>
            )
        }



    }


    return (
        <Screen style = {styles.container}>

            <Text style = {styles.profileText}>
                Channel Info
            </Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                style = {styles.flatList}/>

            <TouchableOpacity
                style = {styles.button}
                onPress = {() => {
                    addChannel()
                }}>
                <Text style ={styles.buttonText}>Add Channel</Text>
            </TouchableOpacity>
        </Screen>
    )
}