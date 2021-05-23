import {StyleSheet} from "react-native";

import colours from "../../constants/colours";

export default StyleSheet.create({
    main : {
        color: colours.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image :{
        width: 125,
        height: 100,
    },
})
