import React from "react";
import {Text} from "react-native";

import Screen from "../../../../components/Screen";

import styles from '../../../../styling/screens/In_App/app/chats/JoinCreateChatRoomScreen.styles';

export default (props) => {
    return (
        <Screen style = {styles.container}>

            <Text
                style = {styles.chatsText}>
                Your Chats
            </Text>
        </Screen>

    )
}