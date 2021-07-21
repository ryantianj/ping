import {StyleSheet, Dimensions} from "react-native";
import colours from "../../../../../constants/colours";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    pin: {
        position: 'absolute',
        height: 30,
        width: 30,
        right : 1,
    },
    trash: {
        position: 'absolute',
        height: 30,
        width: 30,
        right : 80,
    },
    iconPin: {
        right : 5,
        top: 10,
    },
    iconUpvote: {
        right : 0,
        top: 0,
    },
    date: {
        position: 'absolute',
        height: 30,
        right : 120,
        top: 10,
    },
    edit: {
        position: 'absolute',
        height: 30,
        width: 30,
        right : 40,
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
        fontSize: 28,
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
        marginTop: 8,
        fontSize: 20,
        width: (19 * windowWidth / 20) - 80,
    },
    postTitle: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    postText: {
        fontSize: 16,
    },
    postUpVotes: {
        height: 30,
        flex: 1.2,
        marginLeft: 4
    },
    postUpVotesText: {
        fontWeight: 'bold',
        fontSize: 13,
        textAlign:'right',
        color: 'black',
        marginTop: 3
    },
    postUpVotesText1: {
        fontWeight: 'bold',
        fontSize: 13,
        textAlign:'right',
        color: colours.logOutButton,
        marginTop: 3
    },
    numberUpvote: {
        height: 30,
        flex: 6,
    },
    empty: {
        height: 30,
        flex: 6,
    },
    empty1: {
        height: 30,
        width: 10,
    },
    postComments: {
        height: 30,
        flex: 4,
        marginTop: 2
    },
    postCommentsText: {
        fontWeight: 'bold',
        fontSize: 13,
        textAlign:'left',
    },
    commentUpVote: {
        marginTop: 10,
        borderColor:'black',
        borderTopWidth:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        width: 18 * windowWidth / 20,
    },
    toolBar : {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        width: windowWidth,
        height:50
    },
    image: {
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 2,
        justifyContent: 'center',
        alignItems: 'center',
        // 4, 3 aspect ratio
        width: 0.88 * windowWidth,
        height : 0.66 * windowWidth,
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
    avatarDate: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        width: 18 * windowWidth / 20,
    },
    button : {
        marginTop: 45,
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
})