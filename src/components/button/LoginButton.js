import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";


const LoginButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style = {props.style}>
            <Text style = {[{textAlign : 'center' , fontSize : 20 , marginBottom : -2} , props.textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default LoginButton;