import React, {useState} from "react";
import {ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View} from "react-native";

import {channelsCollection, globalNotiCollection} from "../../../../../api/firebase";
import store from '../../../../store';

import styles from "../../../../styling/screens/In_App/app/channels/EditPost.styles"
import Screen from "../../../../components/Screen";

export default (prop) => {
    const [post ,setPost] = useState("")
    const [title, setTitle] = useState("")
    const [loading, isLoading] = useState(false);

    const roomid = store.getState().room.room.roomid;

    //update posts
    const handlePost = async () => {
        isLoading(true);

            channelsCollection.doc(roomid).collection('Posts')
                .doc(prop.route.params.item._id)
                .update({
                    title: title,
                    content: post,
                }).then(() => channelsCollection.doc(roomid).collection('Posts')
                .doc(prop.route.params.item._id)
                .set({
                    edited: true
                }, { merge: true })).then(() => isLoading(false))
    }

    return (
        <Screen style = {styles.container}>
            <TextInput
                multiline
                style = {styles.textInputTitle}
                placeholder = {prop.route.params.item.title}
                value = {title}
                onChangeText = {setTitle}
                returnKeyType = "go"
                maxLength = {100}
            />
            <TextInput
                multiline
                style = {styles.textInputBio}
                placeholder = {prop.route.params.item.text}
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
                <Text style = {styles.buttonText}>Update Post</Text>
            </TouchableOpacity>

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Updating Post
                </Text>
            </View>
            }

        </Screen>
    )
}