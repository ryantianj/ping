import React, {useEffect, useState} from "react";
import {Alert, FlatList, Text, TextInput, TouchableOpacity, View, ScrollView, ActivityIndicator} from "react-native";
import firebase, {usersCollection, roomsCollection} from "../../../../../api/firebase";
import 'react-native-gesture-handler';
import { fillGroupRoomState } from "../../../../roomsSlice";
import { useDispatch } from 'react-redux';
import { fillUserState } from "../../../../usersSlice";

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from '../../../../styling/screens/In_App/app/groups/GroupRoomSettingsScreen.styles';

export default (props) => {
    const dispatch = useDispatch();
    const [displayArray, setDisplayArray] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]); // user object of selected
    const [friendsUserArray, setFriendsUserArray] = useState([]);
    const [selectedId, setSelectedId] = useState(0); // Render component when selected
    const [value, setValue] = useState(false);
    const [loading, isLoading] = useState(false);
    const [loading1, isLoading1] = useState(false);
    const [loading2, isLoading2] = useState(false);


    useEffect(() => {
        isLoading1(true)
        const fetchFriends = roomsCollection.doc(roomid)
            .onSnapshot(snapshot => {
                const firebase = snapshot.data()
                const users = firebase.users
                fetchUserData(users)
            })

        const fetchUserData = async (userArray) => {
            const temp = [];

            for (const user in userArray) {
                const data = await usersCollection.doc(userArray[user]).get()
                const userData = data.data()
                temp.push(userData)

            }
            setDisplayArray(temp)
            isLoading1(false)
        }
        return () => {
            fetchFriends()
        }
    }, [])

    const friendsArray = store.getState().user.user.friends;

    const filterFriends = (uidArray, friendsArray) => {
        const temp = [];
        friendsArray.forEach(uid => {
            if (!uidArray.includes(uid)) {
                temp.push(uid)
            }
        })
        return temp;
    }

    useEffect(() => {
        isLoading2(true)
        const fetchFriends = roomsCollection.doc(roomid)
            .onSnapshot(snapshot => {
                const firebase = snapshot.data()
                const users = firebase.users
                const filtered = filterFriends(users, friendsArray)
                fetchUserData(filtered)
            })
        const fetchUserData = async (userArray) => {
            const temp = [];

            for (const user in userArray) {
                const data = await usersCollection.doc(userArray[user]).get()
                const userData = data.data()
                temp.push(userData)

            }
            setFriendsUserArray(temp)
            isLoading2(false)
        }

        return () => {
            fetchFriends()
        }
    }, [])


    const uid = store.getState().user.user.uid;
    const roomid = store.getState().room.room.roomid;
    const roomname = store.getState().room.room.roomname;
    const topics = store.getState().room.room.topics.join(", ") === '' 
        ? 'none' : store.getState().room.room.topics.join(", ");

    const renderUserItem = ({item}) => {
        return (
            <TouchableOpacity
                style = {styles.flatListElem}
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

        if (selectedFriends.length === 0) {
            Alert.alert("Add User", "Please Select a User to Add")
        } else {
            // add selectedFriends to room data
            props.navigation.goBack()
            selectedFriends.forEach(async friend => {
                await roomsCollection.doc(roomid).update({
                    'users': firebase.firestore.FieldValue.arrayUnion(friend.item.uid)
                }).then(() => {

                });
            })

            // add room to selectedFriends' data
            // add system message for each new user
            selectedFriends.forEach(async newRoomUser => {
                await usersCollection
                    .doc(newRoomUser.item.uid)
                    .update({
                        'rooms': firebase.firestore.FieldValue.arrayUnion(roomid)
                    })
                    .then(() => {
                        console.log('Added room to users\' db!');
                    });

                await roomsCollection.doc(roomid).collection('Messages').doc().set({
                    text: newRoomUser.item.display + ' joined the room',
                    createdAt: new Date().getTime(),
                    system: true
                }).then(() => {
                    console.log("Update Room with system messages!");
                });
            })

            // update global state with new room
            dispatch(fillGroupRoomState(roomid))
        }
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
        await roomsCollection
            .doc(roomid).collection('Messages').doc()
            .set({
                text: store.getState().user.user.display + ' left the room',
                createdAt: new Date().getTime(),
                system: true
            }).then(() => {
                console.log("Update Room with system message!");
            });
        dispatch(fillUserState(uid)).then(() => {
            Alert.alert("Leave Group", "You have left the group.")
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
                <Text style = {styles.selectedTextHeader}>Users: </Text>
            </View>

            <View style = {styles.flatListView}> 
                <FlatList
                    nestedScrollEnabled
                    data={displayArray}
                    renderItem={renderUserItem}
                    keyExtractor={item => item.uid}
                    style = {styles.flatList}/>
                {loading1 && <View style = {styles.loading}>
                    <ActivityIndicator size="large" color={styles.loadingColour.color} />
                    <Text>
                        Loading Users
                    </Text>
                </View>
                }
            </View>

            <Text style = {styles.roomNameText1}>
                Add Friends as Members:
            </Text>
            
            <View style = {styles.flatListView}>
                <FlatList
                    nestedScrollEnabled
                    data={friendsUserArray}
                    renderItem={renderFriendItem}
                    keyExtractor={item => item.uid}
                    style = {styles.flatList}
                    contentContainerStyle={{ paddingBottom: 20 }}/>
                {loading2 && <View style = {styles.loading}>
                    <ActivityIndicator size="large" color={styles.loadingColour.color} />
                    <Text>
                        Loading Friends
                    </Text>
                </View>
                }

            </View>

            
        
        </ScrollView>

        <View style = {styles.base}>
            <TouchableOpacity
                style = {styles.buttonblack}
                onPress = {async () => {
                    await handleAddMembers();
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
        </View>

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