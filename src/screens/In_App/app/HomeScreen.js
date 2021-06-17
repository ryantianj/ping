import React, {useEffect, useState} from "react";
import {FlatList, Text, View} from "react-native";

import Search from "../../../constants/Search";
import Screen from "../../../components/Screen";
import Logo_Settings from "../../../constants/Logo_Settings";

import styles from '../../../styling/screens/In_App/app/HomeScreen.styles'
import {usersCollection} from "../../../../api/firebase";
import store from "../../../store";

export default (props) => {
    const [noti, setNoti] = useState([]);


    useEffect(() => {
         usersCollection.doc(store.getState().user.user.uid)
            .get().then((doc) => {
                const notiArray = doc.data().noti
                console.log(notiArray)
                setNoti(notiArray)
            })

    }, [])

    const renderItem = ({item}) => {
            if (item.notiType === "Channel") {
                return (<View style = {styles.post}>
                    <Text style = {styles.postTitle}>
                        {item.title}
                    </Text>
                    <Text style = {styles.postText}>
                        {item.content}
                    </Text>
                </View>
                )
            }
    }

    return (
        <Screen style = {styles.container}>
            <Logo_Settings navigation = {props.navigation}/>
            <Search navigation = {props.navigation}/>

            <Text
                style = {styles.notificationsText}>
                Your Notifications
            </Text>
        <View style = {styles.flatList}>
            <FlatList
                data={noti}
                renderItem={renderItem}
                extraData={noti}
                contentContainerStyle={{ paddingBottom: 20 }}/>
        </View>

        </Screen>

    )
}