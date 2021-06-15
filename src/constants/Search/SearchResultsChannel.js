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
    const [channel, setChannel] = useState([])

    useEffect(() => {
        setSearch(props.route.params.search)
        setChannel(props.route.params.channel)
    })

    const renderItemChannel = ( {item}) => {
        return (
            <TouchableOpacity
                style = {styles.searchPress}
                onPress = {() => {props.navigation.navigate("addChannel",{channel: item})}}>
                <Text style = {styles.searchText}>
                    {item.roomname}
                </Text>
            </TouchableOpacity>

        )
    }


    return (
        <Screen style = {styles.container}>
            <Text style = {styles.searchText}>
                Search: {search}
            </Text>

            <Text style = {styles.resultHeader}>
                Results:
            </Text>
            <FlatList
                data={channel}
                renderItem={renderItemChannel}
                style = {styles.flatList}
                extraData={channel}/>


        </Screen>
    )

}