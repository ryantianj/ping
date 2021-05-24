import React, {useState, useRef} from "react";
import {Text, TextInput, TouchableOpacity, View, Image, Pressable} from "react-native";

import Screen from "../components/Screen";
import Logo from "../constants/Logo";
import styles from "../styling/screens/LoginScreen.styles";

export default (props) => {
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, isPassVisible] = useState(true);

    const nextInput = useRef();

    const togglePassVisible = () => {
        isPassVisible(!showPass)
    }

    return (
        <Screen style = {styles.container}>
            <Logo style = {styles.image} />
            <TextInput
                style = {styles.textInput}
                placeholder = "Username"
                value = {userName}
                onChangeText = {setuserName}
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
            onPress = {() => props.navigation.navigate('Home')}>
                <Text style ={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.forgotPasswordButton}
            onPress = {() => alert("not yet implemented")}>
                <Text style ={styles.forgotPasswordButtonText}>Forgot your Password ?</Text>
            </TouchableOpacity>

            <View style = {styles.signUpButtonTextOpac}>
                <Text style = {styles.signUpButtonText}>
                    Don't have an account? Sign up <Text
                    style = {styles.signUpButtonTextHere} onPress = {() => props.navigation.navigate('Register')}>
                    here
                </Text>

                </Text>
            </View>
        </Screen>
    )
}


