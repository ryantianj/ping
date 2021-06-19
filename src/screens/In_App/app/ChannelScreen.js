import React, {useEffect, useState} from "react";
import {View, FlatList, Text, TouchableOpacity} from "react-native";

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/ChannelScreen.styles';
import Ionicons from "react-native-vector-icons/Ionicons";
import {fillChannelRoomState} from "../../../roomsSlice";
import {useDispatch} from "react-redux";
import store from "../../../store";
import {channelsCollection, usersCollection} from "../../../../api/firebase";

import { useIsFocused } from "@react-navigation/native";


export default (props) => {
    const isFocused = useIsFocused();
    const [roomsData, setRoomsData] = useState([]);

    const renderChannelItem = ( room ) => {
        return (
            <TouchableOpacity
                style = {styles.channelList}
                onPress = {
                    () => {
                        dispatch(fillChannelRoomState(room.item.roomid))
                            .then(() => props.navigation.navigate('Channels',{ screen: 'ChannelRoom' }))

                    }
                }
            >
                <Text style = {styles.channel}>{room.item.roomname}</Text>
            </TouchableOpacity>
        );
    }

    const dispatch = useDispatch();


    useEffect(() => {
        const channelListener = usersCollection.doc(store.getState().user.user.uid)
            .onSnapshot(snapshot => {
                const firebase = snapshot.data()
                const channelArray = firebase.channels
                const channelObjectArray = [];
                channelArray.forEach(channelId => {
                    channelsCollection.doc(channelId).get()
                        .then((roomData) => {
                            const roomDataObject = roomData.data()
                            roomDataObject['roomid'] = channelId;
                            channelObjectArray.push(roomDataObject)
                        })
                    }
                )
                setRoomsData(channelObjectArray)
            })
        return () => {
            channelListener()
        };
    }, [])


    return (
        <Screen style = {styles.container}>
            <View style = {styles.viewText}>
                <Text
                    style = {styles.channelsText}>
                    Your Channels
                </Text>
                <TouchableOpacity
                    style = {styles.touchable}
                    onPress = {() => props.navigation.navigate('Channels',{ screen: 'CreateChannel' })}
                >
                    <Ionicons style = {styles.icon}
                              name={'add-outline'} size={35}  />
                </TouchableOpacity>

            </View>

            <FlatList
                style = {styles.flatList}
                data={roomsData}
                renderItem={renderChannelItem}
                extraData={roomsData}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </Screen>

    )
}