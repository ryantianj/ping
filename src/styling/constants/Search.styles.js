import {StyleSheet, Dimensions} from "react-native";
import colours from "../../constants/colours";

const windowWidth = Dimensions.get('window').width;

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
    icon : {

    },
    touchable: {
        position: 'absolute',
        right: 2 * windowWidth / 30,
        top: 30,
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
        width: 9 * windowWidth / 10,
    },
    searchText : {
        marginTop: 10,
        fontSize: 20,
        textAlign: 'left',
        left: 5,
        width: 9 * windowWidth / 10,
    },
    searchPress: {
        marginTop: 5,
        height: 50,
        backgroundColor:colours.settingsButton,
        borderRadius: 10,
    },
    liveContainer:{
        backgroundColor: colours.primary,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    }

})