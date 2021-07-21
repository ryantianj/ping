import React, {useState, useRef, useEffect} from "react";
import {Text, TextInput, TouchableOpacity, View, Image, Pressable, Alert, ActivityIndicator} from "react-native";
import firebase, {usersCollection} from '../../api/firebase';
import { fillUserState } from '../usersSlice';
import { useDispatch } from 'react-redux';
import store from "../store";

import Screen from "../components/Screen";
import Logo from "../constants/Logo";
import styles from "../styling/screens/LoginScreen.styles";

const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, isPassVisible] = useState(true);
    const [loading, isLoading] = useState(false);

    const nextInput = useRef();

    const dispatch = useDispatch();

    const togglePassVisible = () => {
        isPassVisible(!showPass)
    }

    let uid;

    // useEffect(() => {
    //     usersCollection.get().then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             doc.ref.update({
    //                 omitRecs: ['a']
    //             });
    //         });
    //     });
    // },[])

    const handleLogin = async () => {
        if (email && password) {
            try {
                isLoading(true);
                const response = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(user => {
                        console.log('signed in, awaiting verification')
                        if (user.user.emailVerified) {
                            uid = user.user.uid;
                            // Set the user profile into global store
                            dispatch(fillUserState(uid)).then(() => {
                                if(store.getState().user.user.hasData) {
                                    isLoading(false);
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Main' }],
                                });
                            } else {
                                    isLoading(false);
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'CreateProfile' }],
                                });
                            }
                            });
                            console.log('signed in, email verified')
                        } else {
                            isLoading(false);
                            Alert.alert("Error",'your account has not been verified. Please check your email for the verification link! Redirecting you back to the login screen.')
                        }
                    })               
            } catch (error) {
                isLoading(false);
                if (error.code === "auth/invalid-email") {
                    Alert.alert("Error","Please enter a valid email address");
                } else if (error.code === "auth/user-not-found") {
                    Alert.alert("Error","A user with that email does not exist. Try signing up!");
                } else if (error.code === 'auth/wrong-password') {
                    Alert.alert("Error",'Oops! Please retry with the correct password :(');
                }                
            }
        } else {
            Alert.alert("Error", "Empty Email or Password")
        }
    }

    return (
        <Screen style = {styles.container}>
            <Logo style = {styles.image} />
            <Text>
                Connect like never before.
            </Text>
            <TextInput
                style = {styles.textInput}
                placeholder = "Email"
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
                    placeholder = "Password"
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
                returnKeyType = "go"
                onPress = {handleLogin}>
                <Text style ={styles.buttonText}>Log In</Text>
            </TouchableOpacity>


            <TouchableOpacity
            style = {styles.forgotPasswordButton}
            onPress = {() => {props.navigation.navigate('Forgot');
                }}>
                <Text style ={styles.forgotPasswordButtonText}>Forgot your Password ?</Text>
            </TouchableOpacity>

            <View style = {styles.signUpButtonTextOpac}>
                <Text style = {styles.signUpButtonText}>
                    Don't have an account? Sign up <Text
                    style = {styles.signUpButtonTextHere}
                    onPress = {() => props.navigation.navigate('Register')}
                >
                    here
                </Text>

                </Text>
            </View>

            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Logging in
                </Text>
            </View>
            }

        </Screen>
    )
}

export default LoginScreen;