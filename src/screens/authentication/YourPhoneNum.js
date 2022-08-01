import React, { useState , useContext } from "react";
import { Text, View, StyleSheet } from "react-native"
import colors from "../../constant/colors";
import { AuthContext } from "../../Context/Auth";
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
import LoginButton from "../../components/button/LoginButton";
import { Entypo } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import Header from "../../components/header/Header";
import Inputfield from "../../components/TextInput/TextInput";




const YourPhoneNum = () => {

    const {darkMode , customDarkMode , customLightMode} = useContext(AuthContext)

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
    const [value, setValue] = useState('')



    return !fontsLoaded ? <AppLoading /> : (
        <View style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
            <Header />
            <Text style={{ fontSize: 40, fontFamily: 'Poppins_800ExtraBold', marginTop: 30, marginHorizontal: 20 }}>Recover your account</Text>
            {/* <LoginButton title={'Sign up'} textStyle={styles.SignUpButtonText} style={styles.SignUpButton} />
            <LoginButton title={'Log in'} textStyle={styles.LoginButtonText} style={styles.LoginButton} /> */}
            <Inputfield
                placeholderTextColor={'#9F9F9F'}
                placeholder="Enter email, username or phone number"
                onChange={(e) => setValue(e)}
                value={value} />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <LoginButton title={'Next'} textStyle={styles.LoginButtonText} style={styles.LoginButton} />
            </View>

        </View>
    )
}

export default YourPhoneNum;

const styles = StyleSheet.create({
    Mainview: { flex: 1,  },
    TrelloView: { marginTop: 166, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    trelloTitle: { color: colors.yellow, fontSize: 47, fontFamily: 'Poppins_700Bold' },
    circleIcon: { marginTop: 20, marginHorizontal: 5 },
    trelloDes: { color: colors.grey, fontSize: 12, marginTop: 15, textAlign: 'center', fontFamily: 'Poppins_700Bold' },
    SignUpButton: { marginTop: 310, backgroundColor: colors.creamColor, marginHorizontal: 37, padding: 10, borderRadius: 100 },
    SignUpButtonText: { color: colors.blue, fontFamily: 'Poppins_500Medium' },
    LoginButton: { marginTop: 65, borderWidth: 2, borderColor: colors.blue, marginHorizontal: 37, padding: 10, borderRadius: 100, width: 150 },
    LoginButtonText: { color: colors.blue, fontFamily: 'Poppins_500Medium' },
})