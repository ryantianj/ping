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
        fontSize: 22,
        fontWeight: 'bold',
        borderColor:'black',
        borderBottomWidth:1,
        paddingBottom: 2
    },
    postTitle2: {
        marginTop: 8,
        fontSize: 20,
        fontWeight: 'bold',
        borderColor:'black',
        // borderBottomWidth:1,
        paddingBottom: 2
    },
    postText: {
        fontSize: 18,
    },
    chatTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        borderColor:'white',
        borderBottomWidth:1,
        paddingBottom: 2
    },
    chatText: {
        fontSize: 18,
        color: 'white',
    },
    requestTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        borderColor:'black',
        borderBottomWidth:1,
        paddingBottom: 2
    },
    requestText: {
        fontSize: 18,
        color: 'black',
    },
    post: {
        marginTop: 20,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: colours.channel,
        paddingRight: 10
    },
    group: {
        marginTop: 20,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: colours.group,
        paddingRight: 10
    },
    chat: {
        marginTop: 20,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: colours.chat,
        paddingRight: 10
    },
    request: {
        marginTop: 20,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: colours.request,
        paddingRight: 10
    },
    flatList : {
        flex: 1,
        backgroundColor: colours.primary,
        width: 19 * windowWidth / 20,
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
    },
    iconTrash: {
        right : 5,
        top: 10,
    },
    iconTrashBlack: {
        right : 5,
        top: 10,
        backgroundColor: colours.group,
        borderRadius: 10,
    },
    iconTrashChatBlack: {
        right : 5,
        top: 10,
        backgroundColor: colours.chat,
        borderRadius: 1,
    },
    trash: {
        position: 'absolute',
        height: 30,
        width: 30,
        top: -7,
        right : -10,
    },
})