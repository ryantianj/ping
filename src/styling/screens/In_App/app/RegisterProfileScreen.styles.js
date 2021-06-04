import {Dimensions, StatusBar, StyleSheet} from "react-native";

import colours from "../../../../constants/colours"

const windowWidth = Dimensions.get('window').width;
const statusBar = StatusBar.currentHeight;

export default StyleSheet.create({
    container : {
        backgroundColor: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerText : {
        paddingTop: 10 + statusBar,
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        width: 2 * windowWidth / 3
    },
    headerText1 : {
        paddingTop: 10,
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        width: 2 * windowWidth / 3
    },
    textInputBioContainer :{
        fontSize: 20,
        marginTop: 20,
        width: 9 * windowWidth / 10,
        height: 100,
        borderRadius: 10,
    },
    textInputBio :{
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        backgroundColor: colours.textBox,
        width: 9 * windowWidth / 10,
        height:50,
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
    flatList : {
        backgroundColor: colours.naviBar,
        marginTop: 20,
        padding: 10,
        marginBottom: 5,
        borderRadius: 10,
        fontSize: 17,
        width: 9 * windowWidth / 10
    },
    button : {
        marginBottom: 10,
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
})