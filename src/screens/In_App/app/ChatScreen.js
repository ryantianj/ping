import React, { useEffect } from "react";
import {Text, TextInput, TouchableOpacity, FlatList, View, Image, Pressable, KeyboardAvoidingView} from "react-native";
import { roomsCollection } from '../../../../api/firebase';
import { fillRoomState } from '../../../roomsSlice';
import { useDispatch } from 'react-redux';
import store from '../../../store';

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/ChatScreen.styles';

const roomsData = []; // array of room objects

export default (props) => {

    const renderChatItem = ( room ) => (
        <Item title={room.roomname}
        navi = {props.navigation}/>
    );

    const dispatch = useDispatch();

    const Item = (title , navi) => (
        <TouchableOpacity
            style = {styles.chatsList}
            onPress = {
                () => {
                    navi.navigate('ChatRoom');
                    // dispatch(fillRoomState(uid))
                }
            }
        >
            <Text style = {styles.chats}>Chat Room {title}</Text>
        </TouchableOpacity>
    );
    
    const rooms = store.getState().user.user.rooms;

    const getAllChats = () => {
        rooms.forEach(async roomid => {
            const roomData = await roomsCollection.doc(roomid).get();
            roomsData.push(roomData.data());
            console.log(roomData.data());
            console.log(roomData.data().roomname)
            console.log(roomsData);
            console.log(roomsData[0].roomname);
        });
    }

    useEffect(() => {
        getAllChats();
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
                renderItem = {renderChatItem}/>
        
        </Screen>
    )
}