import React from "react";
import {Pressable, View} from "react-native";

import Logo from "../constants/Logo";
import Settings from "../constants/Settings";
import Help from "../constants/Help";

import styles from "../styling/constants/Logo_Setting.style";

{/* P!ng logo, settings icon on all in-app pages*/}
export default (props) => {
    return (
        <View style = {styles.container}>
            <Logo style = {styles.image}/>
            <Pressable
                style = {styles.helpPress}
                onPress = {() => {
                    props.navigation.navigate('Settings', {screen: 'Help'})
                }}>
                <Help style = {styles.help}/>
            </Pressable>
            <Pressable
                style = {styles.settingsPress}
                onPress = {() => {
                    props.navigation.openDrawer()
                }}>
                <Settings style = {styles.settings}/>
            </Pressable>
        </View>
    );
}