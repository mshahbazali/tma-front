import React, { useState , useContext} from "react";
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




const TermAndCondition = () => {
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

    const termAndCondition =
    {
        title: 'Terms of Service',
        boldText: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
        content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
        content2: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
    }

    const {darkMode , customDarkMode , customLightMode} = useContext(AuthContext)




    return !fontsLoaded ? <AppLoading /> : (
        <ScrollView style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
            <Header endHeading={'Terms of Service'} headingStyle={{...styles.headingStyle,color:darkMode ? customDarkMode.textColor : customLightMode.textColor}} />


            <View style={{ marginHorizontal: 20, marginTop: 55 }}>
                <Text style={{...styles.title,color:darkMode ? customDarkMode.textColor : customLightMode.textColor}}>{termAndCondition.title}</Text>
                <Text style={[styles.title, { fontFamily: 'Poppins_700Bold',color:darkMode ? customDarkMode.textColor : customLightMode.textColor }]}>{termAndCondition.boldText}</Text>
                <Text style={[styles.title, { fontFamily: 'Poppins_400Regular',color:darkMode ? customDarkMode.textColor : customLightMode.textColor }]}>{termAndCondition.content}</Text>
                <Text style={[styles.title, { fontFamily: 'Poppins_400Regular' ,color:darkMode ? customDarkMode.textColor : customLightMode.textColor}]}>{termAndCondition.content2}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                <YellowBtn title='Accept' style={{ marginRight: 10 }} />
                <YellowBtn title='Decline' style={styles.declineStyle} textStyle={{ color: colors.blue }} />
            </View>

        </ScrollView>
    )
}

export default TermAndCondition;

const styles = StyleSheet.create({
    Mainview: { flex: 1,},
    headingStyle: { fontSize: 20, fontFamily: 'Poppins_700Bold' },
    title: { fontSize: 14, marginBottom: 30, fontFamily: 'Poppins_700Bold',  },
    declineStyle: { marginLeft: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.blue }


})