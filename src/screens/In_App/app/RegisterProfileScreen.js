import React, {useState, useEffect} from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList
} from "react-native";
import firebase from '../../../../api/firebase';

import Screen from "../../../components/Screen";
import styles from "../../../styling/screens/In_App/app/RegisterProfileScreen.styles";

const RegisterProfileScreen = (props) => {
    const [bio, setBio] = useState("");
    const [interests, setInterests] = useState([]); // Server-side choice list
    const [selectInterests, setSelectInterests] = useState([]); // Client-side choices
    const [selectedId, setSelectedId] = useState(0); // Render component when selected

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
                Complete Your Profile
            </Text>
            <View style = {styles.textInputBioContainer}>
                <TextInput
                    multiline
                    style = {styles.textInputBio}
                    placeholder = "Create a Bio"
                    value = {bio}
                    onChangeText = {setBio}
                    returnKeyType = "done"
                    blurOnSubmit={false}
                    maxLength = {150}
                />

            </View>
            <Text style = {styles.headerText1}>
                Select Interests
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
                    selectInterests: selectInterests.sort()})}
            >
                <Text style = {styles.buttonText}>Create Profile</Text>
            </TouchableOpacity>
        </Screen>
    )
}

export default RegisterProfileScreen;