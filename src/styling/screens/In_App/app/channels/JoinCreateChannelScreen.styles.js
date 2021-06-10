import {StyleSheet, Dimensions, StatusBar} from "react-native";
import colours from "../../../../../constants/colours";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBar = StatusBar.currentHeight;

export default StyleSheet.create({
    container : {
        backgroundColor: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    scroll : {
        backgroundColor: colours.primary,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerText : {
        paddingTop: 10 + statusBar,
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        width: windowWidth
    },
    headerText1 : {
        paddingTop: 10,
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        width: windowWidth
    },
    channelsText : {
        paddingTop: 20,
        fontSize: 17,
        color: 'red',
        textAlign: 'center',
        width: 2 * windowWidth / 3
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    textInputChatNameContainer :{
        fontSize: 20,
        marginTop: 20,
        width: 9 * windowWidth / 10,
        height: 60,
        borderRadius: 10,
    },
    textInputChatName :{
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        backgroundColor: colours.textBox,
        width: 9 * windowWidth / 10,
        height: 40,
        borderRadius: 10,
        textAlignVertical: 'top',

    },
    textInput :{
        paddingLeft: 15,
        textAlign: 'left',
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        marginTop: 20,
        backgroundColor: colours.textBox,
        width: 2 * windowWidth / 3,
        height: 50,
        borderRadius: 10
    },
    flatList : {
        backgroundColor: colours.naviBar,
        marginTop: 20,
        padding: 10,
        marginBottom: 5,
        borderRadius: 10,
        fontSize: 17,
        width: 9 * windowWidth / 10,
    },
    flatListView: {
        width: 9 * windowWidth / 10,
        height: windowHeight / 2,
    },
    button : {
        marginTop: 20,
        paddingTop: 13,
        fontSize: 50,
        borderRadius: 10,
        width: 2 * windowWidth / 3,
        height: 50,
        backgroundColor: colours.logInButton
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    renderItem : {
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'orange'
    },
    unRenderItem : {
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unselectedText : {
        fontSize: 20,
        color: 'black'
    },
    selectedText : {
        fontSize: 20,
        color: 'white'
    },
})