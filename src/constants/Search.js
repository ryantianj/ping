import React, {useState} from "react";
import {TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from "../../api/firebase"
import store from "../store"

import styles from "../styling/constants/Search.styles";

export default (props) => {
    const [search, setSearch] = useState("");
    const [user, setUser] = useState([]);
    const [channel, setChannel] = useState([]);
    const [total, setTotal] = useState([]);

    const addUser = (item) => {
        // makes sure u cant add yourself
        if (item.email !== store.getState().user.user.email) {
            user.push(item)
        }
    }

    const addChannel = (item) => {
        channel.push(item)
    }

    const submitQueryToDatabase = () => {
        setUser([]);
        setChannel([]);
        setTotal([]);
        // Search users
        const users = () => firebase.firestore()
            .collection('Users')
            .where('search', '>=', search.toLowerCase())
            .where('search', '<=', search.toLowerCase() + '\uf8ff')
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    addUser(doc.data())
                });
            }) .then(() => {
                total.push({user: user.length,
                    type : 0})
            })
        // Search channels
        const channels = () => firebase.firestore()
            .collection('Channel')
            .where('search', '>=', search.toLowerCase())
            .where('search', '<=', search.toLowerCase() + '\uf8ff')
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    addChannel(doc.data())
                });
            }).then(() => {
                total.push({channel: channel.length,
                    type : 1})
            })
        users().then(() => channels())
            .then(() => {
                props.navigation.navigate('Search',
                    {   search: search,
                        user: user,
                        channel: channel,
                        total: total
                    })
            })
            .catch((error) => {
                alert("Invalid Query")
            })
    }

    return (
        <View style = {styles.container}>
            <TextInput
                style = {styles.searchBarText}
                placeholder = "Search (by display/channel name)"
                value = {search}
                onChangeText = {setSearch}
                autoCapitalize = "none"
                returnKeyType = "go"
                onSubmitEditing = {()=> submitQueryToDatabase()}/>
            <TouchableOpacity
                style = {styles.touchable}
                onPress = {() => {submitQueryToDatabase()
                    }}>
                <Ionicons style = {styles.icon}
                          name={'search-outline'} size={27}  />
            </TouchableOpacity>

        </View>
    )
}