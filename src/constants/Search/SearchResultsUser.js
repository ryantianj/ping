import React, {useEffect, useState} from "react";
import {
    Text,
    FlatList,
     TouchableOpacity,
} from "react-native";
import Screen from "../../components/Screen";
import {useDispatch} from "react-redux";

import styles from "../../styling/constants/Search/SearchResults.styles"
import {fillUserState} from "../../usersSlice";
import store from "../../store";

export default (props) => {
    const [search, setSearch] = useState('');
    const [user, setUser] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {

        setSearch(props.route.params.search)
        setUser(props.route.params.user)
    })

    const renderItem = ( {item}) => {

        return (
            <TouchableOpacity
                style = {styles.searchPress}
                onPress = {() => {
                    dispatch(fillUserState(store.getState().user.user.uid))
                        .then(() =>  props.navigation.navigate("addUser",{user: item}))
                   }}>
                <Text style = {styles.searchText}>
                    {item.display}
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
                data={user}
                renderItem={renderItem}
                style = {styles.flatList}
                extraData={user}
                keyExtractor={item => item.uid}/>


        </Screen>
    )

}