import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import colors from "../../constant/colors"

const YellowBtn = (props) => {
    return (

        <TouchableOpacity onPress={props.onClick} style={[styles.LeaveBtnChild , props.style]}>
            <Text style={[styles.LeaveText ,props.textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    LeaveBtnChild: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 50, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center' },
    LeaveText: { fontSize: 14, fontFamily: 'Poppins_700Bold', borderRadius: 10, color: 'black' },
})

export default YellowBtn