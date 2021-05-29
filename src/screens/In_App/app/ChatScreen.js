import React from "react";
import {Text, TextInput, TouchableOpacity, FlatList, View, Image, Pressable, KeyboardAvoidingView} from "react-native";

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/ChatScreen.styles';

const DATA = [
    {
        title: 'First Item',
    },
    {
        title: 'Second Item',
    },
    {
        title: 'Third Item',
    },
    {
        title: 'Fourth Item',
    },
    {
        title: 'Fifth Item',
    },
    {
        title: 'Sixth Item'
    }
]
const Item = ({ title , navi}) => (
    <TouchableOpacity
        style = {styles.chatsList}
        onPress = {() => navi.navigate('ChatRoom')}
    >
        <Text style = {styles.chats}>Chat Room {title}</Text>
    </TouchableOpacity>
);
export default (props) => {
    const renderItem = ({ item }) => (
        <Item title={item.title}
        navi = {props.navigation}/>
    );
    return (
        <Screen style = {styles.container}>


            <Text
                style = {styles.chatsText}>
                Your Chats
            </Text>

            <FlatList
                style = {styles.flatList}
                data={DATA}
                renderItem={renderItem}/>
        </Screen>

    )
}