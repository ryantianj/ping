import {Dimensions, StatusBar, StyleSheet} from "react-native";

import colours from "../../../../constants/colours"

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
    headerText : {
        paddingTop: 10 + statusBar,
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        width: 2 * windowWidth / 3
    },
    headerText1 : {
        paddingTop: 10,
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        width: 2 * windowWidth / 3
    },
    textInputBio :{
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        fontSize: 20,
        backgroundColor: colours.primary,
        width: 9 * windowWidth / 10,
        textAlignVertical: 'top',
    },

    unRenderItem : {
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    unselectedText : {
        fontSize: 20,
        color: 'black'
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
    textVisible : {
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center',
        color: colours.logOutButton,
    },
    scroll : {
        backgroundColor: colours.primary,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
    },
})