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
        paddingTop: 10,
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        width: windowWidth
    },


})