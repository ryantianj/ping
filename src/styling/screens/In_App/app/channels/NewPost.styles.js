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
    flatList : {
        flex: 1,
        backgroundColor: colours.primary,
        width: windowWidth,
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
    },button : {
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