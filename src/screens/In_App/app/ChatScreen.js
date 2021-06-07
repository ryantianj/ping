import React, {useEffect, useState} from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    View,
    Image,
    Pressable,
    KeyboardAvoidingView,
    TouchableHighlight
} from "react-native";
import { roomsCollection } from '../../../../api/firebase';
import { fillRoomState } from '../../../roomsSlice';
import { useDispatch } from 'react-redux';
import store from '../../../store';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
                        dispatch(fillRoomState(room.item.roomid))
                            .then(() => props.navigation.navigate('ChatRooms',{ screen: 'ChatRoom' }))

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
                extraData={count}/>
        
        </Screen>
    )
}