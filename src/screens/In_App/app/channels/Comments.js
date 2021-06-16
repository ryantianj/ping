import React, { useEffect, useState} from "react";
import {Alert, FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";

import firebase, {
    channelsCollection,
} from "../../../../../api/firebase";

import store from '../../../../store';

import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "../../../../styling/screens/In_App/app/channels/Comments.styles"
import Screen from "../../../../components/Screen";

export default (prop) => {
    const [comments, setComments] = useState('')
    const [commentsList, setCommentsList] = useState([])

    const uid = store.getState().user.user.uid;
    const roomid = store.getState().room.room.roomid;
    const display = store.getState().user.user.display;
    const postid = prop.route.params.item._id;

    const renderItem = ({item}) => {
        let trash;
        if (item.user._id === store.getState().user.user.uid) {
            trash = <TouchableOpacity style = {styles.trash}
                                      hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
                                      onPress = {()=> deleteCommentButton(item)}>
                <Ionicons style = {styles.iconTrash}
                          name={'trash-outline'} size={25}  />
            </TouchableOpacity>
        }
        const upVoteToggle = item.upVotes.includes(store.getState().user.user.uid);
        return (
            <View style = {styles.post}>
                <View style = {styles.userTrash}>
                    <Text style = {styles.user}>
                        {item.user.display} commented:
                    </Text>
                    {trash}
                </View>
                <Text style = {styles.postText}>
                    {item.text}
                </Text>
                <View style = {styles.commentUpVote}>
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
    const deleteCommentButton = (item) => {
        const deleteComment = () => {
            //Update comments count on post doc
                channelsCollection.doc(roomid)
                .collection('Posts').doc(postid)
                .update({
                    comments: prop.route.params.item.comments - 1
                })
            //delete comment
            firebase.firestore()
                .collection('Channel')
                .doc(roomid)
                .collection('Posts')
                .doc(postid).collection('Comments').doc(item._id)
                .delete().then(() => Alert.alert("Delete Comment", "Comment Deleted"))
        }
        Alert.alert("Delete Comment", "Are you sure you want to delete this comment?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        deleteComment()},
                },
                {
                    text: "No",
                    onPress: () => {},
                }
            ],)
    }
    const upVote = (item) => {
        if (item.upVotes.includes(uid)) {
            firebase.firestore()
                .collection('Channel')
                .doc(roomid)
                .collection('Posts')
                .doc(postid).collection('Comments').doc(item._id).update({
                likedby: firebase.firestore.FieldValue.arrayRemove(uid)
            })
        } else {
            firebase.firestore()
                .collection('Channel')
                .doc(roomid)
                .collection('Posts')
                .doc(postid).collection('Comments').doc(item._id).update({
                likedby: firebase.firestore.FieldValue.arrayUnion(uid)
            })
        }
    }


    const submitComment = async () => {
        // Upload comment in comments collection
        await channelsCollection.doc(roomid)
             .collection('Posts').doc(postid)
             .collection('Comments').add({
                 roomid: roomid,
                 postid: postid,
                 content: comments,
                 likedby: [],
                 star: false,
                 createdAt: new Date().getTime(),
                 user: {
                     _id: uid,
                     display: display
                 },
             })
        //Update comments count on post doc
        await channelsCollection.doc(roomid)
            .collection('Posts').doc(postid)
            .update({
                comments: prop.route.params.item.comments + 1
            })
    }

    useEffect(() => {
        const commentsListener = channelsCollection.doc(roomid)
            .collection("Posts").doc(postid).collection('Comments')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const comments = snapshot.docs.map(doc => {
                    const docId = doc.id
                    const firebase = doc.data()
                    const data = {
                        _id: docId,
                        text: firebase.content,
                        upVotes: firebase.likedby,
                        user: firebase.user,
                    }
                    return data;
                })
                setCommentsList(comments);
            })
        return () => commentsListener();
    }, [])


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
            </View>

            <Text
                style = {styles.chatsText}>
                Comments
            </Text>

            <View style = {styles.flatList}>
                <FlatList
                    data={commentsList}
                    renderItem={renderItem}
                    extraData={commentsList}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
            <View>
                <TextInput
                    multiline
                    style = {styles.commentsBox}
                    placeholder = "Add Comment"
                    value = {comments}
                    onChangeText = {setComments}
                    returnKeyType = "go"
                    maxLength = {500}
                />
                <TouchableOpacity
                    style = {styles.touchable}
                    onPress = {() => {
                        if (comments && comments !== '') {
                            submitComment()
                            setComments('')
                        } else {
                            Alert.alert("Comment", "Please key in some text for the comment")
                        }
                       }}
                >
                    <Ionicons style = {styles.checkIcon}
                              name={'checkmark-outline'} size={35}  />
                </TouchableOpacity>
            </View>

        </Screen>
    )
}