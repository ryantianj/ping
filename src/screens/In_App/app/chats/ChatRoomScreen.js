import React, {Component, useEffect, useState, useRef} from "react";
import {Text} from "react-native";
import { usersCollection, roomsCollection } from '../../../../../api/firebase';

import Screen from "../../../../components/Screen";

import styles from '../../../../styling/screens/In_App/app/chats/ChatRoomScreen.styles';

export default (props) => {

    const [roomID, setroomID] = useState("8NpbK0TBMT1ltRKjll85");
    const [users, setUsers] = useState("null");

    useEffect(() => {
        roomsCollection.doc(roomID).get().then(snapshot => {
            if (!snapshot.exists){
                return console.log('sorry no record found');
            } else {
                console.log(snapshot.data().topics);
                const foundUsers = snapshot.data().users;
                console.log(foundUsers); // prints "marcuschua"
                setUsers(foundUsers); // hooks should set users from "null" to "marcuschua"
            }
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        console.log(users);
    })

    return (
        <Screen style = {styles.container}>

            <Text
                style = {styles.chatsText}>
                Your Chats
                {/* { users } */}
            </Text>
        </Screen>

    )
}