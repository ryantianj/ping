import React, { useState, useEffect } from "react";
import {Alert, FlatList, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import firebase, {usersCollection, roomsCollection} from "../../../../../api/firebase";
import 'react-native-gesture-handler';
import { fillUserState } from '../../../../usersSlice';
import { useDispatch } from 'react-redux';

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from '../../../../styling/screens/In_App/app/chats/ChatRoomSettingsScreen.styles';

export default (props) => {
    const dispatch = useDispatch();
    const [displayArray, setDisplayArray] = useState([]);
    const [loading, isLoading] = useState(false);
    const [loading1, isLoading1] = useState(false);
    
    const uid = store.getState().user.user.uid;
    const roomid = store.getState().room.room.roomid;
    const roomname = store.getState().room.room.roomname;
    const topics = store.getState().room.room.topics.join(", ");

    useEffect(() => {
        isLoading1(true)
        const fetchFriends = roomsCollection.doc(roomid)
            .onSnapshot(snapshot => {
                const firebase = snapshot.data()
                const users = firebase.users
                fetchUserData(users)
            })

        const fetchUserData = async (userArray) => {
            const temp = [];

            for (const user in userArray) {
                const data = await usersCollection.doc(userArray[user]).get()
                const userData = data.data()
                temp.push(userData)

            }
            setDisplayArray(temp)
            isLoading1(false)
        }
        return () => {
            fetchFriends()
        }
    }, [])

    const renderUserItem = ({item}) => {
        return (
            <TouchableOpacity
                style = {styles.textInputBio}
                onPress = {() => props.navigation.navigate("ViewProfileChannel", {user : item})}
            >
                <Text style = {styles.userText}>{item.display}</Text>
            </TouchableOpacity>
        )
    }

    const leaveChat = async () => {
        isLoading(true);
        await usersCollection
            .doc(uid)
            .update({
                'rooms': firebase.firestore.FieldValue.arrayRemove(roomid)
            })
            .then(() => {
                console.log('Removed room from user db!');
            });
        await roomsCollection
            .doc(roomid)
            .update({
                'users': firebase.firestore.FieldValue.arrayRemove(uid)
            })
            .then(() => {
                console.log('Removed user from room db!');
            });

        dispatch(fillUserState(uid)).then(() => {
            Alert.alert("Leave Chat", "You have left the chat.")
            props.navigation.navigate("Chat")
            isLoading(false);
        })
    }

    const handleLeaveChat = async () => {
        Alert.alert("Leave Chat", "Are you sure you want to leave this chat?",
        [
            {
                text: "Yes",
                onPress: () => {
                    leaveChat();
                },
            },
            {
                text: "No",
                onPress: () => {},
            }
        ])
    }

    return (
        <Screen style = {styles.container}>

            <Text style = {styles.roomNameText}>
                {roomname}
            </Text>
            
            <View style = {styles.textInputBio}>
                <Text style = {styles.selectedTextHeader}>Topics: </Text>
                <Text style = {styles.selectedText}>{topics}</Text>
                <Text style = {styles.selectedTextHeader}>Users: </Text>
            </View>

            <View style = {styles.flatListView}>
                <FlatList
                    data={displayArray}
                    renderItem={renderUserItem}
                    style = {styles.flatList}/>
                {loading1 && <View style = {styles.loading}>
                    <ActivityIndicator size="large" color={styles.loadingColour.color} />
                    <Text>
                        Loading Users
                    </Text>
                </View>
                }
            </View>


            <TouchableOpacity
                style = {styles.button}
                onPress = { async () => { await handleLeaveChat() }}
            >
                <Text style ={styles.buttonText}>Leave Chat</Text>
            </TouchableOpacity>

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Leaving Chat
                </Text>
            </View>
            }
        </Screen>
    )
}