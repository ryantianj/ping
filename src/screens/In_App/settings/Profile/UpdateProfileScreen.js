import React, {useState, useEffect} from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList
} from "react-native";
import firebase from "../../../../../api/firebase"
import store from "../../../../store";

import Screen from "../../../../components/Screen";
import styles from "../../../../styling/screens/In_App/settings/Profile/UpdateProfileScreen.styles"

const UpdateProfileScreen = (props) => {
    const [bio, setBio] = useState(store.getState().user.user.bio);
    const [interests, setInterests] = useState([]); // Server-side choice list
    const [selectInterests, setSelectInterests] = useState([...store.getState().user.user.interests]); // Client-side choices
    const [selectedId, setSelectedId] = useState(store.getState().user.user.interests.length); // Render component when selected

    const renderItem = ( {item} ) => {
        if (selectInterests.includes(item)) {
            return (
                <TouchableOpacity
                    style = {styles.renderItem}
                    onPress = {() => {
                        setSelectedId(selectedId + 1);
                        selectItem(item)
                    }}
                >
                    <Text style = {styles.selectedText}>{item}</Text>
                </TouchableOpacity>)

        } else {
            return (
                <TouchableOpacity
                    style = {styles.unRenderItem}
                    onPress = {() => {
                        setSelectedId(selectedId - 1);
                        selectItem(item);
                    }}
                >
                    <Text style = {styles.unselectedText}>{item}</Text>
                </TouchableOpacity>
            )
        }
    }


    const selectItem = (item) => {
        const index = selectInterests.indexOf(item)
        if (index >= 0) {
            selectInterests.splice(index, 1)
        } else {
            selectInterests.push(item)
        }
    }


    useEffect(() => {
        const subscriber = firebase.firestore()
            .collection('Interests')
            .onSnapshot(querySnapshot => {
                const interests = [];

                querySnapshot.forEach(documentSnapshot => {
                    interests.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setInterests(interests[0].fields)
            });

        return () => subscriber();
    }, []);



    return (
        <Screen style = {styles.container}>
            <Text style = {styles.headerText}>
                Update Your Profile
            </Text>
            <View style = {styles.textInputBioContainer}>
                <TextInput
                    multiline
                    style = {styles.textInputBio}
                    value = {bio}
                    onChangeText = {setBio}
                    returnKeyType = "done"
                    blurOnSubmit={false}
                    maxLength = {150}
                />

            </View>
            <Text style = {styles.headerText1}>
                Update Interests
            </Text>

            <FlatList
                data={interests}
                renderItem={renderItem}
                extraData={selectedId}
                keyExtractor={item => item}
                style = {styles.flatList}/>
            <TouchableOpacity
                style = {styles.button}
                onPress = {() => props.navigation.navigate("ConfirmProfile",
                    {bios: bio,
                        selectInterests: selectInterests.sort(),
                    update : true})
                }
            >
                <Text style = {styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
        </Screen>
    )
}

export default UpdateProfileScreen;