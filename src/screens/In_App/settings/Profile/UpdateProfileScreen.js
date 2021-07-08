import React, {useState, useEffect} from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList, ScrollView, Image, Alert
} from "react-native";
import firebase from "../../../../../api/firebase"
import store from "../../../../store";

import Screen from "../../../../components/Screen";
import styles from "../../../../styling/screens/In_App/settings/Profile/UpdateProfileScreen.styles"
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const UpdateProfileScreen = (props) => {
    const [bio, setBio] = useState(store.getState().user.user.bio);
    const [interests, setInterests] = useState([]); // Server-side choice list
    const [selectInterests, setSelectInterests] = useState([...store.getState().user.user.interests]); // Client-side choices
    const [selectedId, setSelectedId] = useState(store.getState().user.user.interests.length); // Render component when selected
    const [visibility, setVisibility] = useState(store.getState().user.user.visibility); //boolean,true == private
    const [display, setDisplay] = useState(store.getState().user.user.display)
    const [image, setImage] = useState(store.getState().user.user.photo)
    const [orgImage, setOrgImage] = useState(store.getState().user.user.photo)

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
            <View style = {styles.scrollView}>
            <ScrollView contentContainerStyle = {styles.scroll}
            >
            <Text style = {styles.headerText}>
                Update Your Profile
            </Text>
            <View style = {styles.textInputBioContainer}>
                <TextInput
                    multiline
                    style = {styles.textInputBio}
                    value = {bio}
                    onChangeText = {setBio}
                    returnKeyType = "go"
                    maxLength = {150}
                />

            </View>

            <Text style = {styles.headerText1}>
                Update Display Name
            </Text>
            <View style = {styles.textInputDisplayContainer}>
                <TextInput
                    style = {styles.textInputBio}
                    placeholder = "Display Name (max. 15 char)"
                    value = {display}
                    onChangeText = {setDisplay}
                    returnKeyType = "submit"
                    maxLength = {15}
                />
            </View>

            <Text style = {styles.headerText1}>
                Update Display Photo
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
                {image !== '' && <Image source={{ uri: image }} style={{ width: 200, height: 200 ,borderRadius: 200/2, marginBottom: 5}} />}

            <Text style = {styles.headerText1}>
                Update Visibility
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
                Update Interests
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
            </ScrollView>
            </View>
            <View style = {styles.updateProfile}>
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => props.navigation.navigate("ConfirmProfile",
                        {bios: bio,
                            selectInterests: selectInterests.sort(),
                            visibility: visibility,
                            photo: image,
                            orgPhoto: orgImage,
                            display: display,
                            update : true})
                    }
                >
                    <Text style = {styles.buttonText}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </Screen>
    )
}

export default UpdateProfileScreen;