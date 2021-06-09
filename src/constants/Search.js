import React, {useState} from "react";
import {TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from "../../api/firebase"
import store from "../store"

import styles from "../styling/constants/Search.styles";

export default (props) => {
    const [search, setSearch] = useState("");
    const [user, setUser] = useState([]);

    const addUser = (item) => {
        // makes sure u cant add yourself
        if (item.email !== store.getState().user.user.email) {
            user.push(item)
        }
    }


    const submitQueryToDatabase = () => {
        setUser([]);
        firebase.firestore()
            .collection('Users')
            .where('display', '>=', search)
            .where('display', '<=', search + '\uf8ff')
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    addUser(doc.data())
                });
            })
            .then(() => {
                props.navigation.navigate('Search',
                {   search: search,
                    user: user,
                })
                })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }

    return (
        <View style = {styles.container}>
            <TextInput
                style = {styles.searchBarText}
                placeholder = "Search (by display name)"
                value = {search}
                onChangeText = {setSearch}
                autoCapitalize = "none"
                returnKeyType = "go"
                onSubmitEditing = {()=> submitQueryToDatabase()}/>
            <TouchableOpacity
                style = {styles.touchable}
                onPress = {() => {submitQueryToDatabase()
                    }}>
                <Ionicons style = {styles.icon}
                          name={'search-outline'} size={27}  />
            </TouchableOpacity>

        </View>
    )
}