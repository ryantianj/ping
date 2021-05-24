import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity} from "react-native";

import Screen from "../components/Screen";

import styles from '../styling/screens/HomeScreen.styles'
import Logo from "../constants/Logo";
import Settings from "../constants/Settings";

export default (props) => {
    const [search, setSearch] = useState("");
    return (
        <Screen style = {styles.container}>
            <Logo style = {styles.image}/>
            {/*Need to add touchable opacity here*/}
            <Settings style = {styles.settings}/>

            <TextInput
            style = {styles.searchBarText}
            placeholder = "Search"
            value = {search}
            onChangeText = {setSearch}
            autoCapitalize = "none"
            returnKeyType = "next"/>

            <Text
            style = {styles.notificationsText}>
                Your Notifications
            </Text>

        </Screen>
    )
}