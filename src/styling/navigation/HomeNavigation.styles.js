import {StyleSheet} from "react-native";
import colours from "../../constants/colours";

export default StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colours.primary
    },
    drawer: {
        backgroundColor: colours.primary,
    },
    icon: {
        marginLeft: 10,
    },
    // contentOptions: {
    //     activeTintColor: '#e91e63',
    //     itemsContainerStyle: {
    //       marginVertical: 0,
    //     },
    //     iconContainerStyle: {
    //       opacity: 1
    //     }
    // }
})
