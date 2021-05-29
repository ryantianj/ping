import {StyleSheet, Dimensions} from "react-native";
import colours from "../../../../constants/colours";

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container : {
        backgroundColor: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    chatsText : {
        paddingTop: 20,
        fontSize: 17,
        color: 'red',
        textAlign: 'center',
        width: 2 * windowWidth / 3
    },
    chatsList : {
        backgroundColor: colours.chat,
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        fontSize: 17,
        color: 'black',
        textAlign: 'left',
        width: 9 * windowWidth / 10
    },
    chats : {
        color: colours.chatText,
    }
})