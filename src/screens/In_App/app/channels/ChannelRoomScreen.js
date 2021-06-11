import React, {Component, useEffect, useState, useRef} from "react";
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

import firebase, {
    usersCollection,
    interestsCollection,
    channelsCollection, roomsCollection
} from "../../../../../api/firebase";
import store from '../../../../store';

import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "../../../../styling/screens/In_App/app/channels/ChannelRoomScreen.styles"
import Screen from "../../../../components/Screen";
import {useIsFocused} from "@react-navigation/native";

export default (prop) => {
    const [posts, setPosts] = useState([])
    const [count, setCount] = useState(0)
    const [len, setLen] = useState(0);


    const isFocused = useIsFocused();

    const getPosts = async () => { channelsCollection.doc(store.getState().room.room.roomid)
        .collection("Posts").orderBy('createdAt', 'desc').get().then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                posts.push(doc.data())
                setCount(count + 1)
                setLen(len + 1)
            });
        })
    }

    if (count === 0) {
        getPosts()
        setCount(count + 1)
    }
    const renderItem = (item) => {
        return (
            <Text>
                {item.item.content}
            </Text>
        )
    }


    return (
        <Screen style = {styles.container}>
            <View style = {styles.toolBar}>
                <TouchableOpacity
                    style = {styles.touchable1}
                >
                    <Ionicons style = {styles.icon}
                              name={'settings-outline'} size={35}  />
                </TouchableOpacity>


                <TouchableOpacity
                    style = {styles.touchable}
                    onPress = {() => prop.navigation.navigate("NewPost")}
                >
                    <Ionicons style = {styles.icon}
                              name={'add-outline'} size={35}  />
                </TouchableOpacity>
            </View>
            <Text
                style = {styles.chatsText}>
                {store.getState().room.room.roomname}
            </Text>
            <View style = {styles.flatList}>
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    extraData={len}
                    />
            </View>
        </Screen>
    )
}