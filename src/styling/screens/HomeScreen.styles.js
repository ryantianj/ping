import {StyleSheet, Dimensions, Platform, StatusBar} from "react-native";
import colours from "../../constants/colours";

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
    image :{
        position: 'absolute',
        top: 5 + statusBar,
        left: 10,
        width: 100,
        height: 80,
    },
    settings : {
        position: 'absolute',
        top: 20 + statusBar,
        right: 15,
        width: 55,
        height: 55,
    },
    searchBarText : {
        paddingLeft: 15,
        textAlign: 'left',
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        marginTop: 20 + 80 + statusBar,
        backgroundColor: colours.textBox,
        width: 9 * windowWidth / 10,
        height: 60,
        borderRadius: 10
    },
    notificationsText : {
        paddingTop: 20,
        fontSize: 17,
        color: 'red',
        textAlign: 'center',
        width: 2 * windowWidth / 3
    }
})