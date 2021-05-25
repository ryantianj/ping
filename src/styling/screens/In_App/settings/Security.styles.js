import {StyleSheet, Dimensions, StatusBar} from "react-native";
import colours from "../../../../constants/colours";

const windowWidth = Dimensions.get('window').width;
const statusBar = StatusBar.currentHeight;

export default StyleSheet.create({
    container :{
        paddingTop: statusBar + 20,
        backgroundColor: colours.primary,
        color: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    security :{
        left: 15,
        fontSize: 35,
        textAlign: 'left',
        width: windowWidth
    },
    emailButton : {
        marginTop: 30,
        fontSize: 50,
        borderRadius: 10,
        width: windowWidth,
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
        width: windowWidth,
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
})