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
    notificationsText : {
        paddingTop: 20,
        fontSize: 17,
        color: 'red',
        textAlign: 'center',
        width: 2 * windowWidth / 3
    },
    postTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        borderColor:'black',
        borderBottomWidth:1,
    },
    postText: {
        fontSize: 20,
    },
    chatTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        borderColor:'white',
        borderBottomWidth:1,
    },
    chatText: {
        fontSize: 20,
        color: 'white',
    },
    requestTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        borderColor:'black',
        borderBottomWidth:1,
    },
    requestText: {
        fontSize: 20,
        color: 'black',
    },
    post: {
        marginTop: 20,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: colours.channel,
    },
    group: {
        marginTop: 20,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: colours.group,
    },
    chat: {
        marginTop: 20,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: colours.chat,
    },
    request: {
        marginTop: 20,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: colours.request,
    },
    flatList : {
        flex: 1,
        backgroundColor: colours.primary,
        width: 19 * windowWidth / 20,
    },
})