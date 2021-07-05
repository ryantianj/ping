import React, {useState } from "react";
import {
    Text,
    TouchableOpacity,
    View, ScrollView, ActivityIndicator, Alert
} from "react-native";
import  { usersCollection } from '../../../../api/firebase';
import { fillUserState } from '../../../usersSlice';
import { useDispatch } from 'react-redux';
import store from '../../../store';

import Screen from "../../../components/Screen";
import styles from "../../../styling/screens/In_App/app/ProfileConfirmScreen.styles";

const ProfileConfirmScreen = (props) => {
    const [bio, setBio] = useState(props.route.params.bios);
    const [selectInterests, setSelectInterests] = useState(props.route.params.selectInterests);
    const [visibility, setVisibility] = useState(props.route.params.visibility);
    const [display, setDisplay] = useState(props.route.params.display);
    const [loading, isLoading] = useState(false);

    const visible = () => {
        if (visibility) {
            return "Private"
        } else {
            return "Public"
        }

    }

    const uid = store.getState().user.user.uid;

    const dispatch = useDispatch();

    const submitProfileToDatabase = () => {
        isLoading(true);
        usersCollection
        .doc(uid)
        .update({
            bio: bio,
            interests: selectInterests,
            hasData: true,
            visibility: visibility,
            display: display,
            search: display.toLowerCase()
        })
    }

    return (

        <Screen style = {styles.container}>
            <ScrollView contentContainerStyle = {styles.scroll}
            >
                <View style = {styles.textView}>
                    <Text style = {styles.headerText}>
                        Your Bio
                    </Text>
                    <Text style = {styles.textInputBio}>{bio}</Text>

                    <Text style = {styles.headerText1}>
                        Display Name
                    </Text>
                    <Text style = {styles.textInputBio}>{display}</Text>

                    <Text style = {styles.headerText1}>
                        Account Visibility
                    </Text>
                    <Text  style = {styles.textVisible}>
                        {visible()}
                    </Text>

                    <Text style = {styles.headerText1}>
                        Selected Interests
                    </Text>
                    <Text style = {styles.textInputBio}>
                        {selectInterests.join(", ")}
                    </Text>
                </View>

            <TouchableOpacity
                style = {styles.button}
                onPress = {async () => {
                    await submitProfileToDatabase();
                    dispatch(fillUserState(uid)).then(() =>
                    {
                        isLoading(false);
                        if (props.route.params.update) {
                            Alert.alert("Profile", "Profile Updated")
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
        </ScrollView>
            {loading && props.route.params.update && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Updating Your Profile
                </Text>
            </View>
            }

            {loading && !props.route.params.update && <View style = {styles.loading}>
                <ActivityIndicator size="large" color={styles.loadingColour.color} />
                <Text>
                    Creating Your Profile
                </Text>
            </View>
            }
        </Screen>
    )
}

export default ProfileConfirmScreen;
