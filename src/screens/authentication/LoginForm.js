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


const LoginForm = () => {
    const navigation = useNavigation()
    const { setIsAuthenticated, isAuthenticated, user, setUser, ipAddress, darkMode, customDarkMode, customLightMode } = useContext(AuthContext)

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

 
    var validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };



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


    const login = () => {
        if (!validateEmail(email)) {
            alert('Please enter email')
        } else if (password === undefined || password.length === 0) {
            alert('Please enter password')
        }else{
            const form = {
                email: email,
                password: password
            }
            axios.post(ipAddress + '/auth/login', form)
                .then(async (response) => {
                    if (response.status == 205) {
                        alert('User not found')
                    } else if (response.status == 204) {
                        alert('Email is not registered')
                    } else if (response.status == 202) {
                        alert('User not found')
                    } else if (response.status == 203) {
                        alert('Password is not matching')
                    } else if (response.status == 201) {
                        if (response.data.user.verified === "true") {
                            setIsAuthenticated(true)
                            setUser(response.data.user)
                            await AsyncStorage.setItem(
                                'trello_token',
                                response.data.token
                            );
                        } else {
                            const id = response.data.user.email
                            resendOtp(id)
                            navigation.navigate('otp')
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        
    }


    return !fontsLoaded ? <AppLoading /> : (
        <>
            <Header onPress={() => navigation.navigate('signupform')} endHeading={'Sign up'} />
            <View style={{ ...styles.Mainview, backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
                <View>
                    <Inputfield
                        placeholderTextColor={'black'}
                        placeholder="Email"
                        onChange={(e) => setEmail(e)}
                        value={email}
                        // tick={true}
                        warning={true}
                        // password={true}
                        toggleEye={false}
                    />

                    <Inputfield
                        placeholderTextColor={'black'}
                        placeholder="Password"
                        password={true}
                        onChange={(e) => setPassword(e)}
                        value={password}
                        warning={password === '' ? true : false}
                        eyePress={() => setShowPassword(!showPassword)}
                        secureTextEntry={showPassword}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('recoveracc')}>
                        <Text style={{ fontSize: 12, fontFamily: "Poppins_700Bold", textAlign: 'right', marginHorizontal: 20, marginTop: 27, color: darkMode ? customDarkMode.textColor : customLightMode.textColor }}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <LoginButton onPress={() => login()} title={'Log in'} textStyle={styles.LoginButtonText} style={styles.LoginButton} />

            </View>
        </>

    )
}

export default LoginForm;

const styles = StyleSheet.create({
    Mainview: { flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' },
    LoginButton: { backgroundColor: colors.blue, marginHorizontal: 37, padding: 10, borderRadius: 100, marginVertical: 20 },
    LoginButtonText: { color: 'white', fontFamily: 'Poppins_500Medium' },

})