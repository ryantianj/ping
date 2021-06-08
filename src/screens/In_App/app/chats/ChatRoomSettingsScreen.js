import React, { useState, useEffect } from "react";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import { usersCollection } from "../../../../../api/firebase";

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from '../../../../styling/screens/In_App/app/chats/ChatRoomSettingsScreen.styles';

export default (props) => {
    const [count, setCount] = useState(0);
    const [displayArray, setDisplayArray] = useState([]);
    
    const mapUidToUserName = (uidArray) => {
        uidArray.forEach(async uid => {
            const user = await usersCollection.doc(uid).get();
            addUser(user.data());
        })
    }
    
    const roomname = store.getState().room.room.roomname;
    const topics = store.getState().room.room.topics.join(", ");


    if (displayArray.length === 0) {
        mapUidToUserName(store.getState().room.room.users)
    }


    const addUser = (item) => {
        displayArray.push(item)
        setCount(count + 1)
        console.log(displayArray)
    }
    
    const renderUserItem = ({item}) => {
        console.log(item.display)
        return (
            <TouchableOpacity
                style = {styles.textInputBio}
            >
                <Text style = {styles.selectedText}>{item.display}</Text>
            </TouchableOpacity>
        )
    }

    const handleLeaveChat = async () => {

    }

    return (
        <Screen style = {styles.container}>

            <Text style = {styles.roomNameText}>
                {roomname}
            </Text>
            
            <View style = {styles.textInputBio}>
                <Text style = {styles.selectedTextHeader}>Topics: </Text>
                <Text style = {styles.selectedText}>{topics}</Text>
            </View>

            <View style = {styles.textInputBio}>
                <Text style = {styles.selectedTextHeader}>Users: </Text>
                
                <FlatList
                data={displayArray}
                renderItem={renderUserItem}
                style = {styles.flatList}/>
            </View>

            <View>
            <TouchableOpacity
                style = {styles.button}
                onPress = {() => {
                    // props.navigation.navigate('Chat'); navigate back to ChatScreen.?????
                    handleLeaveChat();
                }
                }>
                <Text style ={styles.buttonText}>Leave Chat</Text>
            </TouchableOpacity>
            </View>
        </Screen>
    )
}