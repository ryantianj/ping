import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity} from "react-native";

import Screen from "../../../../components/Screen";

import styles from "../../../../styling/screens/In_App/settings/Security/Update_email.styles"

export default (props) => {
    const [email, setEmail] = useState("");
    return (
        <Screen style = {styles.container}>

            <Text style = {styles.usernameText}>
                Enter new Email
            </Text>
            <TextInput
                style = {styles.textInput}
                placeholder = "Enter Email Here"
                value = {email}
                onChangeText = {setEmail}
                autoCapitalize = "none"
                returnKeyType = "done"
            />
            <TouchableOpacity
                style = {styles.button}
            >
                <Text style = {styles.buttonText}>Update Email</Text>
            </TouchableOpacity>

        </Screen>
    )
}