import React, {useEffect, useState} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import { usersCollection} from "../../../../../api/firebase"

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from "../../../../styling/screens/In_App/settings/Friends/FriendList.styles"

export default (props) => {
    const [user, setUser] = useState([]);
    const [len, setLen] = useState(0);

    const uid = store.getState().user.user.uid;

    useEffect(() => {
        const fetch = async (friends) => {
            const temp = [];

            for (const user in friends) {
                const data = await usersCollection.doc(friends[user]).get()
                const userData = data.data()
                temp.push(userData)
            }
            setUser(temp)
            setLen(temp.length)
        }
        const fetchFriends = usersCollection.doc(uid)
            .onSnapshot(snapshot => {
                const firebase = snapshot.data()
                const friends = firebase.friends
                fetch(friends)

            })
        return () => {
            fetchFriends()
        }
    }, [])

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
                Your Friends ({len})
            </Text>
            <FlatList
                data={user}
                renderItem={renderItem}
                style = {styles.flatList}
                keyExtractor={item => item.uid}
                extraData={user}/>

        </Screen>
    )
}