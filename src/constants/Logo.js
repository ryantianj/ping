import React from "react";
import {Image} from "react-native";

{/* P!ng logo on all pages*/}
export default (props) => {
    return (
        <Image style = {props.style} source = {require("../../assets/Logo.jpg")}/>
    );
}

