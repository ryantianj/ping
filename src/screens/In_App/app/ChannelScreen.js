import React, {useState} from "react";
import {View, FlatList, Text, TouchableOpacity} from "react-native";

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/ChannelScreen.styles';
import Ionicons from "react-native-vector-icons/Ionicons";
import {fillChannelRoomState} from "../../../roomsSlice";
import {useDispatch} from "react-redux";
import store from "../../../store";
import {channelsCollection} from "../../../../api/firebase";

import { useIsFocused } from "@react-navigation/native";


export default (props) => {
    const [count, setCount] = useState(0)
    const [roomsData, setRoomsData] = useState([]);
    const [len, setLen] = useState(0);

    const isFocused = useIsFocused();

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

    let channels = store.getState().user.user.channels;

    const getAllChannels = async () => {
        channels = await store.getState().user.user.channels;
        channels.forEach(async roomid => {
            const roomData = await channelsCollection.doc(roomid).get()
            const roomDataObject = roomData.data();
            roomDataObject['roomid'] = roomid;
            roomsData.push(roomDataObject)
            setCount(count + 1)
            setLen(len + 1)
        })
    }
    if (count === 0) {
        getAllChannels()
        setCount(count + 1)
    }

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
               extraData={len}
               contentContainerStyle={{ paddingBottom: 20 }}
               />
        </Screen>

    )
}