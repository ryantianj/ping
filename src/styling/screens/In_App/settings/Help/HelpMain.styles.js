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
    headerText: {
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        width: windowWidth, 
        marginBottom: 10
    },
    bodyText: {
        fontSize: 16,
        color: 'black',
        width: 8.2 * windowWidth / 10,
        marginBottom: 10,
        textAlign: "justify"
    },
    bodyText2: {
        marginTop: 25,
        fontSize: 16,
        color: 'black',
        width: 8.2 * windowWidth / 10,
        marginBottom: 10,
        textAlign: "justify"
    },
    Button : {
        marginTop: 25,
        fontSize: 50,
        borderRadius: 10,
        width: 7.5 * windowWidth / 10,
        height: 50,
        backgroundColor: colours.settingsButton,
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    ButtonText : {
        color: 'black',
        textAlign: 'center',
        paddingRight: 40,
        width: 8.5 * windowWidth / 10,
        fontSize: 20,
    },
})