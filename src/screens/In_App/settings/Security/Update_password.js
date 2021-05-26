import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity} from "react-native";
import firebase, { usersCollection } from '../../../../../api/firebase';

import Screen from "../../../../components/Screen";

import styles from "../../../../styling/screens/In_App/settings/Security/Update_password.styles"

export default (props) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

    const handleUpdatePassword = async () => {
        if (newPassword1 !== newPassword2) {
            alert('Your new passwords do not match!')
        } else if (oldPassword === newPassword1) {
            alert('Your new password cannot be the same as your existing password. Please try something new.')
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
                                alert('Your password has been changed!')
                                props.navigation.navigate('Update_password');
                            })
                        } catch (error) { // catching errors for updateEmail
                            if (error.code === "auth/weak-password") {
                                alert("Please use a stronger password with at least 6 characters");
                            } 
                        }
                    })
                }
            } catch (error) { // catching errors for reauthenticateWithCredential
                if (error.code === "auth/wrong-password") {
                    alert('Oops! Please retry with the correct existing password.');
                }
            }
        }
    }

    return (
        <Screen style = {styles.container}>

            <Text style = {styles.passwordText}>
                Enter new Password
            </Text>
            <TextInput
                style = {styles.textInput}
                placeholder = "Enter Old Password Here"
                value = {oldPassword}
                onChangeText = {setOldPassword}
                autoCapitalize = "none"
                returnKeyType = "done"
            />
            <TextInput
                style = {styles.textInput}
                placeholder = "Enter New Password Here"
                value = {newPassword1}
                onChangeText = {setNewPassword1}
                autoCapitalize = "none"
                returnKeyType = "done"
            />
            <TextInput
                style = {styles.textInput}
                placeholder = "Re-enter New Password Here"
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