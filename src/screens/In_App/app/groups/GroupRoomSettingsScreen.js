import React, { useState } from "react";
import {Alert, FlatList, Text, TextInput, TouchableOpacity, View, ScrollView, ActivityIndicator} from "react-native";
import firebase, { usersCollection, roomsCollection } from "../../../../../api/firebase";
import 'react-native-gesture-handler';
import { fillGroupRoomState } from "../../../../roomsSlice";
import { useDispatch } from 'react-redux';
import { fillUserState } from "../../../../usersSlice";

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from '../../../../styling/screens/In_App/app/groups/GroupRoomSettingsScreen.styles';

export default (props) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [displayArray, setDisplayArray] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]); // user object of selected
    const [friendsUserArray, setFriendsUserArray] = useState([]);
    const [selectedId, setSelectedId] = useState(0); // Render component when selected
    const [value, setValue] = useState(false);
    const [loading, isLoading] = useState(false);
    
    const mapUidToUserName = (uidArray) => {
        uidArray.forEach(async uid => {
            const user = await usersCollection.doc(uid).get();
            addUser1(user.data());
        })
    }

    const mapUidToUserName2 = (uidArray, friendsArray) => {
        friendsArray.forEach(async uid => {
            if (!uidArray.includes(uid)) {
                const user = await usersCollection.doc(uid).get();
                addUser2(user.data());
            }
        })
    }
    
    const uid = store.getState().user.user.uid;
    const roomid = store.getState().room.room.roomid;
    const roomname = store.getState().room.room.roomname;
    const topics = store.getState().room.room.topics.join(", ");

    if (displayArray.length === 0) {
        mapUidToUserName(store.getState().room.room.users)
    }

    if (friendsUserArray.length === 0 && count === 0) {
        mapUidToUserName2(store.getState().room.room.users, store.getState().user.user.friends)
    }


    const addUser1 = (item) => {
        displayArray.push(item)
        setCount(count + 1)
    }
    
    const addUser2 = (item) => {
        friendsUserArray.push(item)
        setCount2(count2 + 1)
    }
    
    const renderUserItem = ({item}) => {
        return (
            <TouchableOpacity
                style = {styles.textInputBio}
                onPress = {() => props.navigation.navigate("ViewProfileChannel", {user : item})}
            >
                <Text style = {styles.selectedText}>{item.display}</Text>
            </TouchableOpacity>
        )
    }



    const selectedFriendsContains = (userObject) => {
        let loopcount = 0;
        for (let i = 0; i < selectedFriends.length; i++) {
            if (userObject.item.uid === selectedFriends[i].item.uid) {
                break;
            } else {
                loopcount++;
            }
        }
        if (loopcount === selectedFriends.length || selectedFriends.length === 0) { return -1; }
        else { return loopcount; }
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

    const handleAddMembers = async () => {
        let roomid = store.getState().room.room.roomid;

        // add selectedFriends to room data
        selectedFriends.forEach(async friend => {
            await roomsCollection.doc(roomid).update({
                'users': firebase.firestore.FieldValue.arrayUnion(friend.item.uid)
            }).then(() => {
                console.log("Room doc updated!");
            });
        })

        // add room to selectedFriends' data
        selectedFriends.forEach(async newRoomUser => {
            await usersCollection
            .doc(newRoomUser.item.uid)
            .update({
                'rooms': firebase.firestore.FieldValue.arrayUnion(roomid)
            })
            .then(() => {
                console.log('Added room to users\' db!');
            });
        })

        // update global state with new room
        dispatch(fillGroupRoomState(roomid));
    }

    const leaveGroup = async () => {
        isLoading(true);
        await usersCollection
            .doc(uid)
            .update({
                'rooms': firebase.firestore.FieldValue.arrayRemove(roomid)
            })
            .then(() => {
                console.log('Removed room from user db!');
            });
        await roomsCollection
            .doc(roomid)
            .update({
                'users': firebase.firestore.FieldValue.arrayRemove(uid)
            })
            .then(() => {
                console.log('Removed user from room db!');
            });
        
        Alert.alert("Leave Group", "You have left the group.")

        dispatch(fillUserState(uid)).then(() => {
            props.navigation.navigate("Group")
            isLoading(false);
        })
    }

    const handleLeaveGroup = async () => {
        Alert.alert("Leave Group", "Are you sure you want to leave this group?",
        [
            {
                text: "Yes",
                onPress: () => {
                    leaveGroup();
                },
            },
            {
                text: "No",
                onPress: () => {},
            }
        ])
    }

    return (
        <Screen style = {styles.container}>
        <ScrollView contentContainerStyle = {styles.scroll}>

            <Text style = {styles.roomNameText}>
                {roomname}
            </Text>
            
            <View style = {styles.textInputBio}>
                <Text style = {styles.selectedTextHeader}>Topics: </Text>
                <Text style = {styles.selectedText}>{topics}</Text>
            </View>

            <View style = {styles.textInputBio}>
                <Text style = {styles.selectedTextHeader}>Users: </Text>
            </View>

            <View style = {styles.flatListView}> 
                <FlatList
                    nestedScrollEnabled
                    data={displayArray}
                    renderItem={renderUserItem}
                    style = {styles.flatList}/>
            </View>

            <Text style = {styles.roomNameText}>
                Add Friends as Members:
            </Text>
            
            <View style = {styles.flatListView}>
                <FlatList
                    nestedScrollEnabled
                    data={friendsUserArray}
                    renderItem={renderFriendItem}
                    keyExtractor={item => item}
                    style = {styles.flatList}/>
            </View>

            <TouchableOpacity
                style = {styles.buttonblack}
                onPress = {async () => {
                    await handleAddMembers();
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'GroupRoom' }],
                    });
                }
                }>
                <Text style ={styles.buttonText}>Add Members</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style = {styles.buttonred}
                onPress = {async () => { await handleLeaveGroup() }}
            >
                <Text style ={styles.buttonText}>Leave Group</Text>
            </TouchableOpacity>
        
        </ScrollView>

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Leaving Group
                </Text>
            </View>
            }
        </Screen>
    )
}