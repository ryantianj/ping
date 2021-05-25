import React from "react";
import {SafeAreaView, Platform, StatusBar} from "react-native";

export default (props) => {
        return (
            <SafeAreaView style={{
                marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                paddingBottom: 10,
                paddingHorizontal: 10,
                ...props.style
            }} {...props}>
                {props.children}
            </SafeAreaView>
        );
}

