import React, {useState, useRef} from "react";
import {Text, TextInput, TouchableOpacity, View, Image, Pressable} from "react-native";
import firebase, { usersCollection } from '../../api/firebase';

import Screen from "../components/Screen";
import Logo from "../constants/Logo";
import styles from "../styling/screens/LoginScreen.styles";

const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, isPassVisible] = useState(true);

    const nextInput = useRef();

    const togglePassVisible = () => {
        isPassVisible(!showPass)
    }

    const handleLogin = async () => {
        if (email && password) {
            try {
              const response = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);
                props.navigation.navigate('Home_Screen');
            } catch (error) {
                // console.log(error)
              if (error.code) {
                if (error.code === "auth/invalid-email") {
                    alert("Please enter a valid email address");
                } else if (error.code === "auth/user-not-found") {
                    alert("A user with that email does not exist. Try signing up!");
                } else if (error.code === 'auth/wrong-password') {
                    alert('Oops! Please retry with the correct password :(');
                }                
              }
            }
        }
    }

    return (
        <Screen style = {styles.container}>
            <Logo style = {styles.image} />
            <TextInput
                style = {styles.textInput}
                placeholder = "Email"
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
            onPress = {() => props.navigation.navigate('Forgot')}>
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