import React, { useState , useContext } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native"
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
import { Entypo } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import Header from "../../components/header/Header";
import { useNavigation } from "@react-navigation/native";




const Index = () => {

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
    const navigation = useNavigation()

    const Options = [

        {
            title: 'Deactivate Account',
            navigation: 'deactivate'
        },
        {
            title: 'Terms of Services',
            navigation: 'termandcondition'

        },
        {
            title: 'Privacy Policy',
            navigation: 'privacypolicy'

        },
        {
            title: 'About',
            navigation: 'about'

        },
        {
            title: 'FAQs',
            navigation: 'faq'
        },

    ]



    return !fontsLoaded ? <AppLoading /> : (
        <ScrollView style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
            <Header endHeading={'You'} headingStyle={{...styles.headingStyle,color:darkMode ? customDarkMode.textColor : customLightMode.textColor}} />


            <View style={{ marginHorizontal: 20, marginTop: 55 }}>
                {Options.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate(item.navigation)}>
                            <Text style={{...styles.title,color:darkMode ? customDarkMode.textColor : customLightMode.textColor}}>{item.title}</Text>
                        </TouchableOpacity>

                    )
                })

                }
            </View>



        </ScrollView>
    )
}

export default Index;

const styles = StyleSheet.create({
    Mainview: { flex: 1, },
    headingStyle: { fontSize: 20,  fontFamily: 'Poppins_700Bold' },
    title: { fontSize: 14, marginBottom: 30, fontFamily: 'Poppins_700Bold' }


})