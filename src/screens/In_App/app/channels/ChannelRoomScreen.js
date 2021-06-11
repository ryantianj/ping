import React, {Component, useEffect, useState, useRef} from "react";
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

import { roomsCollection } from '../../../../../api/firebase';
import store from '../../../../store';

import styles from "../../../../styling/screens/In_App/app/channels/ChannelRoomScreen.styles"
import Screen from "../../../../components/Screen";

export default (prop) => {
    const DATA = [];
    const renderItem = () => {

    }

    return (
        <Screen style = {styles.container}>
            <TouchableOpacity
                style = {styles.button}
                >
                <Text style ={styles.buttonText}>Channel Settings</Text>
            </TouchableOpacity>
            <View style = {styles.flatList}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}/>
            </View>
        </Screen>
    )
}