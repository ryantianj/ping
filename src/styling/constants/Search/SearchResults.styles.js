import {StyleSheet, Dimensions, StatusBar} from "react-native";
import colours from "../../../constants/colours";

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container : {
        backgroundColor: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    searchContainer : {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: windowWidth,
    },
    searchText : {
        marginTop: 10,
        fontSize: 20,
        textAlign: 'left',
        left: 5,
        width: 9 * windowWidth / 10,
    },
    searchPress: {
        marginTop: 5,
        height: 50,
        flex: 1,
        backgroundColor:colours.settingsButton,
        borderRadius: 10,
    },
    resultHeader : {
        marginTop: 10,
        fontSize: 30,
        textAlign: 'left',
        width: 9 * windowWidth / 10,
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