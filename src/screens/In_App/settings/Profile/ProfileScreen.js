import React, {useState} from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View, ScrollView, Image } from "react-native";
import { DataTable } from 'react-native-paper';
import badgesage from '../../../../../assets/badgesage.png';
import badgeguru from '../../../../../assets/badgeguru.png';
import badgethinker from '../../../../../assets/badgethinker.png';

import Screen from "../../../../components/Screen";
import store from "../../../../store"

import styles from "../../../../styling/screens/In_App/settings/Profile/ProfileScreen.styles"

export default (props) => {
    const DATA = [
        store.getState().user.user.display,
        store.getState().user.user.email,
        store.getState().user.user.visibility,
        store.getState().user.user.bio,
        store.getState().user.user.interests.join(", "),
        store.getState().user.user.badges
    ]

    const visible = () => {
        if (store.getState().user.user.visibility) {
            return "Private"
        } else {
            return "Public"
        }
    }

    const renderBadges = () => {
        const badgesMap = store.getState().user.user.badges; // key:value is topic:0/1/2
        const badgesArray = [];
        for (const topic in badgesMap) {
            const type = badgesMap[topic]; // number 0 1 2
            let icon = null;
            let title = "";
            
            if (type === 0) { // sage
                icon = badgesage
                title = 'Sage (Exclusively Appointed)'
            } else if (type === 1) { // guru
                icon = badgeguru
                title = 'Guru (Top 10th percentile for post upvotes ratio)'
            } else { // thinker
                icon = badgethinker
                title = 'Thinker (Top 30th percentile for post upvotes ratio)'
            }
            badgesArray.push({topic: topic, icon: icon, title: title, type: type});
        }
        badgesArray.sort((x, y) => {
            if (x.type < y.type) {
                return -1;
            } else if (x.type > y.type) {
                return 1;
            } else {
                return x.topic.localeCompare(y.topic);
            }
        });

        return badgesArray
            ? badgesArray.map(badgeData => (
                <DataTable.Row>
                    <DataTable.Cell style = {styles.iconCell}>
                        <Image style = {styles.image} source = {badgeData.icon}/>
                    </DataTable.Cell>
                    <DataTable.Cell style = {styles.titleCell}>{badgeData.title}</DataTable.Cell>
                    <DataTable.Cell style = {styles.topicCell}>{badgeData.topic}</DataTable.Cell>
                </DataTable.Row>
            )) 
            : null;
    }

    const renderItem = ( {item} ) => {
        if (item === DATA[0]) {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Display Name: </Text>
                    <Text style = {styles.selectedText}>{item}</Text>
                </View>
            )
        } else if (item === DATA[1]) {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Email: </Text>
                    <Text style = {styles.selectedText}>{item}</Text>
                </View>
            )
        } else if (item === DATA[2]) {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Visibility: </Text>
                    <Text style = {styles.selectedText}>{visible()}</Text>
                </View>
            )

        } else if (item === DATA[3]) {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Bio: </Text>
                    <Text style = {styles.selectedText}>{item}</Text>
                </View>
            )
        } else if (item === DATA[4]) {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Interests: </Text>
                    <Text style = {styles.selectedText}>{item}</Text>
                </View>
            )
        } else {
            return (
                <View
                    style = {styles.textInputBio}
                >
                    <Text style = {styles.selectedTextHeader}>Badges: </Text>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style = {styles.iconCell}></DataTable.Title>
                            <DataTable.Title style = {styles.titleCell}>Title</DataTable.Title>
                            <DataTable.Title style = {styles.topicCell}>Topic</DataTable.Title>
                        </DataTable.Header>
                        {renderBadges()}
                    </DataTable>
                </View>
            )
        }
    }

    return (
        <Screen style = {styles.container}>
        <ScrollView contentContainerStyle = {styles.scroll}>

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

        </ScrollView>
        </Screen>
    )
}