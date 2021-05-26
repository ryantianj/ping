import React, {useState} from "react";
import styles from "../styling/constants/Search.styles";
import {TextInput, View} from "react-native";

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
        </View>
    )
}