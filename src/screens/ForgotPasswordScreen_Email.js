import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity} from "react-native";
import firebase, { usersCollection } from '../../api/firebase';

import Screen from "../components/Screen";
import styles from "../styling/screens/ForgotPasswordScreen_Email.styles";

export default (props) => {
    const [email, setEmail] = useState("");

    const handleResetPassword = async () => {
        try {
            firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(user => {
                     console.log('mail sent')
                     alert("A password reset link has been sent to your email.")
            })
            // this.handleStoreRegisterUser(user);
            props.navigation.navigate('Home_Screen');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Screen style = {styles.container}>
            <Text style = {styles.usernameText}>
                Enter Email
            </Text>
            <TextInput
                style = {styles.textInput}
                placeholder = "Enter Email Here"
                value = {email}
                onChangeText = {setEmail}
                autoCapitalize = "none"
                returnKeyType = "next"
                blurOnSubmit={false}
            />

            <TouchableOpacity
                style = {styles.button}
                onPress = {handleResetPassword}
                >
                <Text style = {styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </Screen>
    )
}