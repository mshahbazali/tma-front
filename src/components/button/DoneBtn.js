import React, { useContext } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'; 
import { AuthContext } from "../../Context/Auth";
const DoneBtn = (props) => {
    const {darkMode  , customLightMode , customDarkMode} = useContext(AuthContext)
    return (
        <TouchableOpacity onPress={props.onPress} style = {props.style}>
            <Text style = {[{textAlign : 'center' , fontSize : 20} , props.textStyle]}><AntDesign name="arrowright" size={35} color="white" /></Text>
        </TouchableOpacity>
    )
}

export default DoneBtn;