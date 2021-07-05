import React from "react";
import {Image} from "react-native";

{/* settings icon on all pages*/}
export default (props) => {
    return (
        <Image style = {props.style} source = {require("../../assets/Help.png")}/>
    );
}