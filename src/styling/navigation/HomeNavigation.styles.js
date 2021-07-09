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
    logout: {
        backgroundColor: colours.logOutButton,
        borderRadius: 10,
        bottom: 10,

    },
    logoutText: {
        color: 'white',
        // textAlign: 'center',
    },
    scrollView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
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
