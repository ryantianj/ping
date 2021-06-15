import React, {useEffect, useState} from "react";
import {
    Text,
    FlatList,
    View, TouchableOpacity,
} from "react-native";
import Screen from "../../components/Screen";


import styles from "../../styling/constants/Search/SearchResults.styles"
import Search from "../Search";


export default (props) => {
    const [search, setSearch] = useState('');
    const [user, setUser] = useState([])
    const [channel, setChannel] = useState([])
    const [total, setTotal] = useState([])

    useEffect(() => {
        setSearch(props.searchData.search)
        setUser(props.searchData.user)
        setChannel(props.searchData.channel)
        setTotal(props.searchData.total)
    })


    const renderItem = ( {item}) => {
        if (item.type === 0) {
            return (
                <TouchableOpacity
                    style = {styles.searchPress}
                    onPress = {() => {props.navigation.navigate("searchUsers",
                        {user: user,
                    search : search})}}>
                    <Text style = {styles.searchText}>
                        Users: {}
                        {item.user} result(s)
                    </Text>
                </TouchableOpacity>

            )
        } else {
            return (
                <TouchableOpacity
                    style = {styles.searchPress}
                    onPress = {() => {props.navigation.navigate("searchChannels",
                        {channel: channel,
                        search: search})}}>
                    <Text style = {styles.searchText}>
                        Channels: {}
                        {item.channel} result(s)
                    </Text>
                </TouchableOpacity>

            )
        }
    }


   return (
       <Screen style = {styles.container}>
           <View style = {styles.searchContainer}>
               <Search navigation = {props.navigation}/>
           </View>
           <Text style = {styles.searchText}>
               Search: {search}
           </Text>

           <Text style = {styles.resultHeader}>
               Results:
           </Text>
           <FlatList
               data={total}
               renderItem={renderItem}
               style = {styles.flatList}
               extraData={total}/>
       </Screen>
   )

}