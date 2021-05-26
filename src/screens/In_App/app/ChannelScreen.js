import React from "react";
import {ScrollView, Text} from "react-native";

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/ChannelScreen.styles';

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <Text
                style = {styles.channelsText}>
                Your Channels
            </Text>
            <ScrollView>

            </ScrollView>
        </Screen>

    )
}