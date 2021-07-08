import {Dimensions, StatusBar, StyleSheet} from "react-native";

import colours from "../../../../constants/colours"

const windowWidth = Dimensions.get('window').width;
const statusBar = StatusBar.currentHeight;

export default StyleSheet.create({
    container : {
        backgroundColor: colours.primary,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
    },
    textView : {
        // flex : 1,
        backgroundColor: colours.primary,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerText : {
        paddingTop: 10 + statusBar,
        fontSize: 28,
        color: 'black',
        textAlign: 'center',
        width: 2 * windowWidth / 3
    },
    headerText1 : {
        paddingTop: 10,
        fontSize: 28,
        color: 'black',
        textAlign: 'center',
        width: 2 * windowWidth / 3
    },
    textInputBio :{
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: colours.primary,
        width: 9 * windowWidth / 10,
        textAlignVertical: 'top',
    },
    flatList : {
        backgroundColor: colours.naviBar,
        marginTop: 20,
        padding: 10,
        marginBottom: 5,
        borderRadius: 10,
        fontSize: 17,
        width: 9 * windowWidth / 10
    },
    button : {
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
    textVisible : {
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center',
        color: colours.logOutButton,
    },
    scrollView: {
        top: 0,
        height: 670,
        // bottom: 90
    },
    scroll : {
        backgroundColor: colours.primary,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    confirmProfile: {
        position:'absolute',
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colours.primary,
        width: windowWidth,
        height: 65,
        flex: 1
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