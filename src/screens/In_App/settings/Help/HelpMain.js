import React  from "react";
import {Text, TouchableOpacity, Linking} from "react-native";

import Screen from "../../../../components/Screen";

import styles from "../../../../styling/screens/In_App/settings/Help/HelpMain.styles"

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <Text style = {styles.headerText}>
                Getting started with P!ng
            </Text>

            <Text style = {styles.bodyText}>
                Welcome to P!ng! We aim to create an easy-to-use platform for all to enjoy. 
                {"\n\n"}
                Click on the links below for help on the related sections:
            </Text>

            <TouchableOpacity
                style = {styles.Button}
                onPress = {() => props.navigation.navigate("Rooms")}
            >
                <Text style = {styles.ButtonText}>Rooms</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.Button}
                onPress = {() => props.navigation.navigate("Friends")}
            >
                <Text style = {styles.ButtonText}>Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.Button}
                onPress = {() => props.navigation.navigate("Badges")}
            >
                <Text style = {styles.ButtonText}>Badges</Text>
            </TouchableOpacity>

            <Text style = {styles.bodyText2}>
                Or, learn more about the features and makings of the app at the{' '}
                <Text style={{color: 'blue'}}
                onPress={() => Linking.openURL(
    'https://docs.google.com/document/d/1mzwoHFd03CGMkRRpKU0gvXOloZgC4ZbhHERJfDL_xCc/edit?usp=sharing'
                )}>
                Official P!ng Documentation
                </Text>
                !
            </Text>
    
        </Screen>
    )
}