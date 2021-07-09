import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/HomeScreen.styles'
import {usersCollection} from "../../../../api/firebase";
import store from "../../../store";
import {fillUserState, fillChannelRoomState, fillChatRoomState, fillGroupRoomState} from "../../../roomsSlice";
import { findAllBadges } from '../../../calculateBadges';
import Ionicons from "react-native-vector-icons/Ionicons";

export default (props) => {
    const [noti, setNoti] = useState([]);
    const [count, setCount] = useState(0)
    const [loading, isLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        
        // findAllBadges().then(() => {
        //     fillUserState(store.getState().user.user.uid)
        // });

        // channels noti
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
                         roomid: firebase.roomid,
                         id: firebase.id
                     }
                     return data;
                 })
                 setNoti(notis)
                 setCount(count + 1)
             })
        return () => {
            allNoti()
        };

    }, [])

    const deleteNoti = (item) => {
        usersCollection.doc(store.getState().user.user.uid)
            .collection('noti').doc(item._id).delete()
    }

    //NotiTypes: 0: Channel Post 1: Channel Comments 2: New group message 3: New chat message
    // 4: Badges 5: Receive friend request (add user) 6: friend request accepted 7: Someone added you (public)

    const renderItem = ({item}) => {
            if (item.notiType === 0) {
                return (
                    <TouchableOpacity
                        style = {styles.post}
                        onPress ={() => {
                            setLoadingText("Channel")
                            isLoading(true)
                                dispatch(fillChannelRoomState(item.roomid))
                                    .then(() => {
                                        isLoading(false)
                                        props.navigation.navigate('Channels',{ screen: 'ChannelRoom' })})
                            }
                        }
                    >
                        <View>
                                <Text style = {styles.postTitle}>
                                    Channel - {item.roomname}
                                </Text>
                                <TouchableOpacity style = {styles.trash}
                                                  hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
                                                  onPress = {() => deleteNoti(item)}
                                >
                                    <Ionicons style = {styles.iconTrash}
                                              name={'trash-outline'} size={25}  />
                                </TouchableOpacity>

                            <Text style = {styles.postText}>
                                {item.user.display} posted:
                            </Text>
                            <Text style = {styles.postTitle2}>
                                {item.title}
                            </Text>
                            <Text style = {styles.postText2}>
                                {item.text}
                            </Text>
                        </View>
                    </TouchableOpacity>

                )
            } else if (item.notiType === 1) {
                return (
                    <TouchableOpacity
                        style = {styles.post}
                          onPress ={() => {
                              setLoadingText("Channel")
                              isLoading(true)
                              dispatch(fillChannelRoomState(item.roomid))
                                  .then(() => props.navigation.navigate('Channels', { screen: 'ChannelRoom' }))
                                  .then(() => {props.navigation.navigate('Channels', {screen: 'Comments', params : {item :{
                                              _id: item.id,
                                              comments: item.comments,
                                              title: item.title,
                                              roomname: item.roomname
                                          }
                                      }})
                                      isLoading(false)
                                  })

                          }
                          }>

                        <View>
                            <Text style = {styles.postTitle}>
                                Channel - {item.roomname}
                            </Text>
                            <TouchableOpacity style = {styles.trash}
                                              hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
                                              onPress = {() => deleteNoti(item)}
                            >
                                <Ionicons style = {styles.iconTrash}
                                          name={'trash-outline'} size={25}  />
                            </TouchableOpacity>
                            <Text style = {styles.postText}>
                                {item.user.display} commented on post {item.title}:
                            </Text>
                            <Text style = {styles.postText2}>
                                {item.text}
                            </Text>
                        </View>
                    </TouchableOpacity>

                )
            } else if (item.notiType === 2) {
                return (
                    <TouchableOpacity
                        style = {styles.group}
                          onPress ={() => {
                              setLoadingText("Group")
                              isLoading(true)
                              dispatch(fillGroupRoomState(item.roomid))
                                  .then(() => {
                                      props.navigation.navigate('GroupRooms', {screen : 'GroupRoom'})
                                      isLoading(false)
                                  })
                          }}>
                        <View>
                            <Text style = {styles.postTitle}>
                                Group - {item.roomname}
                            </Text>
                            <TouchableOpacity style = {styles.trash}
                                              hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
                                              onPress = {() => deleteNoti(item)}
                            >
                                <Ionicons style = {styles.iconTrash}
                                          name={'trash-outline'} size={25}  />
                            </TouchableOpacity>
                            <Text style = {styles.postText}>
                                {item.user.display} said:
                            </Text>
                            <Text style = {styles.postText2}>
                                {item.text}
                            </Text>
                        </View>
                    </TouchableOpacity>

                )
            } else if (item.notiType === 3) {
                return (
                    <TouchableOpacity
                        style = {styles.chat}
                        onPress ={() => {
                            setLoadingText("Chat")
                            isLoading(true)
                            dispatch(fillChatRoomState(item.roomid))
                                .then(() => {
                                    props.navigation.navigate('ChatRooms', {screen : 'ChatRoom'})
                                    isLoading(false)
                                })
                        }}>
                        <View>
                            <Text style = {styles.chatTitle}>
                                Chat - {item.roomname}
                            </Text>
                            <TouchableOpacity style = {styles.trash}
                                              hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
                                              onPress = {() => deleteNoti(item)}
                            >
                                <Ionicons style = {styles.iconTrashChatBlack}
                                          name={'trash-outline'} color={'white'} size={25}  />
                            </TouchableOpacity>
                            <Text style = {styles.chatText}>
                                {item.user.display} said:
                            </Text>
                            <Text style = {styles.chatText2}>
                                {item.text}
                            </Text>
                        </View>
                    </TouchableOpacity>


                )
            } else if (item.notiType === 4) {
                return (
                    <TouchableOpacity
                        style = {styles.chat}
                        onPress = {() => props.navigation.navigate('Main', {screen : 'Profile'})}>
                        <View>
                            <Text style = {styles.chatTitle}>
                                {item.title}
                            </Text>
                            <TouchableOpacity style = {styles.trash}
                                              hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
                                              onPress = {() => deleteNoti(item)}
                            >
                                <Ionicons style = {styles.iconTrashChatBlack}
                                          name={'trash-outline'} color={'white'} size={25}  />
                            </TouchableOpacity>
                            <Text style = {styles.chatText2}>
                                {item.text}
                            </Text>
                        </View>
                    </TouchableOpacity>

                )
            } else if (item.notiType === 5) {
                return (
                    <TouchableOpacity
                        style = {styles.request}
                        onPress = {() => props.navigation.navigate("Main", {screen: 'Pending'})}>
                        <View>
                            <Text style = {styles.requestTitle}>
                                Friend Request
                            </Text>
                            <TouchableOpacity style = {styles.trash}
                                              hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
                                              onPress = {() => deleteNoti(item)}
                            >
                                <Ionicons style = {styles.iconTrash}
                                          name={'trash-outline'} size={25}  />
                            </TouchableOpacity>
                            <Text style = {styles.requestText}>
                                {item.user.display} sent you a Friend Request!
                            </Text>
                        </View>
                    </TouchableOpacity>

                )
            } else if (item.notiType === 6) {
                return (
                    <TouchableOpacity
                        style = {styles.request}
                        onPress = {() => props.navigation.navigate("Main", {screen: 'Friends'})}>
                        <View>
                            <Text style = {styles.requestTitle}>
                                Friend Request
                            </Text>
                            <TouchableOpacity style = {styles.trash}
                                              hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
                                              onPress = {() => deleteNoti(item)}
                            >
                                <Ionicons style = {styles.iconTrash}
                                          name={'trash-outline'} size={25}  />
                            </TouchableOpacity>
                            <Text style = {styles.requestText}>
                                {item.user.display} accepted your Friend Request!
                            </Text>
                        </View>
                    </TouchableOpacity>

                )
            } else if (item.notiType === 7) {
                return (
                    <TouchableOpacity
                        style = {styles.request}
                        onPress = {() => props.navigation.navigate("Main", {screen: 'Friends'})}>
                        <View>
                            <Text style = {styles.requestTitle}>
                                Friend Request
                            </Text>
                            <TouchableOpacity style = {styles.trash}
                                              hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
                                              onPress = {() => deleteNoti(item)}
                            >
                                <Ionicons style = {styles.iconTrash}
                                          name={'trash-outline'} size={25}  />
                            </TouchableOpacity>
                            <Text style = {styles.requestText}>
                                {item.user.display} added you as a Friend!
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            }
    }

    return (
        <Screen style = {styles.container}>

            <Text
                style = {styles.notificationsText}>
                Your Notifications
            </Text>

        <View style = {styles.flatList}>
            <FlatList
                data={noti}
                renderItem={renderItem}
                extraData={[noti, count]}
                keyExtractor={item => item._id}
                contentContainerStyle={{ paddingBottom: 20 }}/>
        </View>

            {noti.length === 0 && <View style = {styles.container}>
                <Text>
                    You Have No Notifications!
                </Text>
            </View>
            }

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Loading {loadingText}
                </Text>
            </View>
            }

        </Screen>

    )
}