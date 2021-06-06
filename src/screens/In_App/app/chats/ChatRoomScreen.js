import React, {Component, useEffect, useState, useRef} from "react";
import {FlatList, Text, TouchableOpacity} from "react-native";
import { GiftedChat } from 'react-web-gifted-chat';

import { roomsCollection } from '../../../../../api/firebase';

import Screen from "../../../../components/Screen";

import styles from '../../../../styling/screens/In_App/app/chats/ChatRoomScreen.styles';

export default (props) => {

    const [roomID, setroomID] = useState("8NpbK0TBMT1ltRKjll85");
    const [users, setUsers] = useState("null");
    const DATA = [1];

    const renderChat = ( message ) => {
        return (
            <Text style = {styles.chats}>message</Text>

        );

    }

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

            <FlatList
                style = {styles.flatList}
                data={DATA}
                renderItem={renderChat}/>
        </Screen>

    )
}