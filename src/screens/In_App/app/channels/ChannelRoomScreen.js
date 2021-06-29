import React, { useEffect, useState} from "react";
import {Alert, FlatList, Text, TouchableOpacity, View} from "react-native";

import firebase, {
    channelsCollection, globalNotiCollection,
} from "../../../../../api/firebase";
import store from '../../../../store';

import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "../../../../styling/screens/In_App/app/channels/ChannelRoomScreen.styles"
import Screen from "../../../../components/Screen";

export default (prop) => {
    const [posts, setPosts] = useState([])
    const [owner, setOwner] = useState(store.getState().room.room.owner)

    const upVote = (item) => {
        if (item.upVotes.includes(store.getState().user.user.uid)) {
            firebase.firestore()
                .collection('Channel')
                .doc(store.getState().room.room.roomid)
                .collection("Posts")
                .doc(item._id).update({
                likedby: firebase.firestore.FieldValue.arrayRemove(store.getState().user.user.uid)
            })
        } else {
            firebase.firestore()
                .collection('Channel')
                .doc(store.getState().room.room.roomid)
                .collection("Posts")
                .doc(item._id).update({
                likedby: firebase.firestore.FieldValue.arrayUnion(store.getState().user.user.uid)
            })
        }
    }

    const deletePostButton = (item) => {
        const deletePost = () => {
            //Delete comments collection ??

            //Delete post, delete from global noti
            globalNotiCollection.doc(item.notiId).delete().then(() => firebase.firestore()
                .collection('Channel')
                .doc(store.getState().room.room.roomid)
                .collection("Posts")
                .doc(item._id).delete().then(() => Alert.alert("Delete Post", "Post Deleted")))

        }
        Alert.alert("Delete Post", "Are you sure you want to delete this post?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                    deletePost()},
                },
                {
                    text: "No",
                    onPress: () => {},
                }
            ],)
    }
    const pinPost = (item) => {
        //unpin
        if (item.createdAt === Number.MAX_VALUE) {
            const unpinPost = () => {
                // set created at to original value to shift post back
                channelsCollection.doc(store.getState().room.room.roomid)
                    .collection("Posts").doc(item._id)
                    .update({
                        createdAt: item.createdAtBackUp
                    }).then(() => Alert.alert("un-pin Post", "Post un-pinned"))
            }
            Alert.alert("un-pin Post", "Are you sure you want to un-pin this post?",
                [
                    {
                        text: "Yes",
                        onPress: () => {
                            unpinPost()},
                    },
                    {
                        text: "No",
                        onPress: () => {},
                    }
                ],)
        } else {
            //pin
            const pinPost = () => {
                //backUp createdAt for unpinning
                channelsCollection.doc(store.getState().room.room.roomid)
                    .collection("Posts").doc(item._id)
                    .set({
                        createdAtBackUp: item.createdAt
                    }, { merge: true }).then(() =>
                    // set created at to max value, to shift post all the way up
                    channelsCollection.doc(store.getState().room.room.roomid)
                    .collection("Posts").doc(item._id)
                    .update({
                        createdAt: Number.MAX_VALUE
                    }).then(() => Alert.alert("Pin Post", "Post Pinned")))
            }
            Alert.alert("Pin Post", "Are you sure you want to pin this post?",
                [
                    {
                        text: "Yes",
                        onPress: () => {
                            pinPost()},
                    },
                    {
                        text: "No",
                        onPress: () => {},
                    }
                ],)
        }
    }

    useEffect(() => {
        const postListener = channelsCollection.doc(store.getState().room.room.roomid)
            .collection("Posts").orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const posts = snapshot.docs.map(doc => {
                    const docId = doc.id
                    const firebase = doc.data()
                    const data = {
                        _id: docId,
                        title: firebase.title,
                        text: firebase.content,
                        upVotes: firebase.likedby,
                        user: firebase.user,
                        comments: firebase.comments,
                        roomname: firebase.roomname,
                        notiId: firebase.notiId,
                        createdAt: firebase.createdAt,
                        createdAtBackUp: firebase.createdAtBackUp,
                    }
                    return data;
                })
                setPosts(posts);
            })
        return () => {
            postListener()
        };
    }, [])



    const renderItem = ({item}) => {
        let trash;
        if (item.user._id === store.getState().user.user.uid) {
            trash = <TouchableOpacity style = {styles.trash}
                                      hitSlop={{top: 100, bottom: 100, left: 15, right: 15}}
                                      onPress = {()=> deletePostButton(item)}>
                <Ionicons style = {styles.iconTrash}
                          name={'trash-outline'} size={25}  />
            </TouchableOpacity>
        }
        let pin;
        if (owner === store.getState().user.user.uid) {
            pin = <TouchableOpacity style = {styles.pin}
                                      hitSlop={{top: 100, bottom: 100, left: 15, right: 15}}
                                      onPress = {()=> pinPost(item)}
                                      >
                <Ionicons style = {styles.iconPin}
                          name={'pin-outline'} size={25}  />
            </TouchableOpacity>
        }
        const upVoteToggle = item.upVotes.includes(store.getState().user.user.uid);
        return (
            <View style = {styles.post}>
                <View style = {styles.userTrash}>
                    <Text style = {styles.user}>
                        {item.user.display} posted{item.createdAt === Number.MAX_VALUE ? ' (pinned)' : ''}:
                    </Text>
                    {trash}
                    {pin}
                    </View>
                <Text style = {styles.postTitle}>
                    {item.title}
                </Text>
                <Text style = {styles.postText}>
                    {item.text}
                </Text>
                <View style = {styles.commentUpVote}>
                    <TouchableOpacity style = {styles.postComments}
                    onPress={() => prop.navigation.navigate("Comments", {item: item})}>
                        <Text style = {styles.postCommentsText}>
                            {item.comments} comment{item.comments !== 1 ? 's' : ''}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.postUpVotes}
                    onPress={() => upVote(item)}
                    >
                        <Text style = {upVoteToggle ? styles.postUpVotesText1 : styles.postUpVotesText}>
                            {item.upVotes.length} upvote{item.upVotes.length !== 1 ? 's' : ''}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }


    return (
        <Screen style = {styles.container}>
            <View style = {styles.toolBar}>
                <TouchableOpacity
                    style = {styles.touchable1}
                    onPress = {() => prop.navigation.navigate("ChannelSettings")}
                >
                    <Ionicons style = {styles.icon}
                              name={'settings-outline'} size={35}  />
                </TouchableOpacity>


                <TouchableOpacity
                    style = {styles.touchable}
                    onPress = {() => prop.navigation.navigate("NewPost")}
                >
                    <Ionicons style = {styles.icon}
                              name={'add-outline'} size={35}  />
                </TouchableOpacity>
            </View>

            <Text
                style = {styles.chatsText}>
                {store.getState().room.room.roomname}
            </Text>


            <View style = {styles.flatList}>
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    extraData={posts}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    />
            </View>
        </Screen>
    )
}