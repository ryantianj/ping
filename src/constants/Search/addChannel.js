import React, {useState} from "react";
import {ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import { useDispatch } from 'react-redux';

import Screen from "../../components/Screen";
import store from "../../store"

import styles from "../../styling/constants/Search/addChannel.styles"
import firebase, {usersCollection, channelsCollection} from "../../../api/firebase";
import {fillUserState} from "../../usersSlice";

export default (props) => {
    const [channel, setChannel] = useState(props.route.params.channel)
    const [loading, isLoading] = useState(false);

    const DATA = [
        channel.roomname,
        channel.topics.join(", ")
    ]

    const dispatch = useDispatch();

    const uid = store.getState().user.user.uid;

    const addChannel = () => {
        isLoading(true);
        if (store.getState().user.user.channels.includes(channel.roomid)) {
            isLoading(false);
            alert("You are already in this Channel!")
        } else {
            usersCollection
                .doc(uid)
                .update({
                    channels: firebase.firestore.FieldValue.arrayUnion(channel.roomid)
                }).then(() => channelsCollection
                .doc(channel.roomid)
                .update({
                    users: firebase.firestore.FieldValue.arrayUnion(uid)
                }) ).then(() => dispatch(fillUserState(uid))).then(() => {
                    isLoading(false);
                    alert("Channel Added!")
                    props.navigation.navigate("Channel")
                })
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

    const renderChannelButton = () => {
        if (store.getState().user.user.channels.includes(channel.roomid)) {
            return (
                <View
                    style = {styles.button}
                >
                    <Text style = {styles.buttonText}>You are already in this channel!</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => {
                        addChannel()
                    }}>
                    <Text style ={styles.buttonText}>Add Channel</Text>
                </TouchableOpacity>
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

            {renderChannelButton()}

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                   Adding Channel
                </Text>
            </View>
            }
        </Screen>
    )
}