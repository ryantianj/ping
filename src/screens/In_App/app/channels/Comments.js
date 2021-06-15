import React, { useEffect, useState} from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import firebase, {
    channelsCollection,
} from "../../../../../api/firebase";

import store from '../../../../store';

import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "../../../../styling/screens/In_App/app/channels/Comments.styles"
import Screen from "../../../../components/Screen";

export default (prop) => {
    const [comments, setComments] = useState([])

    const renderItem = ({item}) => {
        return (
            <View style = {styles.post}>
                <Text style = {styles.user}>
                    {item.user.display} posted:
                </Text>

                <Text style = {styles.postText}>
                    {item.text}
                </Text>
            </View>
        )
    }


    return (
        <Screen style = {styles.container}>
            <View style = {styles.toolBar}>
                <TouchableOpacity
                    style = {styles.touchable1}
                    onPress = {() => prop.navigation.navigate("ChannelSettings")}
                >
                    <Ionicons style = {styles.icon}
                              name={'settings-outline'} size={35}  />
                </TouchableOpacity>


                <TouchableOpacity
                    style = {styles.touchable}
                    onPress = {() => prop.navigation.navigate("NewPost")}
                >
                    <Ionicons style = {styles.icon}
                              name={'add-outline'} size={35}  />
                </TouchableOpacity>
            </View>

            <Text
                style = {styles.chatsText}>
                Comments
            </Text>


            <View style = {styles.flatList}>
                <FlatList
                    data={comments}
                    renderItem={renderItem}
                    extraData={comments}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </Screen>
    )
}