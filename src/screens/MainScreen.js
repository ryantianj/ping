import React from "react";
import {View} from "react-native";

import Logo from "../constants/Logo";
import styles from "../styling/screens/MainScreen.styles"


export default () => {
    return (
        <View style = {styles.main}>
            <Logo style = {styles.image}/>
        </View>

    )
}
