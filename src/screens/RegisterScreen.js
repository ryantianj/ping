import React, {useRef, useState} from "react";
import {Image, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import firebase, { usersCollection } from '../../api/firebase';
import { fillUserState } from '../usersSlice';
import { useSelector, useDispatch } from 'react-redux';

import Screen from "../components/Screen";
import styles from "../styling/screens/RegisterScreen.styles"

export default (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, isPassVisible] = useState(true);

    const nextInput = useRef();
    
    const dispatch = useDispatch();

    const togglePassVisible = () => {
        isPassVisible(!showPass)
    }

    let uid = null;

    const createUserInDatabase = (data) => {
            usersCollection.doc(data.user.uid).set({
                uid: data.user.uid,
                email: data.user.email,
                activityLog: [],
                badges: {},
                bio: "",
                expert: [],
                interests: [],
                hasData: false
            }).then(() => {
                console.log(data)
            }).catch(e => {
                console.log(e);
            })
    }

    const handleRegister = async () => {
        try {
            firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async user => {
                uid = user.user.uid;
                const response = await createUserInDatabase(user);
                user.user.sendEmailVerification().then(() => {
                    console.log('mail sent')
                    alert("An verification link has been sent to your email. Please verify your account")
                })

                console.log(uid);
                // Set the user profile into global store
                dispatch(fillUserState(uid));
            })
            props.navigation.navigate('CreateProfile');

        } catch (error) {
            if (error.code) {
                if (error.code === "auth/invalid-email") {
                    alert("Please enter a valid email address");
                } else if (error.code === "auth/email-already-in-use") {
                    alert("There is an existing account associated with this email. Forgot your password?");
                } else if (error.code === 'auth/weak-password') {
                    alert("Please use a stronger password with at least 6 characters");
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
                keyboardType = "email-address"
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
