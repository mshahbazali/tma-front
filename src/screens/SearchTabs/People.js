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
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import Header from "../../components/header/Header";
import YellowBtn from "../../components/button/YellowBtn";




const Activity = [
    {
        image: 'https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        time: '15 hours ago',
        name: 'peter',
        activity: "Peter posted in 'Team 1",
        status: false

    },
    {
        image: 'https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        time: '10 hours ago',
        name: 'lee',
        activity: "Lee sent you a join request: Team 1",
        status: true

    },
    {
        image: 'https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        time: '15 hours ago',
        name: 'charlie',
        activity: "Peter posted in 'Team 1",
        status: false

    },
    {
        image: 'https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        time: '10 hours ago',
        name: 'ben',
        activity: "Lee sent you a join request: Team 1",
        status: false

    },
    {
        image: 'https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        time: '15 hours ago',
        name: 'pieter',
        activity: "Peter posted in 'Team 1",
        status: false

    },
    {
        image: 'https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        time: '10 hours ago',
        name: 'ronaldo',
        activity: "Lee sent you a join request: Team 1",
        status: false
    },
]

const People = () => {


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

    return !fontsLoaded ? <AppLoading /> : (
        <ScrollView style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>

            {Activity.map((item, index) => {
                return (

                    <View style={styles.MainCard}>
                        <View style={{ marginRight: 10 }}>
                            <Image style={styles.userImage} source={{ uri: item.image, }} />
                        </View>
                        <View style={{ width: item.status === true ? '63%' : '55%' }}>
                            <Text style={[styles.postedBy, { fontFamily: 'Poppins_400Regular' }]}>{item.name}</Text>
                        </View>
                        {item.status === true ?
                            <TouchableOpacity onPress={() => alert('Already add')}>
                                <MaterialIcons name="done" style={{ borderWidth: 1, padding: 5, borderRadius: 50, backgroundColor: colors.blue, color: 'white' }} size={24} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => alert('Add Freind')}>

                                <View style={styles.LeaveBtn}>
                                    <YellowBtn textStyle={{ color: colors.blue }} style={{ backgroundColor: 'white', borderColor: colors.blue, borderWidth: 1, paddingHorizontal: 30 }} title='Add' />
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                )
            })}



        </ScrollView>
    )
}

export default People;

const styles = StyleSheet.create({
    Mainview: { flex: 1, },
    LeaveBtn: { justifyContent: 'center', alignItems: 'center' },
    activity: { fontSize: 40, color: 'black', fontFamily: 'Poppins_700Bold', marginHorizontal: 15, marginTop: 45 },
    MainCard: { marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', marginTop: 29 },
    userImage: { height: 50, width: 50, borderRadius: 50 },
    postedBy: { fontSize: 13, fontFamily: 'Poppins_700Bold' },
    postedByTime: { fontSize: 13, fontFamily: 'Poppins_400Regular', color: colors.grey },


})