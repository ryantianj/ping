import React, {useEffect, useState} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";

import Search from "../../../constants/Search";
import Screen from "../../../components/Screen";
import Logo_Settings from "../../../constants/Logo_Settings";

import styles from '../../../styling/screens/In_App/app/HomeScreen.styles'
import { usersCollection} from "../../../../api/firebase";
import store from "../../../store";
import {interestsCollection} from "../../../../api/firebase";

export default (props) => {
    const [noti, setNoti] = useState([]);

    //NotiTypes: 0: Channel Post 1: Channel Comments 2: New group message 3: New chat message
    // 4: Badges 5: Receive friend request 6: friend request accepted 7: Someone added you (public)


    useEffect(() => {
        //channels noti
         const allNoti = usersCollection.doc(store.getState().user.user.uid)
             .collection('noti').orderBy('createdAt', 'desc')
             .onSnapshot(snapshot => {
                 const notis = snapshot.docs.map(doc => {
                     const docId = doc.id
                     const firebase = doc.data()
                     const data = {
                         _id: docId,
                         title: firebase.title,
                         text: firebase.text,
                         user: firebase.user,
                         roomname: firebase.roomname,
                         notiType: firebase.notiType,
                     }
                     return data;
                 })
                 setNoti(notis)
             })
        return () => {
            allNoti()
        };

    }, [])

    const renderItem = ({item}) => {
        // Channel
            if (item.notiType === 0) {
                return (<View style = {styles.post}>
                        <Text style = {styles.postTitle}>
                            Channel - {item.roomname}
                        </Text>
                        <Text style = {styles.postText}>
                            {item.user.display} posted:
                        </Text>
                    <Text style = {styles.postTitle}>
                        {item.title}
                    </Text>
                    <Text style = {styles.postText}>
                        {item.text}
                    </Text>
                </View>
                )
            } else if (item.notiType === 1) {
                return (<View style = {styles.post}>
                        <Text style = {styles.postTitle}>
                            Channel - {item.roomname}
                        </Text>
                        <Text style = {styles.postText}>
                            {item.user.display} commented on post {item.title}:
                        </Text>
                        <Text style = {styles.postText}>
                            {item.text}
                        </Text>
                    </View>
                )
            } else if (item.notiType === 2) {
                return (<View style = {styles.group}>
                        <Text style = {styles.postTitle}>
                            Group - {item.roomname}
                        </Text>
                        <Text style = {styles.postText}>
                            {item.user.display} said:
                        </Text>
                        <Text style = {styles.postText}>
                            {item.text}
                        </Text>
                    </View>
                )
            } else if (item.notiType === 3) {
                return (<View style = {styles.chat}>
                        <Text style = {styles.chatTitle}>
                            Chat - {item.roomname}
                        </Text>
                        <Text style = {styles.chatText}>
                            {item.user.display} said:
                        </Text>
                        <Text style = {styles.chatText}>
                            {item.text}
                        </Text>
                    </View>
                )
            } else if (item.notiType === 3) {
                return (<View style = {styles.chat}>
                        <Text style = {styles.chatTitle}>
                            Chat - {item.roomname}
                        </Text>
                        <Text style = {styles.chatText}>
                            {item.user.display} said:
                        </Text>
                        <Text style = {styles.chatText}>
                            {item.text}
                        </Text>
                    </View>
                )
            } else if (item.notiType === 4) {
                return (<View style = {styles.chat}>
                        <Text style = {styles.chatTitle}>
                            Chat - {item.roomname}
                        </Text>
                        <Text style = {styles.chatText}>
                            {item.user.display} said:
                        </Text>
                        <Text style = {styles.chatText}>
                            {item.text}
                        </Text>
                    </View>
                )
            } else if (item.notiType === 5) {
                return (<View style = {styles.request}>
                        <Text style = {styles.requestTitle}>
                            Friend Request
                        </Text>
                        <Text style = {styles.requestText}>
                            {item.user.display} sent you a Friend Request!
                        </Text>
                    </View>
                )
            } else if (item.notiType === 6) {
                return (<View style = {styles.request}>
                        <Text style = {styles.requestTitle}>
                            Friend Request
                        </Text>
                        <Text style = {styles.requestText}>
                            {item.user.display} accepted your Friend Request!
                        </Text>
                    </View>
                )
            } else if (item.notiType === 7) {
                return (<View style = {styles.request}>
                        <Text style = {styles.requestTitle}>
                            Friend Request
                        </Text>
                        <Text style = {styles.requestText}>
                            {item.user.display} added you as a Friend!
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