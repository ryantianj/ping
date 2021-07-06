import React, {useState } from "react";
import {
    Text,
    TouchableOpacity,
    View, ScrollView, ActivityIndicator, Alert, Image
} from "react-native";
import firebase, { usersCollection } from '../../../../api/firebase';
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
    const [image, setImage] = useState(props.route.params.photo)
    const [orgImage, setOrgImage] = useState(props.route.params.orgPhoto)
    const [update, isUpdate] = useState(props.route.params.update)


    const visible = () => {
        if (visibility) {
            return "Private"
        } else {
            return "Public"
        }

    }

    const uid = store.getState().user.user.uid;

    const dispatch = useDispatch();

    const submitProfileToDatabase = async () => {
        isLoading(true);
        if (update) {
            const mediaLink = image !== '' ? await updateImage() : ''
            if ((orgImage !== '') && (orgImage !== image)) {
                const org = orgImage.substring(orgImage.lastIndexOf('/') + 1)
                const org1 = org.substring(0, org.lastIndexOf('?'))
                const deleteRef = firebase.storage().ref().child(org1);
                const deleteOrg = await deleteRef.delete()
            }
            usersCollection
                .doc(uid)
                .update({
                    bio: bio,
                    interests: selectInterests,
                    hasData: true,
                    visibility: visibility,
                    display: display,
                    search: display.toLowerCase(),
                    photo: mediaLink
                })
        } else {
            if (image !== '') {
                upLoadImage().then((link) => {
                    usersCollection
                        .doc(uid)
                        .update({
                            bio: bio,
                            interests: selectInterests,
                            hasData: true,
                            visibility: visibility,
                            display: display,
                            search: display.toLowerCase(),
                            photo: link
                        })
                })
            } else {
                usersCollection
                    .doc(uid)
                    .update({
                        bio: bio,
                        interests: selectInterests,
                        hasData: true,
                        visibility: visibility,
                        display: display,
                        search: display.toLowerCase(),
                        photo: image
                    })
            }
        }
    }

    const upLoadImage = async () => {
        const uri = image + ''
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const ref = firebase.storage().ref().child(image.substring(image.lastIndexOf('/') + 1));
        const snapshot = await ref.put(blob);

        // We're done with the blob, close and release it
        blob.close();

        return await snapshot.ref.getDownloadURL();
    }

    const updateImage = async () => {
        if (image === orgImage) {
            return image;
        } else {
            const uri = image + ''
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", uri, true);
                xhr.send(null);
            });

            const ref = firebase.storage().ref().child(image.substring(image.lastIndexOf('/') + 1));
            const snapshot = await ref.put(blob);

            // We're done with the blob, close and release it
            blob.close();

            return await snapshot.ref.getDownloadURL();
        }
    }

    return (

        <Screen style = {styles.container}>
            <ScrollView contentContainerStyle = {styles.scroll}
            >
                <View style = {styles.textView}>
                    <Text style = {styles.headerText}>
                        Your Bio:
                    </Text>
                    <Text style = {styles.textInputBio}>{bio}</Text>

                    <Text style = {styles.headerText1}>
                        Display Name:
                    </Text>
                    <Text style = {styles.textInputBio}>{display}</Text>

                    <Text style = {styles.headerText1}>
                        Display Photo:
                    </Text>
                    {image !== '' && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 200/2, marginTop: 12}} />}
                    {image === '' &&  <Text style = {styles.textInputBio}>No Photo</Text>}

                    <Text style = {styles.headerText1}>
                        Account Visibility:
                    </Text>
                    <Text  style = {styles.textVisible}>
                        {visible()}
                    </Text>

                    <Text style = {styles.headerText1}>
                        Selected Interests:
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
