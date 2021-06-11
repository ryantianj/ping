import React, { useState, useEffect } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList, ScrollView
} from "react-native";

import firebase, { usersCollection, roomsCollection, interestsCollection } from "../../../../../api/firebase";
import Screen from "../../../../components/Screen";
import { fillGroupRoomState } from "../../../../roomsSlice";
import { fillUserState } from "../../../../usersSlice";
import { useDispatch } from 'react-redux';
import store from "../../../../store";

import styles from '../../../../styling/screens/In_App/app/groups/JoinCreateGroupRoomScreen.styles';

export default (props) => {
    const [interests, setInterests] = useState([]); // Server-side choice list
    const [selectInterests, setSelectInterests] = useState([]); // Client-side choices
    const [roomname, setRoomName] = useState("");
    const [selectedFriends, setSelectedFriends] = useState([]); // user object of selected
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(false);
    const [friendsUserArray, setFriendsUserArray] = useState([]);
    const [selectedId, setSelectedId] = useState(0); // Render component when selected
    const dispatch = useDispatch();
  
    function useForceUpdate() {
        console.log("force updated")
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

    const CreateGroupRoom = async () => {

        const uid = store.getState().user.user.uid;
        let roomid = "";
        // create room on firebase
        const roomUsersUidArray = [];
        roomUsersUidArray.push(uid);
        selectedFriends.forEach(selectedfriend => {
            roomUsersUidArray.push(selectedfriend.item.uid);
        })
        await roomsCollection.add({
            roomname: roomname,
            topics: selectInterests,
            type: 1,
            users: roomUsersUidArray
        }).then((docRef) => {
            console.log("Room doc created with id: " + docRef.id);
            roomid = docRef.id;
        });

        // update both uid and selectedFriends' uids with the room ID
        roomUsersUidArray.forEach(async roomUserUid => {
            await usersCollection
            .doc(roomUserUid)
            .update({
                'rooms': firebase.firestore.FieldValue.arrayUnion(roomid)
            })
            .then(() => {
                console.log('Added room to users\' db!');
            });
        })

        // update global state with new room
        dispatch(fillGroupRoomState(roomid));
        dispatch(fillUserState(uid));
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

    const selectedFriendsContains = (userObject) => {
        console.log("Start of selectedFriendsContains. selectedFriends[]: " + selectedFriends)
        let count = 0;
        console.log("userobject uid: " + userObject.item.uid)
        for (let i = 0; i < selectedFriends.length; i++) {
            console.log("selectedfriend uid: " + selectedFriends[i].item.uid)
            console.log(userObject.item.uid === selectedFriends[i].item.uid)
            if (userObject.item.uid === selectedFriends[i].item.uid) {
                break;
            } else {
                count++;
            }
        }
        console.log('count: ' + count)
        if (count === selectedFriends.length || selectedFriends.length === 0) { return -1; }
        else { return count; }
        // selectedFriends.forEach(selectedfriend => {
        //     console.log(userObject.item.uid)
        //     console.log(selectedfriend.item.uid)
        //     console.log(userObject.item.uid === selectedfriend.item.uid)
        //     if (userObject.item.uid === selectedfriend.item.uid) { 
        //         console.log(count);
        //         break; // in selectedFriends, count is the index
        //     } else {
        //         count = count + 1;
        //     }
        // })
        // if (count === selectedFriends.length - 1) { return -1; }// not in selectedFriends
    }

    const renderFriendItem = ( userObject ) => {
        // console.log(selectedFriendsContains(userObject))
        // console.log(selectedFriendsContains(userObject) >= 0);
        if (selectedFriendsContains(userObject) >= 0) {
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
        const index = selectedFriendsContains(userObject);
        console.log(index)
        if (index >= 0) {
            selectedFriends.splice(index, 1); // deselect
            console.log('removing ' + userObject.item.uid + ' from array')
        } else {
            selectedFriends.push(userObject); // select
            console.log('adding ' + userObject.item.uid + ' to array')
        }
    }

    const displayDisplays = (selectedFriends) => {
        const displays = [];
        selectedFriends.forEach((selectedFriendObj) => {
            displays.push(selectedFriendObj.item.display)
        })
        return displays.join(", ");
    }

    return (
        <Screen style = {styles.container}>
        <ScrollView contentContainerStyle = {styles.scroll}
        >
            <Text style = {styles.headerText}>
                Create Group
            </Text>
            <View style = {styles.textInputGroupNameContainer}>
                <TextInput
                    multiline
                    style = {styles.textInputGroupName}
                    placeholder = "Group Room Name (1-20 characters)"
                    value = {roomname}
                    onChangeText = {setRoomName}
                    returnKeyType = "next"
                    onSubmitEditing = {() => nextInput.current.focus()}
                    blurOnSubmit={false}
                    maxLength = {20}
                />
            </View>

            <Text style = {styles.headerText1}>
                Start Group With:
                { ' ' + displayDisplays(selectedFriends) }
            </Text>

            <TouchableOpacity
                style = {styles.button}
                onPress = {async () => {
                    if (selectedFriends.length === 0) {
                        alert('Choose exactly one friend to proceed')
                        return;
                    }
                    if (roomname === "") {
                        alert('Please key in a roomname between 1-20 characters')
                        return;
                    }
                    await CreateGroupRoom();
                    // props.navigation.navigate("Chat");
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' }],
                    });
                }}
            >
                <Text style = {styles.buttonText}>Create Group Room</Text>
            </TouchableOpacity>
     
            <Text style = {styles.headerText1}>
                Select Friends
            </Text>

            <View style = {styles.flatListView}>
                <FlatList
                    nestedScrollEnabled
                    data={friendsUserArray}
                    extraData={selectedId}
                    renderItem={renderFriendItem}
                    keyExtractor={item => item}
                    style = {styles.flatList}/>
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
        </Screen>
    )
}