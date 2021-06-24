import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity, Alert} from "react-native";
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
                     Alert.alert("A password reset link has been sent to your email.")
            })
            // this.handleStoreRegisterUser(user);
            props.navigation.navigate('Login');
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
                keyboardType = "email-address"
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
                <Text style = {styles.buttonText}>Send Password Reset Link</Text>
            </TouchableOpacity>
        </Screen>
    )
}