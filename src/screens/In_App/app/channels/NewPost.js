import React, {useState}from "react";
import {FlatList, Text, TouchableOpacity, TextInput} from "react-native";

import firebase, {
    channelsCollection
} from "../../../../../api/firebase";
import store from '../../../../store';

import styles from "../../../../styling/screens/In_App/app/channels/NewPost.styles"
import Screen from "../../../../components/Screen";

export default (prop) => {
    const [post ,setPost] = useState("")
    const [title, setTitle] = useState("")

    const uid = store.getState().user.user.uid;
    const email = store.getState().user.user.email;
    const roomid = store.getState().room.room.roomid;
    const display = store.getState().user.user.display;
    const handlePost = async () => {

        const text = post;

        (await channelsCollection.doc(roomid).collection('Posts').add({
            roomid: roomid,
            postid: '',
            content: text,
            title: title,
            likedby: [],
            star: false,
            createdAt: new Date().getTime(),
            user: {
                _id: uid,
                email: email,
                display: display
            },
        }))

        await channelsCollection.doc(roomid).set({
                latestPost: {
                    text: text,
                    createdAt: new Date().getTime()
                }
            },
            { merge: true }
        )

        await channelsCollection.doc(roomid).collection('Posts').doc()
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
                onPress={ () => {handlePost().then(() => prop.navigation.goBack())}}
            >
                <Text style = {styles.buttonText}>Create Post</Text>
            </TouchableOpacity>

        </Screen>
    )
}