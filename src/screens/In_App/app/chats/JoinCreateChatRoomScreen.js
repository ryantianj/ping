import React, { useState, useEffect } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList, ScrollView
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { usersCollection } from "../../../../../api/firebase";
import Screen from "../../../../components/Screen";
import { fillRoomState } from "../../../../roomsSlice";
import store from "../../../../store";

import styles from '../../../../styling/screens/In_App/app/chats/JoinCreateChatRoomScreen.styles';

export default (props) => {
    const isFocused = useIsFocused();

    const [roomname, setRoomName] = useState("");
    // const [friends, setFriends] = useState([]); // List of friend's uids
    const [selectedFriend, setSelectedFriend] = useState({display: "______"}); // user object of selected
    const [count, setCount] = useState(0)

    const uid = store.getState().user.user.uid;

    let friendsUserArray = [];

    const CreateChatRoom = async () => {

    }

    const renderFriendItem = ( {userObject} ) => {
        if (selectedFriend === userObject) { // compare uids
            return (
                <TouchableOpacity
                    style = {styles.renderItem}
                    onPress = {() => {
                        selectItem(userObject);
                        setCount(count + 1);
                    }}
                >
                    {console.log(userObject.display)}
                    <Text style = {styles.selectedText}>{userObject.display}</Text>
                </TouchableOpacity>)
        } else {
            return (
                <TouchableOpacity
                    style = {styles.unRenderItem}
                    onPress = {() => {
                        selectItem(userObject);
                        setCount(count + 1);
                    }}
                >
                    {console.log(userObject.display)}
                    <Text style = {styles.unselectedText}>{userObject.display}</Text>
                </TouchableOpacity>
            )
        }
    }

    const selectItem = (userObject) => {
        if (selectedFriend === userObject) {
            setSelectedFriend({display: "______"}); // deselect
        } else {
            setSelectedFriend(userObject); // select
        }
        setCount(count + 1);
    }
    
    const mapUidArrayToUserArray = async (uidArray) => {
        uidArray.forEach(async uid => {
            const user = await usersCollection.doc(uid).get();
            addUser(user.data());
        })
    }

    // if (friendsUserArray.length === 0) {
    //     mapUidArrayToUserArray(store.getState().user.user.friends);
    // }

    const addUser = (item) => {
        friendsUserArray.push(item)
        setCount(count + 1)
        console.log(friendsUserArray)
    }

    const getAllFriends = async () => { 
        // const data = await usersCollection.doc(uid).get();
        // friendsUidArray = await data.data().friends;
        const friendsUidArray = store.getState().user.user.friends;
        // setFriends(friendsUidArray);
        console.log(friendsUidArray);
        
        await mapUidArrayToUserArray(friendsUidArray);
        console.log(friendsUserArray)
        // console.log(friendsDisplayArray);
        setCount(count + 1);
    }

    useEffect(() => {
        getAllFriends();
    }, [isFocused]);

    return (
        <Screen style = {styles.container}>
        <ScrollView contentContainerStyle = {styles.scroll}
        >
            <Text style = {styles.headerText}>
                Create Chat
            </Text>
            <View style = {styles.textInputChatNameContainer}>
                <TextInput
                    multiline
                    style = {styles.textInputChatName}
                    placeholder = "Chat Room Name"
                    value = {roomname}
                    onChangeText = {setRoomName}
                    returnKeyType = "next"
                    onSubmitEditing = {() => nextInput.current.focus()}
                    blurOnSubmit={false}
                    maxLength = {20}
                />
            </View>

            <Text style = {styles.headerText1}>
                Start Chat With: { selectedFriend.display }
            </Text>

            <TouchableOpacity
                style = {styles.button}
                onPress = {() => {
                    CreateChatRoom();
                    props.navigation.navigate("ChatRoom");
                    // fillRoomState(roomid);
                }}
                // {bios: bio, selectInterests: selectInterests.sort(), visibility: visibility,
                        // display: display, update: false}
            >
                <Text style = {styles.buttonText}>Create Chat Room</Text>
            </TouchableOpacity>

            <Text style = {styles.headerText1}>
                Select Friend
            </Text>

            <View style = {styles.flatListView}>
                {console.log(friendsUserArray)}
                <FlatList
                    nestedScrollEnabled
                    data={friendsUserArray}
                    renderItem={renderFriendItem}
                    extraData={count}
                    keyExtractor={item => item}
                    style = {styles.flatList}/>
            </View>

        </ScrollView>

        </Screen>
    )
}