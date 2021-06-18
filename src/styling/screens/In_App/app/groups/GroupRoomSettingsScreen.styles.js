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
        marginBottom: 10
    },
    textInputBio : {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
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
        backgroundColor:'orange'
    },
    unRenderItem : {
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colours.textBox
    },
    unselectedText : {
        fontSize: 20,
        color: 'black'
    },
    selectedText : {
        fontSize: 20,
        color: 'black',
        marginBottom: 10,
        marginTop: 10
    },
    selectedTextHeader : {
        fontSize: 25,
        color: 'black'
    },
    title: {
        fontSize: 32,
    },
    flatListView : {
        width: 9 * windowWidth / 10,
        flex: 1,
    },
    flatList: {
        marginTop: 0,
        width: 9 * windowWidth / 10,
        marginBottom: 15,
        borderRadius: 10,
    },
    buttonblack : {
        bottom: 20,
        fontSize: 50,
        borderRadius: 10,
        height: 50,
        backgroundColor: colours.logInButton,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 45,
        width: 9 * windowWidth / 10
    },
    buttonred : {
        bottom: 20,
        fontSize: 50,
        borderRadius: 10,
        height: 50,
        backgroundColor: colours.logOutButton,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 9 * windowWidth / 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    scroll : {
        backgroundColor: colours.primary,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
})