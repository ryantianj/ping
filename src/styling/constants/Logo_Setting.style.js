import {Dimensions, StatusBar, StyleSheet} from "react-native";

const statusBar = StatusBar.currentHeight;
const windowWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    container :{
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center'
    },
    image :{
        position: 'absolute',
        top: 5 + statusBar,
        left: 10 - windowWidth/2,
        width: 100,
        height: 80,
    },
    settingsPress : {
        position: 'absolute',
        top: 20 + statusBar,
        right: 15 - windowWidth/2,
        width: 55,
        height: 55,
    },
    settings : {
        width: 55,
        height: 55,
    }
})