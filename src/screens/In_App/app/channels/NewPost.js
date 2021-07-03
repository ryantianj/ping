import React, {useState} from "react";
import {ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as ImagePicker from 'expo-image-picker';

import firebase, {channelsCollection, globalNotiCollection} from "../../../../../api/firebase";
import store from '../../../../store';

import styles from "../../../../styling/screens/In_App/app/channels/NewPost.styles"
import Screen from "../../../../components/Screen";
import Ionicons from "react-native-vector-icons/Ionicons";

export default (prop) => {
    const [post ,setPost] = useState("")
    const [title, setTitle] = useState("")
    const [loading, isLoading] = useState(false);
    const [image, setImage] = useState(null)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const deleteImage = () => {
        setImage(null)
    }
    const upLoadImage = async () => {
        const uri = image + ''
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const ref = firebase.storage().ref().child(image.substring(image.lastIndexOf('/') + 1));
        const snapshot = await ref.put(blob);

        // We're done with the blob, close and release it
        blob.close();

        return await snapshot.ref.getDownloadURL();
    }


    const removeElement = (arr, userID) => {
        return arr.filter(users => users !== userID);
    }

    const uid = store.getState().user.user.uid;
    const roomid = store.getState().room.room.roomid;
    const display = store.getState().user.user.display;
    const roomname = store.getState().room.room.roomname;

    //Add posts and comments section
    const handlePost = async () => {
        isLoading(true);

        const text = post;
        let notiId;
         globalNotiCollection.add({
            title: title,
            text: text,
            user: {
                _id: uid,
                display: display
            },
            createdAt: new Date().getTime(),
            //Users to send to
            users: removeElement(store.getState().room.room.users, uid),
            roomname: roomname,
            notiType: 0,
            roomid: roomid,
             notiId: ''
        }).then((docRef) => {
             notiId = docRef.id
             if (image !== null) {
                 return upLoadImage()
             } else {
                 return '';
             }
         }).then((link) => {
            channelsCollection.doc(roomid).collection('Posts').add({
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
             notiId: notiId,
             mediaLink: link,
         })}).then(() => isLoading(false))


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
            <ScrollView
                style = {styles.scroll}
                contentContainerStyle = {styles.scrollContainer}
            >
                <TextInput
                    multiline
                    style = {styles.textInputTitle}
                    placeholder = "Post Title"
                    value = {title}
                    onChangeText = {setTitle}
                    returnKeyType = "go"
                    maxLength = {100}
                />
                {image === null && <View style = {styles.attach}>
                    <Text>
                        Attach an Image:
                    </Text>
                    <TouchableOpacity
                        style = {styles.touchable}
                        onPress = {pickImage}
                    >
                        <Ionicons style = {styles.icon}
                                  name={'attach-outline'} size={35}  />
                    </TouchableOpacity>
                </View>}
                {image !== null && <View style = {styles.delete}>
                    <TouchableOpacity
                        style = {styles.touchable}
                        onPress = {deleteImage}>
                        <Ionicons style = {styles.icon}
                                  name={'trash-outline'} size={35}  />
                    </TouchableOpacity>

                    <Text>
                        Delete Image
                    </Text>
                </View>
                }
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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

                {loading && <View style = {styles.loading}>
                    <ActivityIndicator size="large" color={styles.loadingColour.color} />
                    <Text>
                        Creating Post
                    </Text>
                </View>
                }

            </ScrollView>

        </Screen>
    )
}