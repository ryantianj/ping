import React, {Component, useEffect, useState, useRef} from "react";
import {Text} from "react-native";
import { usersCollection, roomsCollection } from '../../../../../api/firebase';

import Screen from "../../../../components/Screen";

import styles from '../../../../styling/screens/In_App/app/chats/ChatRoomScreen.styles';

export default (props) => {
    
    const [roomID, setroomID] = useState("8NpbK0TBMT1ltRKjll85");
    const [users, setUsers] = useState("null");
    
    useEffect(() => {
           if (!snapshot.exists){
                return console.log('sorry no record found');
            } else {
                console.log(snapshot.data().topics);
               console.log(users);
=======
                const foundUsers = snapshot.data().users;
                console.log(foundUsers); // prints "marcuschua"
                setUsers(foundUsers); // hooks should set users from "null" to "marcuschua"
>>>>>>> 9ed68d0c340fa194799b5b08bf3c42157482f049
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
