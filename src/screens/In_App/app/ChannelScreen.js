import React, {useEffect, useState} from "react";
import {View, FlatList, Text, TouchableOpacity, ActivityIndicator} from "react-native";

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
    const [loading, isLoading] = useState(false);
    const [loading1, isLoading1] = useState(false);

    const renderChannelItem = ( room ) => {
        return (
            <TouchableOpacity
                style = {styles.channelList}
                onPress = {
                    () => {
                        isLoading(true)
                        dispatch(fillChannelRoomState(room.item.roomid))
                            .then(() => {
                                props.navigation.navigate('Channels',{ screen: 'ChannelRoom' })
                                isLoading(false)}
                            )
                    }
                }
            >
                <Text style = {styles.channel}>{room.item.roomname}</Text>
            </TouchableOpacity>
        );
    }

    const dispatch = useDispatch();


    useEffect(() => {
        isLoading1(true);
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
                            channelObjectArray.sort(function (room1, room2) {
                                const room1Create = room1.latestPost.createdAt
                                const room2Create = room2.latestPost.createdAt
                                if (room1Create < room2Create) {
                                    return 1
                                } else if (room1Create === room2Create) {
                                    return 0
                                } else {
                                    return -1
                                }
                            })
                        })
                    }
                )
                setRoomsData(channelObjectArray)
                isLoading1(false);
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
            {loading1 && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Loading Channels
                </Text>
            </View>
            }
            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Loading Channel
                </Text>
            </View>
            }
        </Screen>

    )
}