import {Dimensions, StatusBar, StyleSheet} from "react-native";

const statusBar = StatusBar.currentHeight;
const windowWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    container :{
        marginTop: statusBar + 10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        width: windowWidth,
        height:80
    },
    image :{
        left: 10,
        width: 100,
        height: 80,
        // flex: 0
    },
    helpPress : {
        top: 10,
        left: 70,
        width: 55,
        height: 55,
    },
    help : {
        width: 40,
        height: 35,
        marginTop: 1,
        resizeMode: 'stretch'
    },
    settingsPress : {
        top: 10,
        right: 0,
        width: 55,
        height: 55,
    },
    settings : {
        width: 40,
        height: 40,
    }
})