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
        fontSize: 30,
        fontWeight: 'bold'
    },
    postText: {
        fontSize: 20,
    },
    post: {
        marginTop: 20,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: colours.channel,
    },
    flatList : {
        flex: 1,
        backgroundColor: colours.primary,
        width: 19 * windowWidth / 20,
    },
})