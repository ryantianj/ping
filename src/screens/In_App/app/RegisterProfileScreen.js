import React, {useState, useEffect, useRef} from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList, ScrollView
} from "react-native";
import firebase from '../../../../api/firebase';

import Screen from "../../../components/Screen";
import styles from "../../../styling/screens/In_App/app/RegisterProfileScreen.styles";

const RegisterProfileScreen = (props) => {
    const [bio, setBio] = useState("");
    const [interests, setInterests] = useState([]); // Server-side choice list
    const [selectInterests, setSelectInterests] = useState([]); // Client-side choices
    const [selectedId, setSelectedId] = useState(0); // Render component when selected
    const [visibility, setVisibility] = useState(true);
    const [display, setDisplay] = useState("");

    const nextInput = useRef();

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

    const publicSelected = () => {
        if (!visibility) {
            return styles.publicSelect
        } else {
            return styles.public
        }
    }
    const privateSelected = () => {
        if (visibility) {
            return styles.privateSelect
        } else {
            return styles.private
        }
    }

    return (
        <Screen style = {styles.container}>
            <ScrollView contentContainerStyle = {styles.scroll}
        >
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
                        returnKeyType = "next"
                        onSubmitEditing = {() => nextInput.current.focus()}
                        blurOnSubmit={false}
                        maxLength = {150}
                    />

                </View>

                <Text style = {styles.headerText1}>
                    Display Name
                </Text>
                <View style = {styles.textInputDisplayContainer}>
                    <TextInput
                        ref = {nextInput}
                        style = {styles.textInputBio}
                        placeholder = "Display Name"
                        value = {display}
                        onChangeText = {setDisplay}
                        returnKeyType = "go"
                        blurOnSubmit={false}
                        maxLength = {50}
                    />

                </View>

                <Text style = {styles.headerText1}>
                   Account Visibility
                </Text>

                <View style = {styles.visible}>
                    <TouchableOpacity
                        style = {publicSelected()}
                        onPress = {() => setVisibility(false)}>
                        <Text style = {styles.publicText}> Public</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {privateSelected()}
                        onPress = {() => setVisibility(true)}>
                        <Text style = {styles.privateText}> Private</Text>
                    </TouchableOpacity>
                </View>

                <Text style = {styles.headerText1}>
                    Select Interests
                </Text>

                <View style = {styles.flatListView}>
                    <FlatList
                        nestedScrollEnabled
                        data={interests}
                        renderItem={renderItem}
                        extraData={selectedId}
                        keyExtractor={item => item}
                        style = {styles.flatList}/>
                </View>


                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => props.navigation.navigate("ConfirmProfile",
                        {bios: bio,
                            selectInterests: selectInterests.sort(),
                            visibility: visibility,
                            display: display,
                            update: false})}
                >
                    <Text style = {styles.buttonText}>Create Profile</Text>
                </TouchableOpacity>
            </ScrollView>

        </Screen>
    )
}

export default RegisterProfileScreen;