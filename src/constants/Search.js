import React, {useState} from "react";
import {TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from "../../api/firebase"

import styles from "../styling/constants/Search.styles";

export default (props) => {
    const [search, setSearch] = useState("");


    return (
        <View style = {styles.container}>
            <TextInput
                style = {styles.searchBarText}
                placeholder = "Search"
                value = {search}
                onChangeText = {setSearch}
                autoCapitalize = "none"
                returnKeyType = "go"/>
            <TouchableOpacity
                style = {styles.touchable}>
                <Ionicons style = {styles.icon}
                          name={'search-outline'} size={27}  />
            </TouchableOpacity>

        </View>
    )
}