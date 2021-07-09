import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {ActivityIndicator, Alert, Text, TouchableOpacity, View} from "react-native";

import NaviBar from "./NaviBar";
import SettingsFriends from "./SettingsFriends";
import SettingsHelp from "./SettingsHelp";
import SettingsPending from "./SettingsPending";
import SettingsProfile from "./SettingsProfile";
import SettingsSecurity from "./SettingsSecurity";

import styles from "../styling/navigation/HomeNavigation.styles"
import Screen from "../components/Screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "../../api/firebase";
import {useDispatch} from "react-redux";
import {fillUserState} from "../usersSlice";
import store from "../store";

const Drawer = createDrawerNavigator();

export default (props) => {
    const [loading, isLoading] = useState(false);


    const backButton = () => {
        return (
            <TouchableOpacity style = {styles.icon}
            onPress = {() => props.navigation.navigate('Home')}>
                <Ionicons
                          name={'arrow-back-outline'} size={25}  />
            </TouchableOpacity>
        )
    }
    const handleLogout = async () => {
        Alert.alert("Log Out", "Are you sure you want to log out?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        logOut()},
                },
                {
                    text: "No",
                    onPress: () => {},
                }
            ],)

        const logOut = async () => {
            isLoading(true);
            const response = await firebase
                .auth()
                .signOut();
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) { console.log('signed out!') }
            });
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
            isLoading(false);
        }
    }


    const logout = (props) => {
        return (
            <DrawerContentScrollView {...props} contentContainerStyle = {styles.scrollView}>
                <View>
                    <DrawerItemList {...props} />
                </View>
                <View>
                    <DrawerItem
                        label="                             Log Out"
                        onPress={() => handleLogout()}
                        style = {styles.logout}
                        labelStyle = {styles.logoutText}/>
                </View>
            </DrawerContentScrollView>
        )
    }

    return (
        <Screen style = {styles.container}>
            <Drawer.Navigator
                drawerPosition = {"right"}
                drawerType={'slide'}
                sceneContainerStyle={styles.drawer}
                drawerStyle={styles.drawer}
                drawerContent={logout}
                options={{
                   drawerIcon: backButton
                }}
                lazy={true}
                // drawerContentOptions={styles.contentOptions}
            >
                <Drawer.Screen
                    name = "Home"
                    component = {NaviBar}
                    act
                    />
                <Drawer.Screen
                    name = "Profile"
                    component = {SettingsProfile}/>
                <Drawer.Screen
                    name = "Friends"
                    component = {SettingsFriends}/>
                <Drawer.Screen
                    name = "Pending"
                    component = {SettingsPending}/>
                <Drawer.Screen
                    name = "Security"
                    component = {SettingsSecurity}/> 
                <Drawer.Screen
                    name = "Help"
                    component = {SettingsHelp}/>

            </Drawer.Navigator>
            {loading && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Logging Out
                </Text>
            </View>
            }
        </Screen>

    )
}
