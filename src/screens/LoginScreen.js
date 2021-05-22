import React, {useState} from "react";
import {StyleSheet} from "react-native";

import Logo from "../constants/Logo";
import Screen from "../components/Screen";
import colours from "../constants/colours";

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Screen>
            <Logo />
        </Screen>

    )
}

const styles = StyleSheet.create({
    container: {
        color: colours.primary,
        flex: 1
    }
    }
)