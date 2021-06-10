import React from "react";
import {View, FlatList, Text, TouchableOpacity} from "react-native";

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/ChannelScreen.styles';
import Ionicons from "react-native-vector-icons/Ionicons";

const DATA = [
    {
        title: 'First Item',
    },
    {
        title: 'Second Item',
    },
    {
        title: 'Third Item',
    },
    {
        title: 'Fourth Item',
    },
    {
        title: 'Fifth Item',
    },
    {
        title: 'Sixth Item'
    }
]

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);
export default (props) => {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );
    return (
        <Screen style = {styles.container}>
            <View style = {styles.viewText}>
                <Text
                    style = {styles.channelsText}>
                    Your Channels
                </Text>
                <TouchableOpacity
                    style = {styles.touchable}
                    onPress = {() => props.navigation.navigate('Channels',{ screen: 'CreateChannel' })}
                >
                    <Ionicons style = {styles.icon}
                              name={'add-outline'} size={35}  />
                </TouchableOpacity>
            </View>

           <FlatList
               style = {styles.flatList}
               data={DATA}
               renderItem={renderItem}/>
        </Screen>

    )
}