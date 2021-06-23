import React, {useState} from "react";
import {Alert, Text, TextInput, TouchableOpacity} from "react-native";
import firebase, { usersCollection } from '../../../../../api/firebase';

import Screen from "../../../../components/Screen";

import styles from "../../../../styling/screens/In_App/settings/Security/Update_password.styles"

export default (props) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

    const updatePassword = async () => {
        if (oldPassword === '' || newPassword1 === '' || newPassword2 === '') {
            Alert.alert('Please fill in all fields.')
        } else if (newPassword1 !== newPassword2) {
            Alert.alert('Your new passwords do not match!')
        } else if (oldPassword === newPassword1) {
            Alert.alert('Your new password is the same as existing password!')
        } else {
            let getUser = firebase.auth().currentUser;
            let credential = firebase.auth.EmailAuthProvider
                            .credential(getUser.email, oldPassword);

            try {
                if (getUser) {
                    const response = await getUser.reauthenticateWithCredential(credential).then(async user => {
                        try {
                            const response1 = await getUser.updatePassword(newPassword1).then(() => {
                                console.log('password changed')
                                Alert.alert('Your password has been changed!')
                                props.navigation.navigate('Update_password');
                            })
                        } catch (error) { // catching errors for updateEmail
                            if (error.code === "auth/weak-password") {
                                Alert.alert("Please use a stronger password with at least 6 characters");
                            } 
                        }
                    })
                }
            } catch (error) { // catching errors for reauthenticateWithCredential
                if (error.code === "auth/wrong-password") {
                    Alert.alert('Oops! Please retry with the correct existing password.');
                }
            }
        }
    }

    const handleUpdatePassword = async () => {
        Alert.alert("Update Password", "Are you sure you want to update your password?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                    updatePassword()},
                },
                {
                    text: "No",
                    onPress: () => {},
                }
            ],)
    }

    return (
        <Screen style = {styles.container}>

            <Text style = {styles.passwordText}>
                Update Password
            </Text>
            <TextInput
                style = {styles.textInput}
                placeholder = "Enter Old Password"
                value = {oldPassword}
                onChangeText = {setOldPassword}
                autoCapitalize = "none"
                returnKeyType = "done"
            />
            <TextInput
                style = {styles.textInput}
                placeholder = "Enter New Password"
                value = {newPassword1}
                onChangeText = {setNewPassword1}
                autoCapitalize = "none"
                returnKeyType = "done"
            />
            <TextInput
                style = {styles.textInput}
                placeholder = "Re-enter New Password"
                value = {newPassword2}
                onChangeText = {setNewPassword2}
                autoCapitalize = "none"
                returnKeyType = "done"
            />
            <TouchableOpacity
                style = {styles.button}
            >
                <Text style = {styles.buttonText}
                onPress = {handleUpdatePassword}>
                Update Password</Text>
            </TouchableOpacity>

        </Screen>
    )
}