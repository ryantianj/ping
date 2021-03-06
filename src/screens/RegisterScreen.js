import React, {useRef, useState} from "react";
import {ActivityIndicator, Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import firebase, { usersCollection} from '../../api/firebase';
import { fillUserState } from '../usersSlice';
import { useDispatch } from 'react-redux';

import Screen from "../components/Screen";
import styles from "../styling/screens/RegisterScreen.styles"
import store from "../store";

export default (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, isPassVisible] = useState(true);
    const [loading, isLoading] = useState(false);

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
                hasData: false,
                rooms: [],
                visibility: true,
                friends: [],
                pending: [],
                requested: [],
                display: "",
                search: "",
                searchHistory: [],
                channels: [],
                photo: "",
                omitRecs: ["a"]
            }).then(() => {
                usersCollection.doc(data.user.uid).collection('noti').add({
                    title: "Welcome!",
                    text: "Join the Milestone 3 channel by searching it!",
                    user: {
                        _id: '',
                        display: "Admin",
                        photo: ''
                    },
                    createdAt: new Date().getTime(),
                    //Users to send to
                    users: data.user.uid,
                    roomname: '',
                    notiType: 8,
                    roomid: '',
                })
            }).catch(e => {
                console.log(e);
            })


    }

    const handleRegister = async () => {
        try {
            isLoading(true);
            await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async user => {
                uid = user.user.uid;
                const response = await createUserInDatabase(user);
                user.user.sendEmailVerification().then(() => {
                    console.log('mail sent')
                    alert("An verification link has been sent to your email. Please verify your account")
                })
                // Set the user profile into global store
                dispatch(fillUserState(uid));
                isLoading(false);
                props.navigation.navigate('CreateProfile');
            })

        } catch (error) {
            isLoading(false);
            if (error.code === "auth/invalid-email") {
                Alert.alert("Please enter a valid email address");
            } else if (error.code === "auth/email-already-in-use") {
                Alert.alert("There is an existing account associated with this email. Forgot your password?");
            } else if (error.code === 'auth/weak-password') {
                Alert.alert("Please use a stronger password with at least 6 characters");
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

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Signing You Up
                </Text>
            </View>}
        </Screen>
    )
}
