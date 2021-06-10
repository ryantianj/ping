import React, {useEffect, useState} from "react";
import {
    Text,
    TouchableOpacity,
    FlatList,
    View,
} from "react-native";
import { roomsCollection } from '../../../../api/firebase';
import { fillGroupRoomState } from '../../../roomsSlice';
import { useDispatch } from 'react-redux';
import store from '../../../store';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Screen from "../../../components/Screen";
import styles from '../../../styling/screens/In_App/app/GroupScreen.styles';

import { useIsFocused } from "@react-navigation/native";

const roomsData = []; // array of room objects

export default (props) => {
    const isFocused = useIsFocused();

    const [count, setCount] = useState(0)
    
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

    let rooms = store.getState().user.user.rooms;

    const getAllGroups = async () => {
        rooms = await store.getState().user.user.rooms;
        console.log(rooms)
        roomsData.length = 0;
        const isGroup = (roomDataObject) => { return roomDataObject.type === 1 }
        rooms.forEach(async roomid => {
            const roomData = await roomsCollection.doc(roomid).get()
            const roomDataObject = roomData.data();
            roomDataObject['roomid'] = roomid;
            isGroup(roomDataObject) ? roomsData.push(roomDataObject) : 
            setCount(count + 1)
        });
    }

    if (count === 0) {
        getAllGroups()
        setCount(count + 1)
    }
    // useEffect(() => {
    //     getAllGroups()
    //     console.log('rerendered')
    // }, [isFocused])

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
                extraData={count}/>
        
        </Screen>
    )
}