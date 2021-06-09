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
    const [roomname, setRoomName] = useState("");
    // const [friends, setFriends] = useState([]); // List of friend's uids
    const [selectedFriend, setSelectedFriend] = useState({display: "______"}); // user object of selected
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(false);
    const [friendsUserArray, setFriendsUserArray] = useState([]);

    const uid = store.getState().user.user.uid;

    const getAllFriends =  async () => {
        // const data = await usersCollection.doc(uid).get();
        // friendsUidArray = await data.data().friends;

        // console.log(friendsDisplayArray);
    }
    function useForceUpdate() {
        console.log("updated")
        setValue(!value); // update the state to force render
    }

    const addUser = (item) => {
        friendsUserArray.push(item)
        console.log("added")
        console.log(friendsUserArray)
        setValue(!value);
    }

    if (count === 0) {
        store.getState().user.user.friends.forEach( uid => {
            usersCollection.doc(uid).get()
                .then((user) => addUser(user.data())).then(()=> {
                useForceUpdate()
                });
        })
        setCount(count + 1)
    }

    const CreateChatRoom = async () => {

    }

    const renderFriendItem = ( userObject ) => {
        console.log("inside")
        console.log(userObject)
        console.log(userObject.item.display)
        if (selectedFriend === userObject) { // compare uids
            return (
                <TouchableOpacity
                    style = {styles.renderItem}
                    onPress = {() => {
                        selectItem(userObject);
                    }}
                >

                    <Text style = {styles.selectedText}>{userObject.item.display}</Text>
                </TouchableOpacity>)
        } else {
            return (
                <TouchableOpacity
                    style = {styles.unRenderItem}
                    onPress = {() => {
                        selectItem(userObject);
                    }}
                >

                    <Text style = {styles.unselectedText}>{userObject.item.display}</Text>
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

    }
    


    // if (friendsUserArray.length === 0) {
    //     mapUidArrayToUserArray(store.getState().user.user.friends);
    // }





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

            <TouchableOpacity
                style = {styles.button}
                onPress = {() => {
                    console.log(value)
                    setValue(!value)
                }}>
                <Text style = {styles.buttonText}>Test</Text>
            </TouchableOpacity>

            <Text style = {styles.headerText1}>
                Select Friend
            </Text>

            <View style = {styles.flatListView}>
                <FlatList
                    nestedScrollEnabled
                    data={friendsUserArray}
                    renderItem={renderFriendItem}
                    keyExtractor={item => item}
                    style = {styles.flatList}/>
            </View>

        </ScrollView>

        </Screen>
    )
}