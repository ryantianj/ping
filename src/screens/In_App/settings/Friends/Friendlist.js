import React, {useEffect, useState} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import { usersCollection} from "../../../../../api/firebase"

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from "../../../../styling/screens/In_App/settings/Friends/FriendList.styles"

export default (props) => {
    const [user, setUser] = useState([]);

    const DATA = store.getState().user.user.friends;

    useEffect(() => {
        const fetchFriends = usersCollection.where('uid','in',DATA)
            .onSnapshot(snapshot => {
           const friends = snapshot.docs.map(doc => {
               const firebase = doc.data()
               return firebase;
           })
            setUser(friends)

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
                Your Friends ({DATA.length})
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