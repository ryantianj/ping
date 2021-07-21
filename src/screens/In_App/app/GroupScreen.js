import React, {useEffect, useState} from "react";
import {
    Text,
    TouchableOpacity,
    FlatList,
    View, ActivityIndicator,
} from "react-native";
import {roomsCollection, usersCollection} from '../../../../api/firebase';
import { fillGroupRoomState } from '../../../roomsSlice';
import { useDispatch } from 'react-redux';
import store from '../../../store';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Screen from "../../../components/Screen";
import styles from '../../../styling/screens/In_App/app/GroupScreen.styles';

import { useIsFocused } from "@react-navigation/native";


export default (props) => {
    const isFocused = useIsFocused();
    const [roomsData, setRoomsData] = useState([]);
    const [len, setLen] = useState(0);
    const [loading, isLoading] = useState(false);
    const [loading1, isLoading1] = useState(false);
    
    const renderGroupItem = ( room ) => {
        return (
            <TouchableOpacity
                style = {styles.groupsList}
                onPress = {
                    () => {
                        isLoading(true);
                        dispatch(fillGroupRoomState(room.item.roomid))
                            .then(() => {props.navigation.navigate('GroupRooms',{ screen: 'GroupRoom' })
                            isLoading(false)})
                    }
                }
            >
                <Text style = {styles.groups}>{room.item.roomname}</Text>
            </TouchableOpacity>
            );
    }

    const dispatch = useDispatch();

    useEffect(() => {
        isLoading1(true)
        const groupListener = usersCollection.doc(store.getState().user.user.uid)
            .onSnapshot(snapshot => {
                const isGroup = (roomDataObject) => { return roomDataObject.type === 1 }
                const firebase = snapshot.data()
                const groupArray = firebase.rooms
                const groupObjectArray = [];
                groupArray.forEach(roomId => {
                        roomsCollection.doc(roomId).get()
                            .then((roomData) => {
                                const roomDataObject = roomData.data()
                                roomDataObject['roomid'] = roomId;
                                if (isGroup(roomDataObject)) {
                                    groupObjectArray.push(roomDataObject)
                                    groupObjectArray.sort(function (room1, room2) {
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
                setRoomsData(groupObjectArray)
                isLoading1(false)
            })
        return () => {
            groupListener()
        };
    }, [])



    return (
        <Screen style = {styles.container}>
            <View style = {styles.viewText}>
                <Text
                    style = {styles.groupsText}>
                    Your Groups
                </Text>
                <TouchableOpacity
                    style = {styles.touchable}
                    onPress = {() => props.navigation.navigate('GroupRooms',{ screen: 'JoinCreateGroupRoom' })}
                     >
                    <Ionicons style = {styles.icon}
                              name={'add-outline'} size={35}  />
                </TouchableOpacity>
            </View>

            <FlatList
                style = {styles.flatList}
                data = {roomsData}
                renderItem = {renderGroupItem}
                extraData={roomsData}
                contentContainerStyle={{ paddingBottom: 20 }}/>

            {loading1 && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Loading Groups
                </Text>
            </View>
            }

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Loading Group
                </Text>
            </View>
            }
        </Screen>
    )
}