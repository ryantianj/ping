import {StyleSheet, Dimensions} from "react-native";
import colours from "../../../../../constants/colours";

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container : {
        backgroundColor: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    flatList : {
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
    }
})