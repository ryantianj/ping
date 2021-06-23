import React  from "react";
import {Text, TouchableOpacity} from "react-native";

import Screen from "../../../../components/Screen";

import styles from "../../../../styling/screens/In_App/settings/Help/RoomHelp.styles"

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <Text style = {styles.profileText}>
                Rooms
            </Text>

        </Screen>
    )
}