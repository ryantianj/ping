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

    useEffect(() => {

        setSearch(props.searchData.search)
        setUser(props.searchData.user)
    })

    const renderItem = ( {item}) => {

        return (
            <TouchableOpacity
                style = {styles.searchPress}
                onPress = {() => {props.navigation.navigate("addUser",{user: item})}}>
                <Text style = {styles.searchText}>
                    {item.display}
                </Text>
            </TouchableOpacity>

        )
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
               data={user}
               renderItem={renderItem}
               style = {styles.flatList}
               extraData={user}/>


       </Screen>
   )

}