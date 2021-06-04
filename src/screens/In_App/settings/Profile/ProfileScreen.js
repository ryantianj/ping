import React, {useState} from "react";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from "../../../../styling/screens/In_App/settings/Profile/ProfileScreen.styles"

export default (props) => {
    const DATA = [
        store.getState().user.user.email,
        store.getState().user.user.visibility,
        store.getState().user.user.bio,
        store.getState().user.user.interests.join(", ")
    ]
    const visible = () => {
        if (store.getState().user.user.visibility) {
            return "Private"
        } else {
            return "Public"
        }

    }
    const renderItem = ( {item}) => {
        if (item === DATA[0]) {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Email: </Text>
                    <Text style = {styles.selectedText}>{item}</Text>
                </View>
            )
        } else if (item === DATA[1]) {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Visibility: </Text>
                    <Text style = {styles.selectedText}>{visible()}</Text>
                </View>
            )

        } else if (item === DATA[2]) {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Bio: </Text>
                    <Text style = {styles.selectedText}>{item}</Text>
                </View>
            )
        } else {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Interests: </Text>
                    <Text style = {styles.selectedText}>{item}</Text>
                </View>
            )
        }

    }


    return (
        <Screen style = {styles.container}>

            <Text style = {styles.profileText}>
                Your Profile
            </Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                style = {styles.flatList}/>

            <TouchableOpacity
                style = {styles.button}
                onPress = {() => props.navigation.navigate('UpdateProfile')}>
                <Text style ={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
        </Screen>
    )
}