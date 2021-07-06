import React, {useEffect, useState} from "react";
import {ActivityIndicator, Text, TextInput, View, FlatList, Keyboard} from "react-native";
import { TouchableOpacity} from 'react-native-gesture-handler'
import firebase, {usersCollection} from "../../api/firebase"
import store from "../store"

import styles from "../styling/constants/Search.styles";
import Ionicons from "react-native-vector-icons/Ionicons";

export default (props) => {
    const [search, setSearch] = useState("");
    const [user, setUser] = useState([]);
    const [channel, setChannel] = useState([]);
    const [total, setTotal] = useState([]);
    const [loading, isLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [focHistory, isFOCHistory] = useState(false);
    const [focBack, isFOCBack] = useState(false);

    const uid = store.getState().user.user.uid
    const addUser = (item) => {
        // makes sure u cant add yourself
        if (item.email !== store.getState().user.user.email) {
            user.push(item)
        }
    }

    const addChannel = (item) => {
        channel.push(item)
    }

    const saveSearchHistory = () => {
        const hist = search;
        //saves only past 3 searches
        if (history.length >= 3) {
            deleteHistory(history[0].history)
        }
        usersCollection.doc(uid).update({
            'searchHistory': firebase.firestore.FieldValue.arrayUnion(
                {
                    history: hist,
                })
        })
        setSearch('')
        setTotal([])
        setUser([]);
        setChannel([]);
        isFOCBack(false);
    }

    const deleteHistory = (item) => {
        usersCollection.doc(uid).update({
            'searchHistory': firebase.firestore.FieldValue.arrayRemove(
                {
                    history: item,
                })
        })
    }

    // Get history
    useEffect(() => {
        const historyListener = usersCollection.doc(uid)
            .onSnapshot(snapshot => {
                const firebase = snapshot.data()
                const historyArray = firebase.searchHistory
                setHistory(historyArray)
            })
        return () => {
            historyListener()
        };
    }, [])

    const showHistory = () => {
        isFOCHistory(true);
    }
    const closeResults = () => {
        isFOCBack(false);
        setSearch('')
        setTotal([])
        setUser([]);
        setChannel([]);
    }

    const liveSearch =  async (searching) => {
        if (searching === '') {
            isFOCHistory(true)
            setSearch('')
            setTotal([])
            setUser([]);
            setChannel([]);
        } else {
            isFOCHistory(false)
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
                isLoading(true)
                total.length = 0
                if (total.length === 0) {
                    total.push(0)
                }
                await users()
                await channels()
            }
            await both()
            isLoading(false)
        }

    }

    const renderItem = ( {item}) => {
        return (
            <View style = {styles.liveContainer}>
                <TouchableOpacity
                    style = {styles.searchPress}
                    onPress = {() => {
                        saveSearchHistory()
                        props.navigation.navigate("Search",
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
                    onPress = {() => {
                        saveSearchHistory()
                        props.navigation.navigate("Search",
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

    const renderHistory = ( {item}) => {
        return (
            <View style = {styles.historyContainer}>
                <TouchableOpacity
                    style = {styles.searchHistPress}
                    onPress={ () => liveSearch(item.history)}
                    >
                    <View style = {styles.hist}>
                        <Text style = {styles.searchHistText}>
                            {item.history}
                        </Text>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.trash}
                                  hitSlop = {{top: 100, bottom: 100, left: 100, right: 100}}
                                  onPress = {() => deleteHistory(item.history)}
                >
                    <Ionicons style = {styles.iconTrash}
                              name={'trash-outline'} size={25}  />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.searchBar}>
                <TextInput
                    style = {focBack ? styles.searchBarTextFoc:styles.searchBarText}
                    placeholder = {search === "" ? "Search (by display/channel)" : ''}
                    value = {search}
                    onChangeText = {liveSearch}
                    autoCapitalize = "none"
                    returnKeyType = "go"
                    onSubmitEditing = {()=> {if (search === "" || search === " ") {

                    } else {

                    }}}
                    onFocus = {() => {
                        isFOCBack(true)
                        showHistory()}}
                    onBlur = {() => {

                        }}
                    maxLength = {20}
                />
                {focBack && <View style = {styles.arrow}>
                    <TouchableOpacity onPress={() => {
                        Keyboard.dismiss()
                        closeResults()
                    }}>
                        <Ionicons style = {styles.iconArrow}
                                  name={'arrow-back-outline'} size={25}
                                  hitSlop={{top: 100, bottom: 100, left: 50, right: 50}}/>
                    </TouchableOpacity>
                </View>
                }
                {loading && <View style = {styles.loading}>
                    <ActivityIndicator size="large" color={styles.loadingColour.color} />
                </View>
                }
            </View>
            <View style = {styles.live}>
                <FlatList
                    data={total}
                    renderItem={renderItem}
                    style = {styles.flatList}
                    extraData={total}/>
            </View>

            {(search === '' && focHistory && focBack) && <View style = {styles.live}>
                <FlatList
                    data={history}
                    inverted
                    renderItem={renderHistory}
                    style = {styles.flatList2}
                    extraData={history}/>
            </View>}
        </View>
    )
}