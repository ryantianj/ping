import {Dimensions, Platform, StatusBar, StyleSheet} from "react-native";

import colours from "../../constants/colours";

const windowWidth = Dimensions.get('window').width;
const statusBar = StatusBar.currentHeight;

export default StyleSheet.create({
    container : {
        backgroundColor: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    usernameText : {
        paddingTop: 20 + statusBar,
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        width: 2 * windowWidth / 3
    },
    textInput :{
        paddingLeft: 15,
        textAlign: 'left',
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        marginTop: 20,
        backgroundColor: colours.textBox,
        width: 2 * windowWidth / 3,
        height: 50,
        borderRadius: 10
    },
    pressableToggle : {
        position: 'absolute',
        top: 30,
        left: 14 * windowWidth / 20,
        width: 40,
        height: 40,
    },
    passwordToggle : {
        width: 25,
        height: 25,
    },
    button : {
        marginTop: 20,
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
})