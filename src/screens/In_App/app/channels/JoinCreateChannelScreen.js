import React, { useState, useEffect } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList, ScrollView, ActivityIndicator
} from "react-native";

import firebase, {
    usersCollection,
    interestsCollection,
    channelsCollection
} from "../../../../../api/firebase";
import Screen from "../../../../components/Screen";
import { fillChannelRoomState } from "../../../../roomsSlice";
import { fillUserState } from "../../../../usersSlice";
import { useDispatch } from 'react-redux';
import store from "../../../../store";

import styles from '../../../../styling/screens/In_App/app/channels/JoinCreateChannelScreen.styles';

export default (props) => {
    const [interests, setInterests] = useState([]); // Server-side choice list
    const [selectInterests, setSelectInterests] = useState([]); // Client-side choices
    const [roomname, setRoomName] = useState("");
    const [selectedId, setSelectedId] = useState(0); // Render component when selected
    const [loading, isLoading] = useState(false);

    const dispatch = useDispatch();

    const CreateChannel = async () => {

        const uid = store.getState().user.user.uid;
        let roomid = "";
        // create room on firebase
        await channelsCollection.add({
            roomname: roomname,
            roomid : "",
            topics: selectInterests,
            type: 2,
            users: [uid],
            search: roomname.toLowerCase(),
            owner: uid
        }).then((docRef) => {
            roomid = docRef.id;
        }).then(() => {
            channelsCollection.doc(roomid).update({
                roomid: roomid,
                latestPost: {
                    text: 'Channel Created',
                    createdAt: new Date().getTime()
                }
            })
        });

        // update creator's uid with the room ID
        await usersCollection
            .doc(uid)
            .update({
                'channels': firebase.firestore.FieldValue.arrayUnion(roomid)
            })
        // update global state with new room
        await dispatch(fillChannelRoomState(roomid));
        await dispatch(fillUserState(uid));
    }



    const renderTopicItem = ( {item} ) => {
        if (selectInterests.includes(item)) {
            return (
                <TouchableOpacity
                    style = {styles.renderItem}
                    onPress = {() => {
                        setSelectedId(selectedId + 1);
                        selectInterestItem(item)
                    }}
                >
                    <Text style = {styles.selectedText}>{item}</Text>
                </TouchableOpacity>)
        } else {
            return (
                <TouchableOpacity
                    style = {styles.unRenderItem}
                    onPress = {() => {
                        if (selectInterests.length >= 2) {
                            alert("Maximum of 2 topics!")
                        } else {
                            setSelectedId(selectedId - 1);
                            selectInterestItem(item);
                        }
                    }}
                >
                    <Text style = {styles.unselectedText}>{item}</Text>
                </TouchableOpacity>
            )
        }
    }

    const selectInterestItem = (item) => {
        const index = selectInterests.indexOf(item)

        if (index >= 0) {
            selectInterests.splice(index, 1)
        } else {
            selectInterests.push(item)
        }


    }

    useEffect(() => {
        const subscriber = interestsCollection.onSnapshot(querySnapshot => {
            const interests = [];

            querySnapshot.forEach(documentSnapshot => {
                interests.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setInterests(interests[0].fields)
        });

        return () => subscriber();
    }, []);



    return (
        <Screen style = {styles.container}>
            <ScrollView contentContainerStyle = {styles.scroll}
            >
                <Text style = {styles.headerText}>
                    Create Channel
                </Text>
                <View style = {styles.textInputChatNameContainer}>
                    <TextInput
                        multiline
                        style = {styles.textInputChatName}
                        placeholder = "Channel Name (1-20 chars)"
                        value = {roomname}
                        onChangeText = {setRoomName}
                        returnKeyType = "next"
                        maxLength = {20}
                    />
                </View>


                <Text style = {styles.headerText1}>
                    Select Topics
                </Text>

                <View style = {styles.flatListView}>
                    <FlatList
                        nestedScrollEnabled
                        data={interests}
                        renderItem={renderTopicItem}
                        extraData={selectedId}
                        keyExtractor={item => item}
                        style = {styles.flatList}/>
                </View>

                <TouchableOpacity
                    style = {styles.button}
                    onPress = {async () => {
                        if (roomname === "") {
                            alert('Please key in a roomname between 1-20 characters')
                            return;
                        }
                        isLoading(true)
                        CreateChannel().then(() => {
                            props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'ChannelRoom' }],
                            });
                            isLoading(false)
                        })
                    }}
                >
                    <Text style = {styles.buttonText}>Create Channel</Text>
                </TouchableOpacity>
            </ScrollView>

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Creating Channel
                </Text>
            </View>
            }
        </Screen>
    )
}