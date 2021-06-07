import React, {useState} from "react";
import styles from "../styling/constants/Search.styles";
import {TextInput, View} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

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
            <Ionicons style = {styles.icon}
                      name={'add-outline'} size={35}  />
        </View>
    )
}