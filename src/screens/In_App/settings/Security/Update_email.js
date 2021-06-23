import React, {useState} from "react";
import {Alert, Text, TextInput, TouchableOpacity} from "react-native";
import firebase, { usersCollection } from '../../../../../api/firebase';

import Screen from "../../../../components/Screen";

import styles from "../../../../styling/screens/In_App/settings/Security/Update_email.styles"

export default (props) => {
    const [newEmail, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const updateEmail = async () => {
        let getUser = firebase.auth().currentUser;
        let credential = firebase.auth.EmailAuthProvider
                        .credential(getUser.email, password);

        // if user types his EXISTING email, no change occurs.
        if (password === '' || newEmail === '') {
            Alert.alert('Please fill in all fields.')
        } else if (newEmail === getUser.email) {
            Alert.alert('You have keyed in your existing email. Please try again with a new email.')
            return; 
        }

        try {
            if (getUser) {
                const response = await getUser.reauthenticateWithCredential(credential).then(async user => {
                    try {
                        const response1 = await getUser.updateEmail(newEmail).then(() => {
                            console.log('email changed')
                            user.user.sendEmailVerification().then(() => {
                                console.log('mail sent')
                                Alert.alert('Your account email has been changed! Please check your NEW associated email for an account verification link')
                                props.navigation.navigate('Settings_Screen');
                            })
                        })
                    } catch (error) { // catching errors for updateEmail
                        if (error.code === "auth/invalid-email") {
                            Alert.alert("Please enter a valid email address");
                        } else if (error.code === "auth/email-already-in-use") {
                            Alert.alert("A user with that email already exists! Please try another new email.");
                        }
                    }
                })
            }
        } catch (error) { // catching errors for reauthenticateWithCredential
            if (error.code === "auth/wrong-password") {
                Alert.alert('Oops! Please retry with the correct password :(');
            }
        }
    }

    const handleUpdateEmail = async () => {
        Alert.alert("Update Email", "Are you sure you want to update your email?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                    updateEmail()},
                },
                {
                    text: "No",
                    onPress: () => {},
                }
            ],)
    }

    return (
        <Screen style = {styles.container}>

            <Text style = {styles.usernameText}>
                Update Email
            </Text>
            <TextInput
                style = {styles.textInput}
                placeholder = "Enter New Email"
                keyboardType = "email-address"
                value = {newEmail}
                onChangeText = {setEmail}
                autoCapitalize = "none"
                returnKeyType = "done"
            />
            <TextInput
                style = {styles.textInput}
                placeholder = "Enter Existing Password"
                value = {password}
                onChangeText = {setPassword}
                autoCapitalize = "none"
                returnKeyType = "done"
            />
            <TouchableOpacity
                style = {styles.button}
            >
                <Text
                style = {styles.buttonText}
                onPress = {handleUpdateEmail}>
                Update Email</Text>
            </TouchableOpacity>

        </Screen>
    )
}