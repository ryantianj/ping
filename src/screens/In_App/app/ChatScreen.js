import React from "react";
import {Text, TextInput, TouchableOpacity, FlatList, View, Image, Pressable, KeyboardAvoidingView} from "react-native";

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/ChatScreen.styles';

export default (props) => {
    return (
        <Screen style = {styles.container}>

            <Text
                style = {styles.chatsText}>
                Your Chats
            </Text>

            <TouchableOpacity
                style = {styles.chatsList}
                onPress = {() => props.navigation.navigate('ChatRoom')}
            >
                <Text style = {styles.securityButtonText}>Chat Room 1</Text>
            </TouchableOpacity>
        </Screen>

    )
}