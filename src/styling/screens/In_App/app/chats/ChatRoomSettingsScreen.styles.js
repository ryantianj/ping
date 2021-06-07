import {StyleSheet, Dimensions} from "react-native";
import colours from "../../../../../constants/colours";

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container : {
        backgroundColor: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    roomNameText : {
        paddingTop: 20,
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
        width: 2 * windowWidth / 3
    },
    textInputBio :{
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        fontSize: 20,
        backgroundColor: colours.textBox,
        width: 9 * windowWidth / 10,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    renderItem : {
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedTextHeader : {
        fontSize: 25,
        color: 'black'
    },
    selectedText : {
        fontSize: 20,
        color: 'black'
    },
    title: {
        fontSize: 32,
    },
    flatList: {
        marginTop: 20,
        width: windowWidth,
    },
    button : {
        bottom: 10,
        fontSize: 50,
        borderRadius: 10,
        width: 2 * windowWidth / 3,
        height: 50,
        backgroundColor: colours.logInButton,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
})