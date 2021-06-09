import React, {useState, useRef} from "react";
import {Text, TextInput, TouchableOpacity, View, Image, Pressable, KeyboardAvoidingView} from "react-native";
import firebase from '../../api/firebase';
import { fillUserState, hasData } from '../usersSlice';
import { useDispatch , useSelector} from 'react-redux';
import store from "../store";

import Screen from "../components/Screen";
import Logo from "../constants/Logo";
import styles from "../styling/screens/LoginScreen.styles";
import colours from "../constants/colours";

const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, isPassVisible] = useState(true);

    const nextInput = useRef();

    const dispatch = useDispatch();

    const togglePassVisible = () => {
        isPassVisible(!showPass)
    }

    let uid;

    const handleLogin = async () => {
        if (email && password) {
            try {
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
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Main' }],
                                });
                            } else {
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'CreateProfile' }],
                                });
                            }
                            });
                            console.log('signed in, email verified')
                        } else {
                            alert('your account has not been verified. Please check your email for the verification link! Redirecting you back to the login screen.')
                        }
                    })               
            } catch (error) {
                if (error.code === "auth/invalid-email") {
                    alert("Please enter a valid email address");
                } else if (error.code === "auth/user-not-found") {
                    alert("A user with that email does not exist. Try signing up!");
                } else if (error.code === 'auth/wrong-password') {
                    alert('Oops! Please retry with the correct password :(');
                }                
            } finally {

            }
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

        </Screen>
    )
}

export default LoginScreen;