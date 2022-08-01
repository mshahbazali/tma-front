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
import YellowBtn from "../../components/button/YellowBtn";




const Faq = () => {

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
    const [checkFaqStatus, setCheckFaqStatus] = useState(0)

    const Faq = [
        {
            title: 'How does this app protect my privacy?',
            boldText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,

        },
        {
            title: 'Am I able to delete my account',
            boldText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        },
        {
            title: 'What happen to my data if I delete my account?',
            boldText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,

        },
        {
            title: 'Does this app track my location?',
            boldText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        },
        {
            title: 'Is my account safe?',
            boldText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        },

    ]


    const check_active_faq = (index) => {
        if (checkFaqStatus === index) {
            setCheckFaqStatus(index)
        } else {
            setCheckFaqStatus(index)
        }
    }



    return !fontsLoaded ? <AppLoading /> : (
        <ScrollView style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
            <Header endHeading={'FAQs'} headingStyle={{...styles.headingStyle,color:darkMode ? customDarkMode.textColor : customLightMode.textColor}} />


            <View style={{ marginHorizontal: 20, marginTop: 55 }}>
                <Text style={[styles.title, { fontFamily: 'Poppins_700Bold' , color:darkMode ? customDarkMode.textColor : customLightMode.textColor }]}>Frequently Asked Questions</Text>

            </View>
            {Faq.map((item, index) => {
                return (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => check_active_faq(index)} style={{ marginHorizontal: 20, paddingHorizontal: 20, paddingVertical: 10, borderWidth : 1 , borderColor : '#F5F5F5', marginTop: 20 }}>
                        <Text style={[styles.title, {
                            fontFamily: 'Poppins_700Bold', marginBottom: 0, color: checkFaqStatus === index ? colors.blue : colors.grey, shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }]}>{item.title}</Text>
                        {checkFaqStatus === index &&
                            <Text style={[styles.title, { fontFamily: 'Poppins_400Regular', marginBottom: 0, color: '#a0a0a0', marginTop: 15, fontSize: 13 }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s </Text>
                        }
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}

export default Faq;

const styles = StyleSheet.create({
    Mainview: { flex: 1,},
    headingStyle: { fontSize: 20, fontFamily: 'Poppins_700Bold' },
    title: { fontSize: 14, marginBottom: 30, fontFamily: 'Poppins_700Bold', color: 'black' },
    declineStyle: { marginLeft: 10, backgroundColor: '#fff',borderColor: colors.blue }


})