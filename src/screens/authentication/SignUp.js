import React, { useContext, useState } from "react";

import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native"
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
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Context/Auth";

const axios = require("axios").default;



const SignUp = () => {
    const navigation = useNavigation()
    const { setIsAuthenticated, isAuthenticated , setUser , ipAddress , darkMode , customDarkMode , customLightMode } = useContext(AuthContext)
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
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [phone, setPhone] = useState(false)

   
  

    var validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    const login = () => {
          
        

        if(name === undefined || name.length === 0){
            alert('Please Enter Username')
        }else if(email === undefined || email.length === 0){
            alert('Please Enter email')
        }else if(password === undefined || password.length === 0){
            alert('Please Enter password')
        }else if(password.length < 6){
            alert('Password contains atleast 6 digits')
        }else if(!validateEmail(email)){
            alert('Please enter valid email')
        }
        else{
            const form = {
                username: name,
                email: email,
                password: password,
                phone: phone,
                verified: "false"
            }
            axios.post(ipAddress+'/register', form)
                .then(function (response) {
                    if (response.status == 202) {
                        alert('Email already regsitered')
                    } else {
                        setUser(response.data)
                        setName("")
                        setEmail("")
                        setPassword("")
                        setPhone("")
                        navigation.navigate('otp')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        
    }

    return !fontsLoaded ? <AppLoading /> : (
        <View style={{flex:1,backgroundColor:"white"}}>
            <ScrollView>
            <Header onPress={() => navigation.navigate('loginform')} endHeading={'Login'} />
            <View style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
                <View>

                    <Inputfield
                        placeholderTextColor={darkMode ? customDarkMode.gray : customLightMode.gray}
                        placeholder="Name"
                        onChange={(e) => setName(e)}
                        value={name}
                        warning={true}
                        toggleEye={false}
                    />

                    <Inputfield
                        placeholderTextColor={darkMode ? customDarkMode.gray : customLightMode.gray}
                        placeholder="Email"
                        onChange={(e) => setEmail(e)}
                        value={email}
                        warning={true}
                        password={true}
                        toggleEye={false}
                        keyboardType="email-address"

                    />

                    <Inputfield
                        placeholderTextColor={darkMode ? customDarkMode.gray : customLightMode.gray}
                        placeholder="Phone"
                        onChange={(e) => setPhone(e)}
                        value={phone}
                        warning={true}
                        keyboardType="numeric"
                    />

                    <Inputfield
                        placeholderTextColor={darkMode ? customDarkMode.gray : customLightMode.gray}
                        placeholder="Password"
                        password={true}
                        onChange={(e) => setPassword(e)}
                        value={password}
                        eyePress={() => setShowPassword(!showPassword)}
                        secureTextEntry={showPassword}
                        warning={password === '' ? true : false}
                    />

                </View>


                <LoginButton onPress={() => login()} title={'Sign Up'} textStyle={styles.LoginButtonText} style={styles.LoginButton} />

            </View>
            </ScrollView>
        </View>

    )
}

export default SignUp;

const styles = StyleSheet.create({
    Mainview: { flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' },
    LoginButton: { backgroundColor: colors.blue, marginHorizontal: 37, padding: 10, borderRadius: 100, marginTop: 140 },
    LoginButtonText: { color: 'white', fontFamily: 'Poppins_500Medium' },

})