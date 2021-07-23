import React, {useState} from "react";
import {ActivityIndicator, Alert, Text, TouchableOpacity, View} from "react-native";

import Screen from "../../../components/Screen";

import styles from "../../../styling/screens/In_App/settings/Security.styles";

export default (props) => {

    const deleteAccount = async () => {

        Alert.alert("Delete Account", "Are you sure you want to delete your account? This action is irreversible.",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' , params: {deleteAccount: true}}],
                        })
                           },
                },
                {
                    text: "No",
                    onPress: () => {},
                }
            ],)



    }

    return (
        <Screen style = {styles.container}>
            <View>
                <TouchableOpacity
                    style = {styles.emailButton}
                    onPress = {() => props.navigation.navigate('Update_email')}
                >
                    <Text style = {styles.securityButtonText}>Update email</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.passwordButton}
                    onPress = {() => props.navigation.navigate('Update_password')}
                >
                    <Text style = {styles.securityButtonText}>Update password</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style = {styles.button}
                onPress={deleteAccount}>
                <Text style ={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>



        </Screen>
    )
}