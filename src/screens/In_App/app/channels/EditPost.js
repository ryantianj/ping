import React, {useState} from "react";
import {ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View} from "react-native";

import {channelsCollection, globalNotiCollection} from "../../../../../api/firebase";
import store from '../../../../store';

import styles from "../../../../styling/screens/In_App/app/channels/EditPost.styles"
import Screen from "../../../../components/Screen";

export default (prop) => {
    const [post ,setPost] = useState(prop.route.params.item.text)
    const [title, setTitle] = useState(prop.route.params.item.title)
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
                value = {title}
                onChangeText = {setTitle}
                returnKeyType = "go"
                maxLength = {100}
            />
            <TextInput
                multiline
                style = {styles.textInputBio}
                value = {post}
                onChangeText = {setPost}
                returnKeyType = "go"
                maxLength = {800}
            />
            <TouchableOpacity
                style = {styles.button}
                onPress={ () => {
                    if (post === '') {
                        Alert.alert("Post", "Please key in some text for the post")
                    } else if (title === '') {
                        Alert.alert("Title", "Please key in some text for the title")
                    } else if (prop.route.params.item.title !== title || prop.route.params.item.text !== post) {
                        handlePost().then(() => prop.navigation.goBack())
                    } else {
                        Alert.alert("Post not edited")
                        prop.navigation.goBack()
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