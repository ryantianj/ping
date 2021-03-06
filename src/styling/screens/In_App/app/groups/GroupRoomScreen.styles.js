import {StyleSheet, Dimensions} from "react-native";
import colours from "../../../../../constants/colours";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container : {
        backgroundColor: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    flatList : {
        flex: 1,
        backgroundColor: colours.chat,
        width: windowWidth,
    },
    chats : {
        color: colours.chatText,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendingContainer: {
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    systemMessageWrapper: {
        backgroundColor: '#6646ee',
        borderRadius: 4,
        padding: 5
    },
    systemMessageText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold'
    },
    button : {
        marginTop: 15,
        bottom: 10,
        fontSize: 50,
        borderRadius: 10,
        width: 4 * windowWidth / 9,
        height: 50,
        backgroundColor: colours.logInButton,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    touchable: {
        paddingTop: 12,
    },
    send: {
        paddingTop: 12,
    },
    mediaAlert: {
        height: 4 * windowWidth / 5,
        width: 8 * windowWidth / 10,
        left: '10%',
        top: '25%',
        position: 'absolute',
        backgroundColor: colours.primary,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 9,
    },
    image: {
        width: 0.75 * windowWidth,
        height : 0.5625 * windowWidth,
        marginLeft: 8,
        marginTop: 8,
        alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonReject : {
        fontSize: 50,
        borderRadius: 10,
        width: windowWidth / 2.5,
        height: 50,
        backgroundColor: colours.logOutButton,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonAccept : {
        fontSize: 50,
        borderRadius: 10,
        width: windowWidth / 2.5,
        height: 50,
        backgroundColor: colours.logInButton,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clickImage: {
        height: 3 * windowWidth / 4,
        width: windowWidth,
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 10,
        top: '25%',
    },
    clickImageFull: {
        height: windowHeight,
        width: windowWidth,
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: colours.primary,
    },
    touchable1: {
        position: 'absolute',
        right : 10,
        top: 15,
    },
})