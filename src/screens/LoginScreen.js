import React, {useState, useRef, useEffect } from "react";
import {Text, TextInput, TouchableOpacity, View, Image, Pressable, Alert, ActivityIndicator} from "react-native";
import firebase, {channelsCollection, roomsCollection, usersCollection} from '../../api/firebase';
import { fillUserState } from '../usersSlice';
import { useDispatch } from 'react-redux';
import store from "../store";

import Screen from "../components/Screen";
import Logo from "../constants/Logo";
import styles from "../styling/screens/LoginScreen.styles";
import {useIsFocused} from "@react-navigation/native";

const LoginScreen = (props) => {
    const isFocused = useIsFocused()
    const checkDelete = () => {
        return props.route.params.deleteAccount === true;
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, isPassVisible] = useState(true);
    const [loading, isLoading] = useState(false);
    const [loading1, isLoading1] = useState(props.route.params !== undefined ? checkDelete() : false);
    const [deleteAccount, isDeleteAccount] = useState(props.route.params !== undefined ? checkDelete() : false);

    const nextInput = useRef();



    const dispatch = useDispatch();

    const togglePassVisible = () => {
        isPassVisible(!showPass)
    }

    let uid;

        const deleteAccountData = async () => {
            if (deleteAccount) {
                const uid = store.getState().user.user.uid
                const pic = store.getState().user.user.photo
                const firebaseData = await usersCollection.doc(uid).get()
                // delete from friends
                const deleteFriends = async () => {
                    const friendsArray = firebaseData.data().friends
                    friendsArray.forEach(async friendUid => {
                        await usersCollection
                            .doc(friendUid)
                            .update({
                                friends: firebase.firestore.FieldValue.arrayRemove(uid)
                            })
                    })
                }
                // delete from rooms
                const deleteRooms = async () => {
                    const channelsArray = firebaseData.data().channels
                    const roomsArray = firebaseData.data().rooms
                    channelsArray.forEach(async channelId => {
                        await channelsCollection.doc(channelId)
                            .update({
                                users: firebase.firestore.FieldValue.arrayRemove(uid)
                            })
                    })
                    roomsArray.forEach(async roomId => {
                        await roomsCollection.doc(roomId)
                            .update({
                                users: firebase.firestore.FieldValue.arrayRemove(uid)
                            })
                    })
                }
                // delete profile pic
                const deletePic = async () => {
                    if (pic !== '') {
                        const org = pic.substring(pic.lastIndexOf('/') + 1)
                        const org1 = org.substring(0, org.lastIndexOf('?'))
                        const deleteRef = firebase.storage().ref().child(org1);
                        const deleteOrg = await deleteRef.delete()
                    }
                }
                // delete user doc
                const deleteUserDoc = async () => {
                    await usersCollection.doc(uid).delete().then(() => {
                    })
                }
                // delete user auth
                const deleteUserAuth = async () => {
                    const user = await firebase.auth().currentUser;
                    user.delete().then(() => {
                    })
                }
                await deleteFriends()
                await deleteRooms()
                await deletePic()
                await deleteUserDoc()
                await deleteUserAuth()

                Alert.alert("Delete Account", "Your account has been deleted! Thank you for using P!ng!")
            } else {

            }
            isDeleteAccount(false)
            isLoading1(false)

        }

    if (isFocused && deleteAccount) {
        setTimeout(() => {deleteAccountData()}, 1000)
    }




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
            onPress = {() => {
                props.navigation.navigate('Forgot');
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
            {loading1 && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Deleting Account
                </Text>
                <Text>
                    This may take a while
                </Text>
            </View>
            }

        </Screen>
    )
}

export default LoginScreen;