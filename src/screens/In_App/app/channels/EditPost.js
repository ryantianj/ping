import React, {useState} from "react";
import {ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";

import firebase, {channelsCollection, globalNotiCollection} from "../../../../../api/firebase";
import store from '../../../../store';

import styles from "../../../../styling/screens/In_App/app/channels/EditPost.styles"
import Screen from "../../../../components/Screen";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

export default (prop) => {
    const [post, setPost] = useState(prop.route.params.item.text)
    const [title, setTitle] = useState(prop.route.params.item.title)
    const [loading, isLoading] = useState(false);
    const [image, setImage] = useState(prop.route.params.item.mediaLink + '')
    const [orgImage, setOrgImage] = useState(prop.route.params.item.mediaLink + '')

    const roomid = store.getState().room.room.roomid;

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
        Alert.alert("Delete Image", "Are you sure you want to delete this Image?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        setImage('')},
                },
                {
                    text: "No",
                    onPress: () => {},
                }
            ],)
    }
    const upLoadImage = async () => {
        if (image === orgImage) {
            return image;
        } else {
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
    }

    //update posts
    const handlePost = async () => {
        isLoading(true);
        const mediaLink = image !== '' ? await upLoadImage() : ''
        if (orgImage !== '' && orgImage !== image) {
            console.log(orgImage)
            console.log(image)
            const org = orgImage.substring(orgImage.lastIndexOf('/') + 1)
            const org1 = org.substring(0, org.lastIndexOf('?'))
            const deleteRef = firebase.storage().ref().child(org1);
            const deleteOrg = await deleteRef.delete()
            alert('delete')
        }
        
        channelsCollection.doc(roomid).collection('Posts')
            .doc(prop.route.params.item._id)
            .update({
                title: title,
                content: post,
                mediaLink: mediaLink
            }).then(() => channelsCollection.doc(roomid).collection('Posts')
            .doc(prop.route.params.item._id)
            .set({
                edited: true
            }, { merge: true })).then(() => isLoading(false))
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
                    value = {title}
                    onChangeText = {setTitle}
                    returnKeyType = "go"
                    maxLength = {100}
                />
                {(image === '' || image === null) && <View style = {styles.attach}>
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
                {image !== '' && image !== null && <View style = {styles.delete}>
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
                {image !== '' && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
                        } else if (prop.route.params.item.title !== title 
                            || prop.route.params.item.text !== post
                            || prop.route.params.item.mediaLink !== image) {
                            handlePost().then(() => prop.navigation.goBack())
                        } else {
                            Alert.alert("Post", "Post not edited")
                            prop.navigation.goBack()
                        }
                    }}
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
            </ScrollView>
        </Screen>
    )
}