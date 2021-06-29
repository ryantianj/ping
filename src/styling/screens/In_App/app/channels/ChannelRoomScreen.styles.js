import {StyleSheet, Dimensions} from "react-native";
import colours from "../../../../../constants/colours";

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        backgroundColor: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },

    flatList : {
        flex: 1,
        backgroundColor: colours.primary,
        width: 19 * windowWidth / 20,
    },
    touchable: {
        position: 'absolute',
        right : 10,
        top: 15,
    },
    iconTrash: {
        right : 5,
        top: 10,
    },
    trash: {
        position: 'absolute',
        height: 30,
        width: 30,
        right : 1,
    },
    pin: {
        position: 'absolute',
        height: 30,
        width: 30,
        right : 40,
    },
    iconPin: {
        right : 5,
        top: 10,
    },
    userTrash: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    touchable1: {
        position: 'absolute',
        left : 10,
        top: 15,
    },
    chatsText : {
        borderRadius: 10,
        backgroundColor: colours.channel,
        width: 19 * windowWidth / 20,
        fontSize: 30,
        color: 'black',
        textAlign: 'left',
        marginBottom: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    post: {
        marginTop: 20,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: colours.channel,
    },
    user: {
        fontSize: 20,
    },
    postTitle: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    postText: {
        fontSize: 20,
    },
    postUpVotes: {
        height: 30,
    },
    postUpVotesText: {
        fontWeight: 'bold',
        fontSize: 13,
        textAlign:'right',
        color: 'black'
    },
    postUpVotesText1: {
        fontWeight: 'bold',
        fontSize: 13,
        textAlign:'right',
        color: colours.logOutButton
    },
    postComments: {
        height: 30,
    },
    postCommentsText: {
        fontWeight: 'bold',
        fontSize: 13,
        textAlign:'left'
    },
    commentUpVote: {
        marginTop: 10,
        borderColor:'black',
        borderTopWidth:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        width: 18 * windowWidth / 20,
    },
    toolBar : {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        width: windowWidth,
        height:50
    }
})