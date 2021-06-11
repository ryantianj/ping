import React, {useState} from "react";
import {View, FlatList, Text, TouchableOpacity} from "react-native";

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/ChannelScreen.styles';
import Ionicons from "react-native-vector-icons/Ionicons";
import {fillChatRoomState} from "../../../roomsSlice";
import {useDispatch} from "react-redux";
import store from "../../../store";
import {channelsCollection} from "../../../../api/firebase";

import { useIsFocused } from "@react-navigation/native";


export default (props) => {
    const [count, setCount] = useState(0)
    const [roomsData, setRoomsData] = useState([]);

    const isFocused = useIsFocused();

    const renderChannelItem = ( room ) => {
        return (
            <TouchableOpacity
                style = {styles.channelList}
            >
                <Text style = {styles.channel}>{room.item.roomname}</Text>
            </TouchableOpacity>
        );
    }

    const dispatch = useDispatch();

    let rooms = store.getState().user.user.rooms;

    const getAllChannels = async () => {
        rooms = await store.getState().user.user.rooms;
        rooms.forEach(async roomid => {
            const roomData = await channelsCollection.doc(roomid).get()
            const roomDataObject = roomData.data();
            roomDataObject['roomid'] = roomid;
            roomsData.push(roomDataObject)
        }).then(() => setCount(count + 1))
    }
    if (count === 0) {
        getAllChannels().then(() => this.forceUpdate())
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
               />
        </Screen>

    )
}