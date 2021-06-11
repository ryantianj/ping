import React, {useEffect, useState} from "react";
import {
    Text,
    TouchableOpacity,
    FlatList,
    View,
} from "react-native";
import { roomsCollection } from '../../../../api/firebase';
import { fillChatRoomState } from '../../../roomsSlice';
import { useDispatch } from 'react-redux';
import store from '../../../store';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/ChatScreen.styles';

import { useIsFocused } from "@react-navigation/native";

const roomsData = []; // array of room objects

export default (props) => {
    const isFocused = useIsFocused();

    const [count, setCount] = useState(0)
    
    const renderChatItem = ( room ) => {
        return (
            <TouchableOpacity
                style = {styles.chatsList}
                onPress = {
                    () => {
                        dispatch(fillChatRoomState(room.item.roomid))
                            .then(() => props.navigation.navigate('ChatRooms',{ screen: 'ChatRoom' }))

                    }
                }
            >
                {/* {console.log(room)}
                {console.log(room.item.roomid)} */}
                <Text style = {styles.chats}>{room.item.roomname}</Text>
            </TouchableOpacity>
            );

    }

    const dispatch = useDispatch();

    let rooms = store.getState().user.user.rooms;

    const getAllChats = async () => {
        rooms = await store.getState().user.user.rooms;
        console.log(rooms)
        roomsData.length = 0;
        const isChat = (roomDataObject) => { return roomDataObject.type === 0 }
        rooms.forEach(async roomid => {
            const roomData = await roomsCollection.doc(roomid).get()
            const roomDataObject = roomData.data();
            roomDataObject['roomid'] = roomid;
            isChat(roomDataObject) ? roomsData.push(roomDataObject) : 
            setCount(count + 1)
        });
    }

    if (count === 0) {
        getAllChats()
        setCount(count + 1)
    }

    // useEffect(() => {
    //     getAllChats()
    //     console.log('rerendered')
    // }, [isFocused])

    return (
        <Screen style = {styles.container}>
            <View style = {styles.viewText}>
                <Text
                    style = {styles.chatsText}>
                    Your Chats
                </Text>
                <TouchableOpacity
                    style = {styles.touchable}
                    onPress = {() => props.navigation.navigate('ChatRooms',{ screen: 'JoinCreateRoom' })}
                     >
                    <Ionicons style = {styles.icon}
                              name={'add-outline'} size={35}  />
                </TouchableOpacity>

            </View>


            <FlatList
                style = {styles.flatList}
                data = {roomsData}
                renderItem = {renderChatItem}
                extraData={count}
                contentContainerStyle={{ paddingBottom: 20 }}
                />
        
        </Screen>
    )
}