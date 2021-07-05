import {StyleSheet, Dimensions} from "react-native";
import colours from "../../constants/colours";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container : {
        position: 'absolute',
        backgroundColor: colours.primary,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: windowWidth,
    },
    searchBarText : {
        paddingLeft: 15,
        marginTop: 15,
        textAlign: 'left',
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        backgroundColor: colours.textBox,
        width: 9 * windowWidth / 10,
        height: 60,
        borderRadius: 10
    },
    searchBarTextFoc: {
        paddingLeft: 15,
        marginTop: 15,
        textAlign: 'left',
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        backgroundColor: colours.textBox,
        width: 8 * windowWidth / 10,
        height: 60,
        borderRadius: 10
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 9 * windowWidth / 10,
    },
    icon : {

    },
    touchable: {
        position: 'absolute',
        right: 2 * windowWidth / 30,
        top: 30,
    },
    loading : {
        position: 'absolute',
        top: 28,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingColour: {
        color : colours.logInButton
    },
    live: {
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        top: 55,

    },
    flatList : {
        backgroundColor: colours.primary,
        marginTop: 20,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        fontSize: 17,
        width: 10 * windowWidth / 10,
    },
    searchText : {
        fontSize: 20,
        textAlign: 'left',
        left: 5,
        paddingLeft: 5,
    },
    searchHistText : {
        fontSize: 20,
        textAlign: 'left',
        left: 5,
        paddingLeft: 25,
        width: 9 * windowWidth / 10,
    },
    searchPress: {
        marginTop: 5,
        marginBottom: 5,
        height: 50,
        backgroundColor:colours.settingsButton,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    searchHistPress: {
        marginTop: 0,
        marginBottom: 0,
        height: 50,
        // backgroundColor:colours.settingsButton,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 8 * windowWidth / 10,
    },
    liveContainer:{
        padding: 5,
        borderRadius: 10,
        backgroundColor: colours.naviBar,
        flexDirection: 'column',
        height: windowHeight / 2
    },
    historyContainer: {
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: colours.naviBar,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    flatList2 : {
        backgroundColor: colours.primary,
        marginTop: 10,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 17,
        width: 10 * windowWidth / 10,
    },
    iconArrow: {
        left : 5,
        top: 5,
    },
    arrow : {
        position: 'absolute',
        left: 0,
    },
    trash: {
        height: 30,
        width: 30,
    },
    iconTrash: {

    },
    hist: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

})