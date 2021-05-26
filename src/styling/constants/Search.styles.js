import {StyleSheet, Dimensions} from "react-native";
import colours from "../../constants/colours";

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container : {
        backgroundColor: colours.primary,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
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

})