import {StyleSheet, Dimensions} from "react-native";
import colours from "../../../../constants/colours";

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container : {
        backgroundColor: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    channelsText : {
        fontSize: 17,
        color: 'red',
        textAlign: 'center',
    },
    icon : {

    },
    touchable: {
        position: 'absolute',
        right : 10,
        top: 15,
    },
    viewText : {
        paddingTop: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        width: windowWidth
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    flatList: {
        marginTop: 20,
        width: windowWidth,
    }
})