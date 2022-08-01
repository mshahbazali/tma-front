import React, { useContext, useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native"
import colors from "../../constant/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Context/Auth";


const ChangePassword = () => {
    const navigation = useNavigation()
    const { setIsAuthenticated, isAuthenticated, user, setUser, ipAddress, userEmail, darkMode, customDarkMode, customLightMode } = useContext(AuthContext)

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
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfimPassword] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)

    const resendOtp = (id) => {
        const form = {
            id: id
        }
        axios.post(ipAddress + '/resend', form)
            .then(function (response) {
                alert("OTP sent again")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    var validUsername = (val) => {
        const usernameRegex = /^[a-zA-Z\-]+$/;
        return usernameRegex.test(val)
    }

    var validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    const changePassword = () => {
        if (password.length < 6 ) {
            alert("Password contain atleast 6 characters")
        } else {
            const form = {
                password: password,
                email: userEmail
            }
            axios.post(ipAddress + '/user/reset-password', form)
                .then(function (response) {
                    if (response.status === 201) {
                        alert("Password Changed")
                        setConfimPassword('')
                        setPassword('')
                        navigation.navigate('loginform')
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    return !fontsLoaded ? <AppLoading /> : (
        <>
            <Header style={{ backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }} />
            <View style={{ ...styles.Mainview, backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
                <View>

                    <Inputfield
                        placeholderTextColor={darkMode ? customDarkMode.gray : customLightMode.gray}
                        placeholder="Password"
                        password={true}
                        onChange={(e) => setPassword(e)}
                        value={password}
                        warning={password.length < 6 ? true : false}
                        eyePress={() => setShowPassword(!showPassword)}
                        secureTextEntry={showPassword}
                    />
                    <Inputfield
                        placeholderTextColor={darkMode ? customDarkMode.gray : customLightMode.gray}
                        placeholder="Confirm Password"
                        password={true}
                        onChange={(e) => setConfimPassword(e)}
                        value={confirmPassword}
                        warning={confirmPassword.length < 6 ? true : false}
                        eyePress={() => setShowConfirm(!showConfirm)}
                        secureTextEntry={showConfirm}
                    />
                </View>
                <LoginButton onPress={password === confirmPassword ? () => changePassword() : () => alert("Please Confirm correct password")}
                    title={'Change Password'}
                    textStyle={styles.LoginButtonText}
                    style={styles.LoginButton} />

            </View>
        </>

    )
}

export default ChangePassword;

const styles = StyleSheet.create({
    Mainview: { flex: 1, justifyContent: 'space-between' },
    LoginButton: { backgroundColor: colors.blue, marginHorizontal: 37, padding: 10, borderRadius: 100, marginVertical: 20 },
    LoginButtonText: { color: 'white', fontFamily: 'Poppins_500Medium' },

})