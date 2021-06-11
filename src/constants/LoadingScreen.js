import React, {useState} from "react";
import {
    Text,
    View, ActivityIndicator,
} from "react-native";



import Screen from "../components/Screen";
import colours from "./colours";

import styles from '../styling/constants/LoadingScreen.styles';




export default (props) => {
    const [count, setCount] = useState(0);


    const loadingDelay = async () => {
        setTimeout(() => {props.navigation.reset({
            index: 0,
            routes: [{ name: props.route.params.screen }],
        })},10)
    }

    if (count === 0) {
        loadingDelay()
        setCount(count + 1);
    }

    return (
        <Screen style = {styles.container}>
            <Text style = {styles.loadingText}>Loading</Text>
            <View styles = {styles.indicator}>
                <ActivityIndicator size="large" color = {colours.chat}/>
            </View>
        </Screen>
        )
}