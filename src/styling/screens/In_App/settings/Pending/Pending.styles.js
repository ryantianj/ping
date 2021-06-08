import {StyleSheet, Dimensions, StatusBar} from "react-native";
import colours from "../../../../../constants/colours"

const windowWidth = Dimensions.get('window').width;
const statusBar = StatusBar.currentHeight;

export default StyleSheet.create({
    container :{
        paddingTop: statusBar,
        backgroundColor: colours.primary,
        color: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    profileText: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        width: windowWidth
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