import React, { useState , useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, ImageBackground, StyleSheet, ScrollView, Image } from "react-native";
import { Ionicons, Entypo, FontAwesome, AntDesign, Feather } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import Modal from "react-native-modal";
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
import colors from "../../constant/colors";
import YellowBtn from "../../components/button/YellowBtn";
import AddWorkspaceInput from "../../components/TextInput/AddWorkspaceInput";
import Header from "../../components/header/Header";
import DoneBtn from "../../components/button/DoneBtn";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Context/Auth";


const images = [
    {
        image1: 'https://wallsdesk.com/wp-content/uploads/2017/01/Oslo-Images.jpg',
    },
    {
        image1: 'https://wallsdesk.com/wp-content/uploads/2017/01/Oslo-Images.jpg',
    },
    {
        image1: 'https://wallsdesk.com/wp-content/uploads/2017/01/Oslo-Images.jpg',
    },
    {
        image1: 'https://wallsdesk.com/wp-content/uploads/2017/01/Oslo-Images.jpg',
    },
    {
        image1: 'https://wallsdesk.com/wp-content/uploads/2017/01/Oslo-Images.jpg',
    },
    {
        image: false
    },
]

const SelectPhoto = (props) => {
    const navigation = useNavigation()
    const [isModalVisible, setModalVisible] = useState(true);
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
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return !fontsLoaded ? <AppLoading /> : (

        <ScrollView style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={{ backgroundColor: 'red', borderRadius: 10 }}>
                <View style={{ flex: 1, backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor , borderRadius: 10 }}>
                    <View style={{ alignItems: 'center', marginVertical: 70, flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                        <Text style={{ fontSize: 30, fontFamily: 'Poppins_700Bold',color:darkMode ? customDarkMode.textColor : customLightMode.textColor }}>CREATED!</Text>
                        <AntDesign name="checkcircle" size={150} color="rgb(75,174,75)" />
                        <YellowBtn onClick={() => navigation.navigate('fullList')} style={{ width: '65%', paddingVertical: 16 }} title='HOME PAGE' />
                    </View>
                </View>
            </Modal>

            <Header endHeading="Select Photo" headingStyle={{ fontSize: 20, color: darkMode ? customDarkMode.textColor : customLightMode.textColor, fontFamily: 'Poppins_700Bold' }} />
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

                {images.map((item, index) => {
                    return (
                        <>
                            {item.image === false ?
                                <View style={{ borderWidth: item.image === false ? 1 : 0, width: '40%', marginBottom: 20, borderStyle: 'dashed', borderColor: colors.blue }} key={index}>
                                    <ImageBackground source={{ uri: item.image1 }} style={{ height: 160, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Entypo name="camera" size={24} color={colors.blue} />
                                    </ImageBackground>
                                </View>
                                :
                                <View style={{ borderWidth: item.image === false ? 1 : 0, width: '40%', marginBottom: 20, borderStyle: 'dashed', borderColor: colors.blue }} key={index}>
                                    <Image source={{ uri: item.image1 }} style={{ height: 160, width: '100%' }} />
                                </View>
                            }
                        </>

                    )
                })}
            </View>


            <TouchableOpacity style={[styles.LeaveBtn, { marginVertical: 50 }]} onPress={() => setModalVisible(!isModalVisible)}>
                <Feather name="arrow-right" style={{ padding: 5, borderRadius: 50, backgroundColor: colors.blue, color: 'white' }} size={25} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
                <Text style={{ color: darkMode ? customDarkMode.textColor : customLightMode.textColor, fontSize: 14, marginTop: 5, fontFamily: 'Poppins_700Bold' }}>Done</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default SelectPhoto;

const styles = StyleSheet.create({
    Mainview: { flex: 1,  },
    LeaveBtn: { justifyContent: 'center', alignItems: 'center' },

})