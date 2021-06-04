import React, {useEffect, useState} from "react";
import {Text, TextInput, TouchableOpacity, FlatList, View, Image, Pressable, KeyboardAvoidingView} from "react-native";
import { roomsCollection } from '../../../../api/firebase';
import { fillRoomState } from '../../../roomsSlice';
import { useDispatch } from 'react-redux';
import store from '../../../store';

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/ChatScreen.styles';
import colours from "../../../constants/colours";

const roomsData = []; // array of room objects

export default (props) => {
    const [count, setCount] = useState(0)
    const renderChatItem = ( room ) => {
        return (
            <TouchableOpacity
                style = {styles.chatsList}
                onPress = {
                    () => {
                        props.navigation.navigate('ChatRoom');
                        dispatch(fillRoomState(room.item.roomid));
                    }
                }
            >

                {console.log(room)}
                {console.log(room.item.roomid)}
                <Text style = {styles.chats}>{room.item.roomname}</Text>
            </TouchableOpacity>
            );

    }

    const dispatch = useDispatch();

    const rooms = store.getState().user.user.rooms;

    const getAllChats = () => {
        rooms.forEach(async roomid => {
            const roomData = await roomsCollection.doc(roomid).get()
            const roomDataObject = roomData.data();
            roomDataObject['roomid'] = roomid;
            const response = await roomsData.push(roomDataObject)
            // const response = await roomsData.push(roomData.data())
            setCount(count + 1)
        });
    }

    useEffect(() => {
        getAllChats()
    }, [])

    return (
        <Screen style = {styles.container}>

            <Text
                style = {styles.chatsText}>
                Your Chats
            </Text>

            <FlatList
                style = {styles.flatList}
                data = {roomsData}
                renderItem = {renderChatItem}
                extraData={count}/>
        
        </Screen>
    )
}