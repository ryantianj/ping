import {StyleSheet, Dimensions} from "react-native";
import colours from "../../constants/colours";

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container : {
        backgroundColor: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        flex: 1,
        justifyContent: "center"
    },
    loadingText: {
        fontSize: 30,
    },

})
