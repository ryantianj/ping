import {StyleSheet, Dimensions, StatusBar} from "react-native";
import colours from "../../../../../constants/colours"

const windowWidth = Dimensions.get('window').width;
const statusBar = StatusBar.currentHeight;

export default StyleSheet.create({
    container :{
        paddingTop: statusBar,
        backgroundColor: colours.primary,
        color: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    profileText: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        width: windowWidth
    },
    textInputBio :{
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        fontSize: 20,
        backgroundColor: colours.textBox,
        width: 9 * windowWidth / 10,
    },
    renderItem : {
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    selectedTextHeader : {
        fontSize: 25,
        color: 'black'
    },
    selectedText : {
        fontSize: 20,
        color: 'black'
    },
    button : {
        bottom: 10,
        fontSize: 50,
        borderRadius: 10,
        width: windowWidth / 2,
        height: 50,
        backgroundColor: colours.logInButton,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonReject : {
        bottom: 10,
        fontSize: 50,
        borderRadius: 10,
        width: windowWidth / 2,
        height: 50,
        backgroundColor: colours.logOutButton,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    flatList : {
        backgroundColor: colours.naviBar,
        marginTop: 20,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        fontSize: 17,
        width: 9 * windowWidth / 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
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