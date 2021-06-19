import React, {useEffect, useState} from "react";
import {
    Text,
    TouchableOpacity,
    FlatList,
    View,
} from "react-native";
import {channelsCollection, roomsCollection, usersCollection} from '../../../../api/firebase';
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
    
    const renderGroupItem = ( room ) => {
        return (
            <TouchableOpacity
                style = {styles.groupsList}
                onPress = {
                    () => {
                        dispatch(fillGroupRoomState(room.item.roomid))
                            .then(() => props.navigation.navigate('GroupRooms',{ screen: 'GroupRoom' }))
                    }
                }
            >
                <Text style = {styles.groups}>{room.item.roomname}</Text>
            </TouchableOpacity>
            );
    }

    const dispatch = useDispatch();

    useEffect(() => {
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
                                isGroup(roomDataObject) ?  groupObjectArray.push(roomDataObject)
                                    : setLen(len + 1)
                            })
                    }
                )
                setRoomsData(groupObjectArray)
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
        </Screen>
    )
}