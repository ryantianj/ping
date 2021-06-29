import {StyleSheet, Dimensions } from "react-native";
import colours from "../../../../../constants/colours";

const windowWidth = Dimensions.get('window').width;


export default StyleSheet.create({
    container: {
        backgroundColor: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textInputTitle : {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        backgroundColor: colours.textBox,
        width: 9 * windowWidth / 10,
        borderRadius: 10,
        textAlignVertical: 'top',
    },
    textInputBio :{
        flex: 9,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        backgroundColor: colours.textBox,
        width: 9 * windowWidth / 10,
        borderRadius: 10,
        textAlignVertical: 'top',
    },button : {
        marginBottom: 10,
        paddingTop: 13,
        fontSize: 50,
        borderRadius: 10,
        width: 2 * windowWidth / 3,
        height: 50,
        backgroundColor: colours.logInButton
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    loading : {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colours.primary
    },
    loadingColour: {
        color : colours.logInButton
    }

})