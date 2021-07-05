import React, {useState, useEffect} from "react";
import {Alert, ActivityIndicator, Text, TextInput, View, FlatList, TouchableOpacity as TouchableOpacity1} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity} from 'react-native-gesture-handler'
import firebase from "../../api/firebase"
import store from "../store"

import styles from "../styling/constants/Search.styles";

export default (props) => {
    const [search, setSearch] = useState("");
    const [user, setUser] = useState([]);
    const [channel, setChannel] = useState([]);
    const [total, setTotal] = useState([]);
    const [totalNum, setTotalNum] = useState(0);
    const [loading, isLoading] = useState(false);
    const [count, setCount] = useState(0);

    const addUser = (item) => {
        // makes sure u cant add yourself
        if (item.email !== store.getState().user.user.email) {
            user.push(item)
        }
    }

    const addChannel = (item) => {
        channel.push(item)
    }

    const liveSearch =  async (searching) => {
        if (searching === '') {
            setSearch('')
            setTotal([])
            setUser([]);
            setChannel([]);
        } else {
            setSearch(searching)
            // Search users
            const lower = searching.toLowerCase();
            const users = async () => firebase.firestore()
                .collection('Users')
                .where('search', '>=', lower)
                .where('search', '<=', lower + '\uf8ff')
                .get().then((querySnapshot) => {
                    user.length = 0
                    querySnapshot.forEach((doc) => {
                        addUser(doc.data())
                    });
                })
            // Search channels
            const channels = async () => firebase.firestore()
                .collection('Channel')
                .where('search', '>=', lower)
                .where('search', '<=', lower + '\uf8ff')
                .get().then((querySnapshot) => {
                    channel.length = 0
                    querySnapshot.forEach((doc) => {
                        addChannel(doc.data())
                    });
                })
            const both = async () => {
                total.length = 0
                if (total.length === 0) {
                    total.push(0)
                    console.log(total)
                }
                await users()
                await channels()
            }
            await both()
            setCount(count + 1)
        }

    }

    // const submitQueryToDatabase = () => {
    //     if (search === "") {
    //         Alert.alert("Search", "Empty search is not allowed");
    //         return;
    //     }
    //     isLoading(true)
    //     setUser([]);
    //     setChannel([]);
    //     setTotal([]);
    //     // Search users
    //     const lower = search.toLowerCase();
    //     const users = () => firebase.firestore()
    //         .collection('Users')
    //         .where('search', '>=', lower)
    //         .where('search', '<=', lower + '\uf8ff')
    //         .get().then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 addUser(doc.data())
    //             });
    //         }).then(() => {
    //             total.push({user: user.length,
    //                 type : 0})
    //         })
    //     // Search channels
    //     const channels = () => firebase.firestore()
    //         .collection('Channel')
    //         .where('search', '>=', lower)
    //         .where('search', '<=', lower + '\uf8ff')
    //         .get().then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 addChannel(doc.data())
    //             });
    //         }).then(() => {
    //             total.push({channel: channel.length,
    //                 type : 1})
    //         })
    //     users().then(() => channels())
    //         .then(() => {
    //             isLoading(false)
    //             props.navigation.navigate('Search',
    //                 {   search: search,
    //                     user: user,
    //                     channel: channel,
    //                     total: total
    //                 })
    //             setSearch('')
    //         })
    //         .catch((error) => {
    //             isLoading(false)
    //             alert("Invalid Query")
    //         })
    // }

    const renderItem = ( {item}) => {
        return (
            <View style = {styles.liveContainer}>
                <TouchableOpacity
                    style = {styles.searchPress}
                    onPress = {() => {props.navigation.navigate("Search",
                        {screen: 'searchUsers',
                        params : {user: user,
                            search : search}}
                        )}}>
                    <Text style = {styles.searchText}>
                        Users: {}
                        {user.length} result(s)
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.searchPress}
                    onPress = {() => {props.navigation.navigate("Search",
                        {screen: 'searchChannels',
                        params: {channel: channel,
                            search: search}}
                        )}}>
                    <Text style = {styles.searchText}>
                        Channels: {}
                        {channel.length} result(s)
                    </Text>
                </TouchableOpacity>
            </View>

        )
    }

    return (
        <View style = {styles.container}>
            <TextInput
                style = {styles.searchBarText}
                placeholder = "Search (by display/channel)"
                value = {search}
                onChangeText = {liveSearch}
                autoCapitalize = "none"
                returnKeyType = "go"
                // onSubmitEditing = {()=> submitQueryToDatabase()}
                />
            <TouchableOpacity1
                style = {styles.touchable}
                onPress = {() => {console.log(total)
                    }}>
                <Ionicons style = {styles.icon}
                          name={'search-outline'} size={27}  />
            </TouchableOpacity1>

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Searching
                </Text>
            </View>
            }

            <View style = {styles.live}>
                <FlatList
                    data={total}
                    renderItem={renderItem}
                    style = {styles.flatList}
                    extraData={total}/>
            </View>
        </View>
    )
}