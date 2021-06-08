import React, {useEffect, useState} from "react";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import firebase from "../../../../../api/firebase"

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from "../../../../styling/screens/In_App/settings/Friends/FriendList.styles"

export default (props) => {
    const [user, setUser] = useState([]);
    const [count, setCount] = useState(0);

    const DATA = store.getState().user.user.friends;

    const fetchFriends = () => {
        firebase.firestore().collection('Users')
        .where('uid','in',DATA)
        .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            addUser(doc.data())
        });
        })
    }
    if (user.length === 0 && DATA.length > 0) {
        fetchFriends()
    }

    const addUser = (item) => {
        user.push(item)
        setCount(count + 1)
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style = {styles.searchPress}
                onPress = {() => props.navigation.navigate("DeleteFriend", {user: item})}>
            <Text style = {styles.searchText}>
                {item.display}
            </Text>
            </TouchableOpacity>
        )
    }


    return (
        <Screen style = {styles.container}>

            <Text style = {styles.profileText}>
                Your Friends ({DATA.length})
            </Text>
            <FlatList
                data={user}
                renderItem={renderItem}
                style = {styles.flatList}/>

        </Screen>
    )
}