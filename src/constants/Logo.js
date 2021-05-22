import React from "react";
import {StyleSheet, View, Image} from "react-native";

import colours from "./colours";

export default (props) => {
    return (
        <View style = {styles.image}>
            <Image style = {styles.image} source = {require("../../assets/Logo.jpg")}/>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        flexDirection: "row",
        alignItems:"center"
    },
    image :{
        position:'absolute',
        width: 100,
        height: 80,
        left: 5,
        top: 5
    }
})