import React, { useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, ImageBackground, StyleSheet } from "react-native";
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";

import {
    useFonts,
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import colors from "../../constant/colors";
import YellowBtn from "../button/YellowBtn";
import { AuthContext } from "../../Context/Auth";

const Card = (props) => {
    let [fontsLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_100Thin_Italic,
        Poppins_200ExtraLight,
        Poppins_200ExtraLight_Italic,
        Poppins_300Light,
        Poppins_300Light_Italic,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_500Medium,
        Poppins_500Medium_Italic,
        Poppins_600SemiBold,
        Poppins_600SemiBold_Italic,
        Poppins_700Bold,
        Poppins_700Bold_Italic,
        Poppins_800ExtraBold,
        Poppins_800ExtraBold_Italic,
        Poppins_900Black,
        Poppins_900Black_Italic,
    });

    const {darkMode , customDarkMode , customLightMode}  = useContext(AuthContext)

    return !fontsLoaded ? <AppLoading /> : (
        <View style={styles.MainView}>

            <ImageBackground style={styles.ImageBg} source={{ uri: props.image }}>
                <View style={styles.ImageBgChild}>

                    <View style={styles.firstSection}>
                        <TouchableOpacity onPress={props.chatting} style={styles.message}>
                            <Text style={styles.newmessgaetext}></Text>
                        </TouchableOpacity>
                        <View style={styles.totalUserView}>
                            <Text style={{...styles.totalUser,color: darkMode ? customDarkMode.backgroundColor : customLightMode.textColor }}>{props.users}</Text>
                        </View>

                    </View>
                    <View style={styles.leavebtnView}>
                        <View style={styles.LeaveText}>
                            <Text style={styles.teamname}>{props.teamname}</Text>
                        </View>
                        <Text style={styles.duedate}>{props.createdDate}</Text>
                    </View>
                </View>
            </ImageBackground>
            <View>
                <View style={styles.LeaveBtn}>

                    <YellowBtn onClick={props.onClick} title={props.title} />

                </View>

                <Text style={styles.text}>{props.text}</Text>
            </View>
            {/* <View style={styles.iconView}>
                <AntDesign name="sharealt" size={24} color="black" />
                <FontAwesome name="bookmark" size={24} color={colors.grey} />
            </View> */}
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    MainView: {
        borderRadius: 10,
        marginHorizontal: 15,
        borderColor: "#d7d7d7",
        borderWidth: 1,
        paddingBottom: 20,
        marginBottom: 10,
    },
    ImageBg: { height: 200, 
    },
    ImageBgChild: { justifyContent: 'space-between', flex: 1 },
    firstSection: { flexDirection: 'row', justifyContent: 'space-between', margin: 10 },
    message: { flexDirection: 'row', alignItems: 'center' },
    count: { fontSize: 12, fontFamily: 'Poppins_700Bold', backgroundColor: 'white', paddingHorizontal: 10, borderRadius: 10 },
    newmessgaetext: { fontSize: 12, fontFamily: 'Poppins_700Bold', paddingHorizontal: 10, borderRadius: 10, color: 'white' },
    totalUserView: { height: 30, width: 30, borderRadius: 50, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center' },
    totalUser: { fontSize: 12, fontFamily: 'Poppins_700Bold', borderRadius: 10, color: 'black' },
    leavebtnView: { flexDirection: 'row', justifyContent: 'space-between', margin: 10 },
    teamname: { fontSize: 14, fontFamily: 'Poppins_700Bold', paddingHorizontal: 10, borderRadius: 10, color: 'white' },
    duedate: { fontSize: 12, fontFamily: 'Poppins_700Bold', borderRadius: 10, color: colors.yellow },
    LeaveBtn: { justifyContent: 'center', alignItems: 'center', marginTop: -25 },
    LeaveBtnChild: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 50, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center' },
    LeaveText: { fontSize: 14, fontFamily: 'Poppins_700Bold', borderRadius: 10,  color:"black" },
    text: { fontSize: 12, fontFamily: 'Poppins_400Regular', borderRadius: 10, color: colors.grey, marginTop: 14, marginHorizontal: 12 },
    iconView: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 26 },

})