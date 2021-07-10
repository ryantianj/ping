import React, { useEffect, useState } from "react";
import {Text, TouchableOpacity, View, ActivityIndicator, Alert, Image} from "react-native";
// import { GiftedChat, Bubble, Send, SystemMessage } from 'react-web-gifted-chat';
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';

import firebase, {globalNotiCollection, roomsCollection} from '../../../../../api/firebase';
import store from '../../../../store';

import Screen from "../../../../components/Screen";
import styles from '../../../../styling/screens/In_App/app/groups/GroupRoomScreen.styles';
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

export default (props) => {

    const uid = store.getState().user.user.uid;
    const display = store.getState().user.user.display;
    const users = store.getState().room.room.users;
    const photo = store.getState().user.user.photo;
    const email = store.getState().user.user.email;
    const roomid = store.getState().room.room.roomid;
    const roomname = store.getState().room.room.roomname;

    const [messages, setMessages] = useState([
        // Mock message data
        // example of system message
        {
          _id: 0,
          text: 'New room created.',
          createdAt: new Date().getTime(),
          system: true
        },
        // example of chat message
        {
          _id: 1,
          text: 'Hello!',
          createdAt: new Date().getTime(),
          user: {
            _id: 2,
            name: 'Test User'
          }
        }
      ]);

    const [image, setImage] = useState('')

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
        const currTime = new Date().getTime();
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

        const link = await snapshot.ref.getDownloadURL();
        setImage('');
        roomsCollection.doc(roomid).collection('Messages').add({
            roomid: roomid,
            content: link,
            likedby: [],
            star: false,
            text: link,
            createdAt: currTime,
            user: {
                _id: uid,
                email: email,
                photo: photo
            },
            isImage: true,
        });

        await globalNotiCollection.add({
            title: roomname,
            text: "Photo",
            user: {
                _id: uid,
                display: display,
                photo: photo
            },
            createdAt: currTime,
            //Users to send to
            users: removeElement(users, uid),
            roomname: roomname,
            notiType: 2,
            roomid: roomid,
        })
        await roomsCollection.doc(roomid).set({
                latestMessage: {
                    text: 'Photo',
                    createdAt: currTime,
                    photo: photo
                }
            },
            { merge: true }
        )
    }

    const removeElement = (arr, userID) => {
        return arr.filter(users => users !== userID);
    }
    
    const handleSend = async (messages) => {

        const currTime = new Date().getTime();

        const text = messages[0].text;
        console.log(text);

        roomsCollection.doc(roomid).collection('Messages').add({
            roomid: roomid,
            content: text,
            likedby: [],
            star: false,
            text,
            createdAt: currTime,
            user: {
                _id: uid,
                email: email,
                photo: photo
            }
        });


        await roomsCollection.doc(roomid).set({
            latestMessage: {
                text: text,
                createdAt: currTime,
                photo: photo
            }
        },
        { merge: true }
        )
        await globalNotiCollection.add({
            title: roomname,
            text: text,
            user: {
                _id: uid,
                display: display,
                photo: photo
            },
            createdAt: currTime,
            //Users to send to
            users: removeElement(users, uid),
            roomname: roomname,
            notiType: 2,
            roomid: roomid,
        })
    }

    const renderAvatar = (props) => {
        const image = props.currentMessage.user.photo
        if (image === undefined || image === '') {
            return (
                <Ionicons style = {styles.icon}
                          name={'people-circle-outline'} color = {'white'} size={35}/>
            )
        } else {
            return (
                <Image source={{ uri: image }} style={{ width: 38, height: 38, borderRadius: 38/2, }} />
            )
        }

    }

    function renderBubble(props) {
        if (props.currentMessage.isImage) {
            return (
                <Image source={{ uri: props.currentMessage.text}} style={styles.image} />
            );
        } else {
            return (
                <Bubble
                    {...props}
                    wrapperStyle={{
                        right: {
                            backgroundColor: '#6646ee'
                        }
                    }}
                    textStyle={{
                        right: {
                            color: '#fff'
                        }
                    }}
                />
            );
        }
    }
    
    function renderLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#6646ee' />
            </View>
        );
    }

    function renderSend(props) {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <TouchableOpacity
                        style = {styles.touchable}
                        onPress = {pickImage}
                    >
                        <Ionicons style = {styles.icon}
                                  name={'attach-outline'} size={35}  />
                    </TouchableOpacity>
                    <IconButton style = {styles.send} icon='send-circle' size={32} color='#6646ee' />
                </View>
            </Send>
        );
    }

    function scrollToBottomComponent() {
        return (
            <View style={styles.bottomComponentContainer}>

            </View>
        );
    }

    function renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                wrapperStyle={styles.systemMessageWrapper}
                textStyle={styles.systemMessageText}
            />
        );
    }

    useEffect(() => {
        const messagesListener = roomsCollection
            .doc(roomid)
            .collection('Messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const messages = snapshot.docs.map(doc => {
                    const firebaseData = doc.data();
                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData,
                        isImage: firebaseData.isImage
                    };
                    if (!firebaseData.system) {
                        data.user = {
                        ...firebaseData.user,
                        name: firebaseData.user.email
                        };
                    }
                    return data;
                });

            setMessages(messages);
            });
    
        // Stop listening for updates whenever the component unmounts
        return () => messagesListener();
    }, []);

    return (
        <Screen style = {styles.container}>
            <TouchableOpacity
                style = {styles.button}
                onPress = {() => {
                    props.navigation.navigate('GroupRoomSettings');
                }
                }>
                <Text style ={styles.buttonText}>Group Settings</Text>
            </TouchableOpacity>
            
            <View style = {styles.flatList}>
                <GiftedChat
                    messages={messages}
                    onSend={handleSend}
                    user={{ _id: uid }}
                    placeholder='Type your message here...'
                    alwaysShowSend
                    showUserAvatar
                    scrollToBottom
                    renderAvatar = {renderAvatar}
                    renderBubble={renderBubble}
                    renderLoading={renderLoading}
                    renderSend={renderSend}
                    scrollToBottomComponent={scrollToBottomComponent}
                    renderSystemMessage={renderSystemMessage}
                />
                {image !== '' && <View style = {styles.mediaAlert}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style = {styles.buttons}>
                        <TouchableOpacity
                            style = {styles.buttonReject}
                            onPress = {deleteImage}
                        >
                            <Text style ={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {styles.buttonAccept}
                            onPress = {upLoadImage}
                        >
                            <Text style ={styles.buttonText}>Send</Text>
                        </TouchableOpacity>

                    </View>
                </View>}
            </View>
        </Screen>
    )
}