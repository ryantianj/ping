import {StyleSheet, Dimensions, StatusBar} from "react-native";
import colours from "../../../../../constants/colours";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBar = StatusBar.currentHeight;

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
    touchable1: {
        position: 'absolute',
        left : 10,
        top: 15,
    },
    chatsText : {
        borderRadius: 10,
        backgroundColor: colours.channel,
        width: 19 * windowWidth / 20,
        fontSize: 25,
        color: 'black',
        textAlign: 'left',
        marginBottom: 20,
        paddingLeft: 10,
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
        textAlign:'right'
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