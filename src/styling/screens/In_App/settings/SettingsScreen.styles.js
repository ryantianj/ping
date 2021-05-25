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
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    securityButton : {
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
    button : {
        position: 'absolute',
        bottom: 20,
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
})