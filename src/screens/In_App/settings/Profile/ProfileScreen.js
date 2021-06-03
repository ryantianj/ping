import React, {useState} from "react";
import {FlatList, Text, TextInput, View} from "react-native";

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from "../../../../styling/screens/In_App/settings/Profile/ProfileScreen.styles"

export default (props) => {
    const DATA = [
        store.getState().user.user.bio,
        store.getState().user.user.interests.join(", ")
    ]
    const renderItem = ( {item}) => {
        return (
            <View
                style = {styles.textInputBio}
            >
                <Text style = {styles.selectedText}>{item}</Text>
            </View>
        )
    }

    return (
        <Screen style = {styles.container}>

            <Text style = {styles.profileText}>
                Your Profile
            </Text>
            <FlatList data={DATA} renderItem={renderItem}/>


        </Screen>
    )
}