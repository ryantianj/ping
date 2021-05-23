import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";

export default (props) => {
        return (
            <SafeAreaView style={{
                paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
                paddingBottom: 10,
                paddingHorizontal: 10,
                ...props.style
            }} {...props}>
                {props.children}
            </SafeAreaView>
        );
}

const styles = StyleSheet.create({

    }
)