import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native"
import colors from "../../constant/colors";
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
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Context/Auth";

const Login = () => {
    const {setIsAuthenticated , isAuthenticated , darkMode , customDarkMode , customLightMode} = useContext(AuthContext)

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

    const navigation = useNavigation()
    return !fontsLoaded ? <AppLoading /> : (
        <View style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
            <View style={styles.TrelloView}>
                <Text style={styles.trelloTitle}>trello</Text>
                <Entypo style={styles.circleIcon} name="circle" size={10} color={colors.blue} />
            </View>
            <Text style={styles.trelloDes}>A new way to engage your team online.</Text>
            <LoginButton onPress={() => navigation.navigate('signupform')} title={'Sign up'} textStyle={styles.SignUpButtonText} style={styles.SignUpButton} />
            <LoginButton onPress={() => navigation.navigate('loginform')} title={'Log in'} textStyle={styles.LoginButtonText} style={styles.LoginButton} />
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    Mainview: { flex: 1 },
    TrelloView: { marginTop: 166, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    trelloTitle: { color: colors.yellow, fontSize: 47, fontFamily: 'Poppins_700Bold' },
    circleIcon: { marginTop: 20, marginHorizontal: 5 },
    trelloDes: { color: colors.grey, fontSize: 12, marginTop: 15, textAlign: 'center', fontFamily: 'Poppins_700Bold' },
    SignUpButton: { marginTop: 310, backgroundColor: colors.creamColor, marginHorizontal: 37, padding: 10, borderRadius: 100 },
    SignUpButtonText: { color: colors.blue, fontFamily: 'Poppins_500Medium' },
    LoginButton: { marginTop: 15, backgroundColor: colors.blue, marginHorizontal: 37, padding: 10, borderRadius: 100 },
    LoginButtonText: { color: 'white', fontFamily: 'Poppins_500Medium' },
})