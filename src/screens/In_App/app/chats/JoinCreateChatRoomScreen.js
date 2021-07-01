import React, { useState, useEffect } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList, ScrollView, Alert, ActivityIndicator
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import firebase, { usersCollection, roomsCollection, interestsCollection } from "../../../../../api/firebase";
import Screen from "../../../../components/Screen";
import { fillChatRoomState } from "../../../../roomsSlice";
import { fillUserState } from "../../../../usersSlice";
import { useDispatch } from 'react-redux';
import store from "../../../../store";

import styles from '../../../../styling/screens/In_App/app/chats/JoinCreateChatRoomScreen.styles';

export default (props) => {
    const [interests, setInterests] = useState([]); // Server-side choice list
    const [selectInterests, setSelectInterests] = useState([]); // Client-side choices
    const [roomname, setRoomName] = useState("");
    const [selectedFriend, setSelectedFriend] = useState({item:{display: "______"}}); // user object of selected
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(false);
    const [friendsUserArray, setFriendsUserArray] = useState([]);
    const [selectedId, setSelectedId] = useState(0); // Render component when selected
    const [loading, isLoading] = useState(false);
    const [loading1, isLoading1] = useState(false);

    const dispatch = useDispatch();
    const friends = store.getState().user.user.friends
    const uid = store.getState().user.user.uid
  
    function useForceUpdate() {
        setValue(!value); // update the state to force render
    }

    const addUser = (item) => {
        friendsUserArray.push(item)
        setValue(!value);
         friends.length === friendsUserArray.length ? isLoading1(false) : isLoading1(true);
    }

    if (count === 0) {
        isLoading1(true);
        friends.forEach( uid => {
            usersCollection.doc(uid).get()
                .then((user) => addUser(user.data())).then(()=> {
                useForceUpdate()
                });
        })
        setCount(count + 1)
    }

    const CreateChatRoom = async () => {

        const uid = uid;
        let roomid = "";
        // create room on firebase
        await roomsCollection.add({
            roomname: roomname,
            topics: selectInterests,
            type: 0,
            users: [
                uid,
                selectedFriend.item.uid
            ]
        }).then((docRef) => {
            roomid = docRef.id;
        });

        // update both uid and selectedFriend's uid with the room ID
        await usersCollection
            .doc(uid)
            .update({
                'rooms': firebase.firestore.FieldValue.arrayUnion(roomid)
            })
        await usersCollection
            .doc(selectedFriend.item.uid)
            .update({
                'rooms': firebase.firestore.FieldValue.arrayUnion(roomid)
            })


        // update global state with new room
        dispatch(fillChatRoomState(roomid));
        await dispatch(fillUserState(uid));
        
        // check if work? if doesn't render changes then useIsFocused
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
                        setSelectedId(selectedId - 1);
                        selectInterestItem(item);
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

    const renderFriendItem = ( userObject ) => {
        if (selectedFriend.item.display === userObject.item.display) { // compare display
            return (
                <TouchableOpacity
                    style = {styles.renderItem}
                    onPress = {() => {
                        setSelectedId(selectedId + 1);
                        selectFriendItem(userObject);
                        setValue(!value);
                    }}
                >
                    <Text style = {styles.selectedText}>{userObject.item.display}</Text>
                </TouchableOpacity>)
        } else {
            return (
                <TouchableOpacity
                    style = {styles.unRenderItem}
                    onPress = {() => {
                        setSelectedId(selectedId - 1);
                        selectFriendItem(userObject);
                        setValue(!value);
                    }}
                >
                    <Text style = {styles.unselectedText}>{userObject.item.display}</Text>
                </TouchableOpacity>
            )
        }
    }

    const selectFriendItem = (userObject) => {
        if (selectedFriend.item.display === userObject.item.display) {
            setSelectedFriend({item: {display: "______"}}); // deselect
        } else {
            setSelectedFriend(userObject); // select
        }
    }

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
                    placeholder = "Chat Name (1-20 characters)"
                    value = {roomname}
                    onChangeText = {setRoomName}
                    returnKeyType = "next"
                    onSubmitEditing = {() => nextInput.current.focus()}
                    blurOnSubmit={false}
                    maxLength = {20}
                />
            </View>

            <Text style = {styles.headerText1}>
                Start Chat With: { selectedFriend.item.display }
            </Text>

            <TouchableOpacity
                style = {styles.button}
                onPress = {async () => {
                    if (selectedFriend.item.display === "______") {
                        Alert.alert('Choose exactly one friend to proceed')
                        return;
                    }
                    if (roomname === "") {
                        Alert.alert('Please key in a roomname between 1-20 characters')
                        return;
                    }
                    isLoading(true)
                    await CreateChatRoom().then(() => {
                        props.navigation.navigate('Chat')
                        isLoading(false)
                    })
                }}
            >
                <Text style = {styles.buttonText}>Create Chat Room</Text>
            </TouchableOpacity>
           
            <Text style = {styles.headerText1}>
                Select Friend
            </Text>

            <View style = {styles.flatListView}>
                <FlatList
                    nestedScrollEnabled
                    data={friendsUserArray}
                    extraData={selectedId}
                    renderItem={renderFriendItem}
                    keyExtractor={item => item.uid}
                    style = {styles.flatList}/>
                {loading1 && <View style = {styles.loading}>
                    <ActivityIndicator size="large" color={styles.loadingColour.color} />
                    <Text>
                        Loading Friends
                    </Text>
                </View>
                }
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

        </ScrollView>

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Creating Chat
                </Text>
            </View>
            }
        </Screen>
    )
}