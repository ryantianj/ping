import React, {useEffect, useState} from "react";
import {FlatList, Text,TouchableOpacity} from "react-native";
import firebase, {usersCollection} from "../../../../../api/firebase"
import { fillUserState } from '../../../../usersSlice';
import { useDispatch } from 'react-redux';


import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from "../../../../styling/screens/In_App/settings/Pending/Pending.styles"

export default (props) => {
    const [user, setUser] = useState([]);
    const [len, setLen] = useState(0);

    const dispatch = useDispatch()
    const uid = store.getState().user.user.uid;

    useEffect(() => {
        const fetch = async (pending) => {
            const temp = [];

            for (const user in pending) {
                const data = await usersCollection.doc(pending[user]).get()
                const userData = data.data()
                temp.push(userData)
            }
            setUser(temp)
            setLen(temp.length)
        }
        const fetchPending = usersCollection.doc(uid)
            .onSnapshot(snapshot => {
                const firebase = snapshot.data()
                const pending = firebase.pending
                fetch(pending)

            })
        return () => {
            fetchPending()
        }
    }, [])


    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style = {styles.searchPress}
                onPress = {() => props.navigation.navigate("AcceptRequest", {
                    user: item,
                    count: len})}>
                <Text style = {styles.searchText}>
                    {item.display}
                </Text>
            </TouchableOpacity>
        )
    }


    return (
        <Screen style = {styles.container}>

            <Text style = {styles.profileText}>
                Pending Requests ({len})
            </Text>
            <FlatList
                data={user}
                renderItem={renderItem}
                style = {styles.flatList}/>

        </Screen>
    )
}