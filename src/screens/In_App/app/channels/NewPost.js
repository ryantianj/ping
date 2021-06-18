import React, {useState}from "react";
import {Text, TouchableOpacity, TextInput, Alert} from "react-native";

import firebase, {
    channelsCollection,
    globalNotiCollection
} from "../../../../../api/firebase";
import store from '../../../../store';

import styles from "../../../../styling/screens/In_App/app/channels/NewPost.styles"
import Screen from "../../../../components/Screen";

export default (prop) => {
    const [post ,setPost] = useState("")
    const [title, setTitle] = useState("")

    const uid = store.getState().user.user.uid;
    const roomid = store.getState().room.room.roomid;
    const display = store.getState().user.user.display;
    const roomname = store.getState().room.room.roomname;

    //Add posts and comments section
    const handlePost = async () => {

        const text = post;

        await channelsCollection.doc(roomid).collection('Posts').add({
            roomid: roomid,
            roomname: roomname,
            content: text,
            title: title,
            likedby: [],
            comments: 0,
            star: false,
            createdAt: new Date().getTime(),
            user: {
                _id: uid,
                display: display
            },
            notiType: 0,
        })
        await globalNotiCollection.add({
            title: title,
            text: text,
            user: {
                _id: uid,
                display: display
            },
            createdAt: new Date().getTime(),
            //Users to send to
            users: store.getState().room.room.users,
            roomname: roomname,
            notiType: 0,
            roomid: roomid
        })

        await channelsCollection.doc(roomid).set({
                latestPost: {
                    text: text,
                    createdAt: new Date().getTime()
                }
            },
            { merge: true }
        )
    }

    return (
        <Screen style = {styles.container}>
            <TextInput
                multiline
                style = {styles.textInputTitle}
                placeholder = "Post Title"
                value = {title}
                onChangeText = {setTitle}
                returnKeyType = "go"
                maxLength = {100}
            />
            <TextInput
                multiline
                style = {styles.textInputBio}
                placeholder = "Post Content"
                value = {post}
                onChangeText = {setPost}
                returnKeyType = "go"
                maxLength = {500}
                />
            <TouchableOpacity
                style = {styles.button}
                onPress={ () => {
                    if (post === '') {
                        Alert.alert("Post", "Please key in some text for the post")
                    } else if (title === '') {
                        Alert.alert("Title", "Please key in some text for the title")
                    } else {
                        handlePost().then(() => prop.navigation.goBack())
                    }}}
            >
                <Text style = {styles.buttonText}>Create Post</Text>
            </TouchableOpacity>

        </Screen>
    )
}