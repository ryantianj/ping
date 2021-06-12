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
        width: windowWidth,
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
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
    },
    toolBar : {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        width: windowWidth,
        height:50
    }
})