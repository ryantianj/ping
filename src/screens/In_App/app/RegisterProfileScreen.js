import React, {useState, useEffect, useRef} from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList, ScrollView, Alert, Image
} from "react-native";
import firebase, { interestsCollection } from '../../../../api/firebase';

import Screen from "../../../components/Screen";
import styles from "../../../styling/screens/In_App/app/RegisterProfileScreen.styles";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const RegisterProfileScreen = (props) => {
    const [bio, setBio] = useState("");
    const [interests, setInterests] = useState([]); // Server-side choice list
    const [selectInterests, setSelectInterests] = useState([]); // Client-side choices
    const [selectedId, setSelectedId] = useState(0); // Render component when selected
    const [visibility, setVisibility] = useState(true);
    const [display, setDisplay] = useState("");
    const [image, setImage] = useState('')

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const deleteImage = () => {
        Alert.alert("Delete Image", "Are you sure you want to delete this Image?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        setImage('')},
                },
                {
                    text: "No",
                    onPress: () => {},
                }
            ],)
    }


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
        const subscriber = interestsCollection.onSnapshot(querySnapshot => {
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

    const publicTextSelected = () => {
        if (!visibility) {
            return styles.publicTextSelected
        } else {
            return styles.publicText
        }
    }

    const privateSelected = () => {
        if (visibility) {
            return styles.privateSelect
        } else {
            return styles.private
        }
    }

    const privateTextSelected = () => {
        if (visibility) {
            return styles.privateTextSelected
        } else {
            return styles.privateText
        }
    }

    return (
        <Screen style = {styles.container}>
            <View style = {styles.scrollView}>
            <ScrollView contentContainerStyle = {styles.scroll}
        >
                <Text style = {styles.headerText}>
                    Complete Your Profile
                </Text>

                <View style = {styles.titleLength}>
                    <Text>
                        Characters remaining: {150 - bio.length}
                    </Text>
                </View>
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
                <View style = {styles.titleLength}>
                    <Text>
                        Characters remaining: {15 - display.length}
                    </Text>
                </View>
                <View style = {styles.textInputDisplayContainer}>

                    <TextInput
                        ref = {nextInput}
                        style = {styles.textInputBio}
                        placeholder = "Display Name (max. 15 char)"
                        value = {display}
                        onChangeText = {setDisplay}
                        returnKeyType = "go"
                        maxLength = {15}
                    />
                </View>

                <Text style = {styles.headerText1}>
                    Display Photo
                </Text>
                {image === '' && <View style = {styles.attach}>
                    <Text>
                        Attach an Image:
                    </Text>
                    <TouchableOpacity
                        style = {styles.touchable}
                        onPress = {pickImage}
                    >
                        <Ionicons style = {styles.icon}
                                  name={'attach-outline'} size={35}  />
                    </TouchableOpacity>
                </View>}
                {image !== '' && <View style = {styles.delete}>
                    <TouchableOpacity
                        style = {styles.touchable}
                        onPress = {deleteImage}>
                        <Ionicons style = {styles.icon}
                                  name={'trash-outline'} size={35}  />
                    </TouchableOpacity>

                    <Text>
                        Delete Image
                    </Text>
                </View>
                }
                {image !== '' && <Image source={{ uri: image }} style={{ width: 200, height: 200 ,borderRadius: 200/2,}} />}
                <Text style = {styles.headerText1}>
                   Account Visibility
                </Text>

                <View style = {styles.visible}>
                    <TouchableOpacity
                        style = {publicSelected()}
                        onPress = {() => setVisibility(false)}>
                        <Text style = {publicTextSelected()}>Public</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {privateSelected()}
                        onPress = {() => setVisibility(true)}>
                        <Text style = {privateTextSelected()}>Private</Text>
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
                        style = {styles.flatList}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                </View>

            </ScrollView>
            </View>
            <View style = {styles.confirmProfile}>
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => {
                        if (display === '') {
                            Alert.alert('Display name cannot be empty!')
                        } else {
                        props.navigation.navigate("ConfirmProfile",
                            {bios: bio,
                            photo: image,
                            selectInterests: selectInterests.sort(),
                            visibility: visibility,
                            orgPhoto: image,
                            display: display,
                            update: false})}
                        }
                    }
                >
                    <Text style = {styles.buttonText}>Create Profile</Text>
                </TouchableOpacity>
            </View>
        </Screen>
    )
}

export default RegisterProfileScreen;