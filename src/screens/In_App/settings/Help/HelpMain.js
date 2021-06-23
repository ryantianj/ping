import React  from "react";
import {Text, TouchableOpacity} from "react-native";

import Screen from "../../../../components/Screen";

import styles from "../../../../styling/screens/In_App/settings/Help/HelpMain.styles"

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <Text style = {styles.profileText}>
                Help
            </Text>

            <TouchableOpacity
                style = {styles.Button}
                onPress = {() => props.navigation.navigate("Rooms")}
            >
                <Text style = {styles.ButtonText}>Rooms</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.Button}
                onPress = {() => props.navigation.navigate("Friends")}
            >
                <Text style = {styles.ButtonText}>Friends</Text>
            </TouchableOpacity>
        </Screen>
    )
}