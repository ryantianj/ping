import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";

import Screen from "../components/Screen";

import styles from '../styling/screens/HomeScreen.styles'
import Logo_Settings from "../constants/Logo_Settings";

export default (props) => {
    const [search, setSearch] = useState("");
    return (
        <Screen style = {styles.container}>
            <View style = {styles.settingsLogo}>
                <Logo_Settings />
            </View>
                <TextInput
                    style = {styles.searchBarText}
                    placeholder = "Search"
                    value = {search}
                    onChangeText = {setSearch}
                    autoCapitalize = "none"
                    returnKeyType = "go"/>

                <Text
                    style = {styles.notificationsText}>
                    Your Notifications
                </Text>
        </Screen>
    )
}