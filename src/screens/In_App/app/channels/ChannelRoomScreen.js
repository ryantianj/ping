import React, { useEffect, useState} from "react";
import {Alert, FlatList, Text, TouchableOpacity, View, Image} from "react-native";

import firebase, {
    channelsCollection, globalNotiCollection,
} from "../../../../../api/firebase";
import store from '../../../../store';

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from "../../../../styling/screens/In_App/app/channels/ChannelRoomScreen.styles"
import Screen from "../../../../components/Screen";

export default (prop) => {
    const [posts, setPosts] = useState([])
    const [owner, setOwner] = useState(store.getState().room.room.owner)

    const user = store.getState().user.user.uid
    const upVote = (item) => {
        if (item.upVotes.includes(user)) {
            firebase.firestore()
                .collection('Channel')
                .doc(store.getState().room.room.roomid)
                .collection("Posts")
                .doc(item._id).update({
                likedby: firebase.firestore.FieldValue.arrayRemove(user)
            })
        } else {
            firebase.firestore()
                .collection('Channel')
                .doc(store.getState().room.room.roomid)
                .collection("Posts")
                .doc(item._id).update({
                likedby: firebase.firestore.FieldValue.arrayUnion(user)
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
            //Delete Media
            if (item.mediaLink !== '') {
                const org = item.mediaLink.substring(item.mediaLink.lastIndexOf('/') + 1)
                const org1 = org.substring(0, org.lastIndexOf('?'))
                const deleteRef = firebase.storage().ref().child(org1);
                const deleteOrg = deleteRef.delete()
            }

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

    const editPost = (item) => {
        const editPost = () => {
            prop.navigation.navigate("EditPost", {item: item})

        }
        Alert.alert("Edit Post", "Are you sure you want to edit this post?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        editPost()},
                },
                {
                    text: "No",
                    onPress: () => {},
                }
            ],)
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
                        edited: firebase.edited,
                        mediaLink: firebase.mediaLink
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
        if (item.user._id === user) {
            trash = <TouchableOpacity style = {styles.trash}
                                      hitSlop={{top: 100, bottom: 100, left: 15, right: 15}}
                                      onPress = {()=> deletePostButton(item)}>
                <Ionicons style = {styles.iconTrash}
                          name={'trash-outline'} size={25}  />
            </TouchableOpacity>
        }
        let edit;
        if (item.user._id === user) {
            edit = <TouchableOpacity style = {styles.edit}
                                      hitSlop={{top: 100, bottom: 100, left: 15, right: 15}}
                                      onPress = {()=> editPost(item)}
                                      >
                <MaterialCommunityIcons style = {styles.iconTrash}
                          name={'pencil'} size={25}  />
            </TouchableOpacity>
        }
        let pin;
        if (owner === user) {
            if (item.createdAt === Number.MAX_VALUE) { // pinned
                pin = <TouchableOpacity style = {styles.pin}
                                        hitSlop={{top: 100, bottom: 100, left: 15, right: 15}}
                                        onPress = {()=> pinPost(item)}
                                        >
                    <MaterialCommunityIcons style = {styles.iconPin}
                            name={'pin'} color = {'black'} size={25}  />
                </TouchableOpacity>
            } else { // not pinned
                pin = <TouchableOpacity style = {styles.pin}
                                        hitSlop={{top: 100, bottom: 100, left: 15, right: 15}}
                                        onPress = {()=> pinPost(item)}
                                        >
                    <MaterialCommunityIcons style = {styles.iconPin}
                            name={'pin-outline'} color = {'black'} size={25}  />
                </TouchableOpacity>
            }
        }
        let imageUrl = {uri: item.mediaLink + ''}
        const upVoteToggle = item.upVotes.includes(store.getState().user.user.uid);
        return (
            <View style = {styles.post}>
                <View style = {styles.userTrash}>
                    <Text style = {styles.user}>
                        {item.user.display} posted: 
                        {item.createdAt === Number.MAX_VALUE || item.edited ? "\n" : ''}
                        <Text style={{fontStyle: 'italic', fontSize: 17}}>
                            {item.createdAt === Number.MAX_VALUE && item.edited ? '(pinned and edited) ' : ''}
                            {item.createdAt === Number.MAX_VALUE && !item.edited ? '(pinned)' : ''}
                            {item.edited && item.createdAt !== Number.MAX_VALUE ? '(edited)' : ''}
                        </Text>
                    </Text>
                    {pin}
                    {trash}
                    {edit}
                    
                    </View>
                <Text style = {styles.postTitle}>
                    {item.title}
                </Text>

                {((item.mediaLink !== '')) &&
                <Image style = {styles.image} source = {imageUrl}/>}
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