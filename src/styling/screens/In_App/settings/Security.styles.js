import {StyleSheet, Dimensions, StatusBar} from "react-native";
import colours from "../../../../constants/colours";

const windowWidth = Dimensions.get('window').width;
const statusBar = StatusBar.currentHeight;

export default StyleSheet.create({
    container :{
        paddingTop: statusBar ,
        backgroundColor: colours.primary,
        color: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    emailButton : {
        marginTop: 10,
        fontSize: 50,
        borderRadius: 10,
        width: 19 * windowWidth / 20,
        height: 50,
        backgroundColor: colours.settingsButton,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    passwordButton : {
        marginTop: 10,
        fontSize: 50,
        borderRadius: 10,
        width: 19 * windowWidth / 20,
        height: 50,
        backgroundColor: colours.settingsButton,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    securityButtonText : {
        color: 'black',
        textAlign: 'left',
        width: windowWidth,
        left: 20,
        fontSize: 20,
    },
    button : {
        marginBottom: 20,
        fontSize: 50,
        borderRadius: 10,
        width: 2 * windowWidth / 3,
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