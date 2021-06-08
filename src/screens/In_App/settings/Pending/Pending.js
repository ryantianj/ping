import React, {useEffect, useState} from "react";
import {FlatList, Text,TouchableOpacity} from "react-native";
import firebase from "../../../../../api/firebase"
import { fillUserState } from '../../../../usersSlice';
import { useDispatch } from 'react-redux';


import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from "../../../../styling/screens/In_App/settings/Pending/Pending.styles"

export default (props) => {
    const [user, setUser] = useState([]);
    const [count, setCount] = useState(0);

    const dispatch = useDispatch()
    const DATA = store.getState().user.user.pending;

    const fetchPending = () => {
        firebase.firestore().collection('Users')
            .where('uid','in',DATA)
            .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                addUser(doc.data())
            });
        })
    }
    useEffect(() => {
        dispatch(fillUserState(store.getState().user.user.uid))
    },[count])


    if (user.length === 0 && DATA.length > 0) {
        fetchPending()
    }

    const addUser = (item) => {
        user.push(item)
        setCount(count + 1)
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style = {styles.searchPress}
                onPress = {() => props.navigation.navigate("AcceptRequest", {
                    user: item,
                    count: DATA.length})}>
                <Text style = {styles.searchText}>
                    {item.display}
                </Text>
            </TouchableOpacity>
        )
    }


    return (
        <Screen style = {styles.container}>

            <Text style = {styles.profileText}>
                Pending Requests ({DATA.length})
            </Text>
            <FlatList
                data={user}
                renderItem={renderItem}
                style = {styles.flatList}/>

        </Screen>
    )
}