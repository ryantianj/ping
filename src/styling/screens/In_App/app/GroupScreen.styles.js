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
    groupsText : {
        fontSize: 17,
        color: 'red',
        textAlign: 'center',
    },
    icon : {

    },
    touchable: {
        position: 'absolute',
        right : 10,
        top: 15,
    },
    viewText : {
        paddingTop: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        width: windowWidth
    },
    groupsList : {
        backgroundColor: colours.chat,
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        fontSize: 17,
        color: 'black',
        textAlign: 'left',
        width: 9 * windowWidth / 10
    },
    groups : {
        color: colours.chatText,
    },
    flatList : {
        backgroundColor: colours.naviBar,
        marginTop: 20,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        fontSize: 17,
        width: 9 * windowWidth / 10,
    },
})