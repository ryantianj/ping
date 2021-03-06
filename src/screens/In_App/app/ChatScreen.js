import React, {useEffect, useState} from "react";
import {
    Text,
    TouchableOpacity,
    FlatList,
    View, ActivityIndicator,
} from "react-native";
import {roomsCollection, usersCollection} from '../../../../api/firebase';
import { fillChatRoomState } from '../../../roomsSlice';
import { useDispatch } from 'react-redux';
import store from '../../../store';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/ChatScreen.styles';

import { useIsFocused } from "@react-navigation/native";


export default (props) => {
    const isFocused = useIsFocused();
    const [roomsData, setRoomsData] = useState([])
    const [len, setLen] = useState(0);
    const [loading, isLoading] = useState(false);
    const [loading1, isLoading1] = useState(false);

    const renderChatItem = ( room ) => {
        return (
            <TouchableOpacity
                style = {styles.chatsList}
                onPress = {
                    () => {
                        isLoading(true)
                        dispatch(fillChatRoomState(room.item.roomid))
                            .then(() => {
                                props.navigation.navigate('ChatRooms',{ screen: 'ChatRoom' })
                                isLoading(false)
                            })

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

    useEffect(() => {
        isLoading1(true)
        const chatListener = usersCollection.doc(store.getState().user.user.uid)
            .onSnapshot(snapshot => {
                const isChat = (roomDataObject) => { return roomDataObject.type === 0 }
                const firebase = snapshot.data()
                const chatArray = firebase.rooms
                const chatObjectArray = [];
                chatArray.forEach(roomId => {
                        roomsCollection.doc(roomId).get()
                            .then((roomData) => {
                                const roomDataObject = roomData.data()
                                roomDataObject['roomid'] = roomId;
                                if (isChat(roomDataObject)) {
                                    chatObjectArray.push(roomDataObject)
                                    chatObjectArray.sort(function (room1, room2) {
                                        const room1Create = room1.latestMessage.createdAt
                                        const room2Create = room2.latestMessage.createdAt
                                        if (room1Create < room2Create) {
                                            return 1
                                        } else if (room1Create === room2Create) {
                                            return 0
                                        } else {
                                            return -1
                                        }
                                    })
                                } else {
                                    setLen(len + 1)
                                }


                            })
                    }
                )
                setRoomsData(chatObjectArray)
                isLoading1(false);
            })
        return () => {
            chatListener()
        };
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
                extraData={roomsData}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
            {loading1 && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Loading Chats
                </Text>
            </View>
            }

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Loading Chat
                </Text>
            </View>
            }

        </Screen>
    )
}