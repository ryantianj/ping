import {Dimensions, StatusBar, StyleSheet} from "react-native";

import colours from "../../../../constants/colours"

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
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        width: windowWidth
    },
    textInputBioContainer :{
        fontSize: 20,
        marginTop: 20,
        width: 9 * windowWidth / 10,
        height: 100,
        borderRadius: 10,
    },
    textInputDisplayContainer :{
        fontSize: 20,
        marginTop: 15,
        width: 9 * windowWidth / 10,
        height: 53,
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
        marginTop: 10,
        padding: 10,
        marginBottom: 5,
        borderRadius: 10,
        fontSize: 17,
        width: 8 * windowWidth / 10,
        flex: 1
    },
    flatListView: {
        width: 8 * windowWidth / 10,
        height: windowHeight / 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    visible : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    public : {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colours.naviBar,
        borderRadius: 10,
        width: windowWidth / 3,
        height: 45,
        marginRight: 10
    },
    publicText : {
        textAlign: 'center',
    },
    publicTextSelected : {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    private : {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colours.naviBar,
        borderRadius: 10,
        width: windowWidth / 3,
        height: 45,
        marginLeft: 10
    },
    privateText : {
        textAlign: 'center',
    },
    privateTextSelected : {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    publicSelect: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        borderRadius: 10,
        width: windowWidth / 3,
        height: 45,
        marginRight: 10
    },
    privateSelect: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        borderRadius: 10,
        width: windowWidth / 3,
        height: 45,
        marginLeft: 10
    },
    button : {
        paddingTop: 13,
        fontSize: 50,
        borderRadius: 10,
        width: 2 * windowWidth / 3,
        height: 50,
        backgroundColor: colours.logInButton
    },
    confirmProfile: {
        position:'absolute',
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colours.primary,
        width: windowWidth,
        height: 65,
    }
})