import React, {useRef, useState} from "react";
import {Image, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import firebase, { usersCollection } from '../../api/firebase';

import Screen from "../components/Screen";
import styles from "../styling/screens/RegisterScreen.styles"

export default (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, isPassVisible] = useState(true);

    const nextInput = useRef();

    const togglePassVisible = () => {
        isPassVisible(!showPass)
    }

    const handleRegister = async () => {
        try {
            const response = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            // this.handleStoreRegisterUser(user);
            // .sendEmailVerification();
            // alert("An verification link has been sent to your email. Please verify your account");
            props.navigation.navigate('Home');
        } catch (error) {
            if (error.code) {
                if (error.code === "auth/invalid-email") {
                    alert("Please enter a valid email address");
                } else if (error.code === "auth/email-already-in-use") {
                    alert("There is an existing account associated with this email. Forgot your password?");
                } else if (error.code === 'auth/weak-password') {
                    alert('Please use a stronger password at least 6 characters');
                }                
            }
        }
    }

    return (
        <Screen style = {styles.container}>
            <Text style = {styles.usernameText}>
                Choose Email, Password
            </Text>
            <TextInput
                style = {styles.textInput}
                placeholder = "Enter Email Here"
                value = {email}
                onChangeText = {setEmail}
                autoCapitalize = "none"
                returnKeyType = "next"
                onSubmitEditing = {() => nextInput.current.focus()}
                blurOnSubmit={false}
            />
            <View>
                <TextInput
                    ref = {nextInput}
                    style = {styles.textInput}
                    placeholder = "Enter Password Here"
                    value = {password}
                    onChangeText = {setPassword}
                    secureTextEntry = {showPass}
                />
                <Pressable
                    style = {styles.pressableToggle}
                    onPress = {togglePassVisible}>
                    <Image style = {styles.passwordToggle}
                           source = {require("../../assets/hide_password1.png")}/>
                </Pressable>
            </View>

            <TouchableOpacity
                style = {styles.button}
                onPress = {handleRegister}>
                <Text style = {styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </Screen>
    )
}
