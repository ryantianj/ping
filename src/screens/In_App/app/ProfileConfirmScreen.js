import React, {useState, useEffect} from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList
} from "react-native";
import firebase from '../../../../api/firebase';
import { fillUserState } from '../../../usersSlice';
import { useDispatch } from 'react-redux';
import store from '../../../store';

import Screen from "../../../components/Screen";
import styles from "../../../styling/screens/In_App/app/ProfileConfirmScreen.styles";

const ProfileConfirmScreen = (props) => {
    const [bio, setBio] = useState(props.route.params.bios);
    const [selectInterests, setSelectInterests] = useState(props.route.params.selectInterests);

    const renderItem = ( {item} ) => {
            return (
                <View
                    style = {styles.unRenderItem}
                >
                    <Text style = {styles.unselectedText}>{item}</Text>
                </View>
            )
    }

    const uid = store.getState().user.user.uid;

    const dispatch = useDispatch();

    const submitProfileToDatabase = () => {
        firebase.firestore()
        .collection('Users')
        .doc(uid)
        .update({
            bio: bio,
            interests: selectInterests,
            hasData: true
        })
        .then(() => {
            console.log('Profile added!');
        })
    }

    return (
        <Screen style = {styles.container}>
            <Text style = {styles.headerText}>
                Your Bio
            </Text>

            <Text style = {styles.textInputBio}>{bio}</Text>

            <Text style = {styles.headerText1}>
                Selected Interests
            </Text>
            <FlatList
                data={selectInterests}
                renderItem={renderItem}
                keyExtractor={item => item}
                style = {styles.flatList}/>
            <TouchableOpacity
                style = {styles.button}
                onPress = {async () => {
                    await submitProfileToDatabase();
                    dispatch(fillUserState(uid)).then(() =>
                    {
                        if (props.route.params.update) {
                            alert("Profile Updated!")
                            props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'Settings' }],
                            });
                        } else {
                            props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'Main' }],
                            });
                        }
                    });


                }}
            >
                <Text style = {styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
        </Screen>
    )
}

export default ProfileConfirmScreen;