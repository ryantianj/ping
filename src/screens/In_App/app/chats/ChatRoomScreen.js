import React, {Component, useEffect, useState, useRef} from "react";
import {FlatList, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import { useSelector } from 'react-redux';
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-web-gifted-chat';
import { IconButton } from 'react-native-paper';

import { roomsCollection } from '../../../../../api/firebase';
import store from '../../../../store';

import Screen from "../../../../components/Screen";

import styles from '../../../../styling/screens/In_App/app/chats/ChatRoomScreen.styles';

export default (props) => {

    const uid = store.getState().user.user.uid;
    const email = store.getState().user.user.email;
    const roomid = store.getState().room.room.roomid;

    console.log(uid);
    console.log(roomid);

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
    
    const handleSend = async (messages) => {

        const text = messages[0].text;
        console.log(text);

        roomsCollection.doc(roomid).collection('Messages').add({
            roomid: roomid,
            content: text,
            likedby: [],
            star: false,
            text,
            createdAt: new Date().getTime(),
            user: {
                _id: uid,
                email: email
            }
        });

        await roomsCollection.doc(roomid).set({
            latestMessage: {
                text: text,
                createdAt: new Date().getTime()
            }
        },
        { merge: true }
        )
    }
    function renderBubble(props) {
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
                    <IconButton icon='send-circle' size={32} color='#6646ee' />
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
                        ...firebaseData
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

            <GiftedChat
                messages={messages}
                onSend={handleSend}
                user={{ _id: uid }}
                placeholder='Type your message here...'
                alwaysShowSend
                showUserAvatar
                scrollToBottom
                renderBubble={renderBubble}
                renderLoading={renderLoading}
                renderSend={renderSend}
                scrollToBottomComponent={scrollToBottomComponent}
                renderSystemMessage={renderSystemMessage}
            />

        </Screen>

    )
}