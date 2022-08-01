import React, { useContext, useState } from "react";
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
import Header from "../../components/header/Header";
import Inputfield from "../../components/TextInput/TextInput";
import axios from "axios"
import { AuthContext } from "../../Context/Auth";
import { useNavigation } from "@react-navigation/native";



const RecoverAcc = () => {
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
    const [email, setEmail] = useState('')
    const {ipAddress , setUserEmail , darkMode , customDarkMode , customLightMode } = useContext(AuthContext)
    const navigation = useNavigation()



    var validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };


       const resendOtp = () => {
        const form = {
            id: email
        }
        axios.post(ipAddress + '/resend', form)
            .then(function (response) {
                alert("OTP sent ")
                setUserEmail(email)
                navigation.navigate('forgototp')
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const getOtp = ()=>{
        if(!validateEmail(email)){
            alert("Please enter valid email")
        }else{

            const form = {
                email : email
            }
            axios.post(ipAddress+'/user/forgot-password', form)
                .then(function (response) {
                    if (response.status == 203) {
                        resendOtp()
                    } else{
                        alert("User not found")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        }

    return !fontsLoaded ? <AppLoading /> : (
        <>
            <Header />

            <View style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
                <View>

                    <Text style={{ fontSize: 40, fontFamily: 'Poppins_800ExtraBold', marginTop: 30, marginHorizontal: 20 , color:darkMode ? customDarkMode.textColor :customLightMode.textColor }}>Recover your account</Text>
                    <Inputfield
                        placeholderTextColor={'gray'}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e)}
                        value={email}
                        warning={true}
                        // password = {true}
                        toggleEye= {false}
                        />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <LoginButton onPress={()=> getOtp()} title={'Get Code'} textStyle={styles.LoginButtonText} style={styles.LoginButton} />
                </View>

            </View>
        </>

    )
}

export default RecoverAcc;

const styles = StyleSheet.create({
    Mainview: { flex: 1, justifyContent: 'space-between' },
    TrelloView: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    trelloTitle: { color: colors.yellow, fontSize: 47, fontFamily: 'Poppins_700Bold' },
    circleIcon: { marginTop: 20, marginHorizontal: 5 },
    trelloDes: { color: colors.grey, fontSize: 12, marginTop: 15, textAlign: 'center', fontFamily: 'Poppins_700Bold' },
    SignUpButton: { marginTop: 310, backgroundColor: colors.creamColor, marginHorizontal: 37, padding: 10, borderRadius: 100 },
    SignUpButtonText: { color: colors.blue, fontFamily: 'Poppins_500Medium' },
    LoginButton: { borderWidth: 2, borderColor: colors.blue, marginHorizontal: 37, padding: 10, borderRadius: 100, width: 150, marginVertical: 20 },
    LoginButtonText: { color: colors.blue, fontFamily: 'Poppins_500Medium' },
})