import {StyleSheet, Dimensions} from "react-native";
import colours from "../../../../../constants/colours";

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container : {
        backgroundColor: colours.primary,
        flex: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    roomNameText : {
        paddingTop: 20,
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
        flex: 0.5,
    },
    roomNameText1 : {
        paddingTop: 0,
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15,
        flex: 0.5,
    },
    textInputBio : {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        backgroundColor: colours.textBox,
        width: 9 * windowWidth / 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flex: 1.5,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    renderItem : {
        height: 50,
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'orange',
        borderRadius: 10
    },
    unRenderItem : {
        height: 50,
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colours.textBox,
        borderRadius: 10
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
        fontSize: 22,
        color: 'black'
    },
    title: {
        fontSize: 22,
    },
    flatListView : {
        width: 9 * windowWidth / 10,
        backgroundColor: colours.textBox,
        flex: 4,
        borderRadius: 10
    },
    flatList: {
        width: 9 * windowWidth / 10,
    },
    flatListElem : {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        backgroundColor: colours.textBox,
        width: 9 * windowWidth / 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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
    loading : {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colours.primary
    },
    loadingColour: {
        color : colours.logInButton
    }
})