import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/RecommendationsScreen.styles'
import firebase, {usersCollection, channelsCollection} from "../../../../api/firebase";
import store from "../../../store";
import {fillChannelRoomState, fillChatRoomState, fillGroupRoomState} from "../../../roomsSlice";
import Ionicons from "react-native-vector-icons/Ionicons";

export default (props) => {
    const [recs, setRecs] = useState([]);
    const [count, setCount] = useState(0)
    const [loading, isLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');

    const dispatch = useDispatch();

    const uid = store.getState().user.user.uid;
    let omitRecs;
    const userInterests = store.getState().user.user.interests;

    useEffect(() => {
        omitRecs = store.getState().user.user.omitRecs;
        let recs;
        let recs1;
        let recs2;
        const userListener = usersCollection.doc(uid)
            .onSnapshot(snapshot => {
                omitRecs = snapshot.data().omitRecs
                channelsCollection.where('roomid', 'not-in', omitRecs)
                    .onSnapshot(snapshot => {
                        recs = snapshot.docs.map(doc => {
                            const firebase = doc.data()
                            const data = {
                                topics: firebase.topics,
                                roomname: firebase.roomname,
                                roomid: firebase.roomid,
                                users: firebase.users,
                            }
                            return data;
                        })
                        // data is an array of objects
                        // Remove channels that user is already in
                        recs1 = recs.filter(data => {
                            return !data.users.includes(uid)
                        })
                        // Sort channels by number of similar interests w user
                        recs2 = recs1.sort((data1, data2) => {
                            const data1topicscount = data1.topics.filter(topic => userInterests.includes(topic)).length;
                            const data2topicscount = data2.topics.filter(topic => userInterests.includes(topic)).length;
                            return data2topicscount - data1topicscount;
                        })
                        setRecs(recs2)
                        setCount(count + 1)
                    })

        })

        return () => userListener()
    }, [])

    const deleteRec = (item) => {
        usersCollection.doc(uid).update({
            omitRecs: firebase.firestore.FieldValue.arrayUnion(item.roomid)
        })
    }

    // REDO RENDER ITEM WHOLE THING
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style = {styles.post}
                onPress ={() => {
                    setLoadingText("Channel")
                    isLoading(true)
                        dispatch(fillChannelRoomState(item.roomid))
                            .then(() => {
                                isLoading(false)
                                props.navigation.navigate('Channels', { screen: 'ChannelRoom' })})
                    }
                }
            >
                <View>
                    <Text style = {styles.postTitle}>
                        {item.roomname}
                    </Text>
                    <TouchableOpacity style = {styles.trash}
                                        hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
                                        onPress = {() => deleteRec(item)}
                    >
                        <Ionicons style = {styles.iconTrash}
                                    name={'trash-outline'} size={25}  />
                    </TouchableOpacity>

                    <Text style = {styles.postText}>
                        Topics: {item.topics.join(', ')}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    return (
        <Screen style = {styles.container}>
            <Text
                style = {styles.notificationsText}>
                Recommended Channels For You
            </Text>

            <View style = {styles.flatList}>
                <FlatList
                    data={recs}
                    renderItem={renderItem}
                    extraData={[recs, count]}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{ paddingBottom: 20 }}/>
            </View>
            {/* <TouchableOpacity style = {styles.trash}
                              hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
                              onPress = {()=> console.log(recs)}
            >
                <Ionicons style = {styles.iconTrash}
                          name={'trash-outline'} size={25}  />
            </TouchableOpacity> */}

                {recs.length === 0 && <View style = {styles.container}>
                    <Text>
                        You Have No Recommendations :(
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