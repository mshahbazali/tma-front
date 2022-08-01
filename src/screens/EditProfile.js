import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity, useColorScheme } from "react-native"
import colors from "../constant/colors";
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
import { Entypo, MaterialIcons, FontAwesome5, Foundation, Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import Header from "../components/header/Header";
import YellowBtn from "../components/button/YellowBtn";
import { url } from "../constant/url";
import EditProfileInput from "../components/TextInput/EditProfileInput";
import Inputfield from "../components/TextInput/TextInput";
import LoginButton from "../components/button/LoginButton";
import { AuthContext } from "../Context/Auth";
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerModal } from '../components/Modals/ImagePickerModal'

import axios from "axios";



const EditProfile = () => {
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
    const { user, setUser , ipAddress , darkMode , customDarkMode , customLightMode} = useContext(AuthContext)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [phoneNumber, setPhoneNumber] = useState(user.phone)
    const [img, setImg] = useState(user.img)
    const [visible, setVisible] = useState(false);


    const editProfile = () => {
        const form = {
            username: username,
            email: email,
            phone: phoneNumber,
            img: img
        }
        axios.patch(ipAddress+'/edit-profile', form)
            .then(function (response) {
                setUser(response.data)
                alert("Profile Edited")
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    const openGallery = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
            base64: true
        });

        if (!result.cancelled) {

            let base64Img = `data:image/jpg;base64,${result.base64}`

            //Add your cloud name
            let apiUrl = 'https://api.cloudinary.com/v1_1/trellobymughees/image/upload';

            let data = {
                "file": base64Img,
                "upload_preset": "workspaceImages",
            }

            fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            }).then(async r => {
                setVisible(false)
                let data = await r.json()
                setImg(data.secure_url)
                return data.secure_url
            }).catch(err => console.log(err))
        }
    };

    const openCamera = async () => {
        // No permissions request is necessary for launching the image library
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();


        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [4, 3],
            base64: true
        });

        if (!result.cancelled) {

            let base64Img = `data:image/jpg;base64,${result.base64}`

            //Add your cloud name
            let apiUrl = 'https://api.cloudinary.com/v1_1/trellobymughees/image/upload';

            let data = {
                "file": base64Img,
                "upload_preset": "workspaceImages",
            }

            fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            }).then(async r => {
                setVisible(false)
                let data = await r.json()
                setImg(data.secure_url)
                return data.secure_url
            }).catch(err => console.log(err))
        }
    };




    return !fontsLoaded ? <AppLoading /> : (
        <ScrollView style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
            <Header endHeading={'Edit Profile'} headingStyle={{ fontSize: 20, color: darkMode ? customDarkMode.textColor : customLightMode.textColor, fontFamily: 'Poppins_700Bold' }} />
            <ImageBackground source={{ uri: img ? img : url }} style={{ marginTop: 15, height: 217, width: '100%', flex: 1, }}>
                <View style={{ width: '100%' , height:"100%" , alignItems:"flex-end" , justifyContent:"flex-end" }}>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <View style={{ marginRight:20,marginBottom: 10, backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor , width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                            <MaterialIcons name="edit" size={24} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, marginBottom: 20 }}>
                <FontAwesome5 name="user-alt" size={19} style={{ paddingHorizontal: 10, marginLeft: 9 }} color={colors.grey} />
                <EditProfileInput
                    placeholderTextColor={darkMode ? customDarkMode.gray : customLightMode.gray}
                    placeholder="Username"
                    onChange={(e) => setUsername(e)}
                    value={username}
                    warning={true}
                    style={{ width: '83%', paddingLeft: 6 , }}
                    textStyle={{color:"gray"}}
                />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, marginBottom: 20 }}>
                <MaterialIcons name="email" size={23} style={{ paddingHorizontal: 10, marginLeft: 9 }} color={colors.grey} />
                <EditProfileInput
                    placeholderTextColor={darkMode ? customDarkMode.gray : customLightMode.gray}
                    placeholder="Email"
                    editable={false}
                    value={email}
                    // warning={true}
                    style={{ width: '83%', paddingLeft: 6 }}
                    textStyle={{color:"gray"}}
                />

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, marginBottom: 20 }}>
                <FontAwesome name="mobile-phone" size={23} style={{ paddingHorizontal: 10, marginLeft: 9 }} color={colors.grey} />
                <EditProfileInput
                    placeholderTextColor={darkMode ? customDarkMode.gray : customLightMode.gray}
                    placeholder="Email"
                    editable={true}
                    value={phoneNumber}
                    warning={true}
                    onChange={(e) => setPhoneNumber(e)}
                    style={{ width: '83%', paddingLeft: 6 }}
                    textStyle={{color:"gray"}}
                />
            </View>
            {/* 
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 20 }}>
                <Ionicons name="location-sharp" size={23} style={{ paddingHorizontal: 10, marginLeft: 9 }} color={colors.grey} />
                <EditProfileInput
                    placeholderTextColor={'black'}
                    placeholder="Location"
                    onChange={(e) => setLocation(e)}
                    value={location}
                    warning={true}
                    style={{ width: '83%', paddingLeft: 6 }}
                />
                {email !== "" &&
                    <View style={{ backgroundColor: colors.blue, width: 20, height: 20, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                        <MaterialIcons name="done" size={15} color="white" />
                    </View>
                }
            </View> */}
            <LoginButton onPress={() => editProfile()} title={'Save Changes'} textStyle={styles.LoginButtonText} style={styles.LoginButton} />

            <ImagePickerModal
                isVisible={visible}
                onClose={() => setVisible(false)}
                onImageLibraryPress={openGallery}
                onCameraPress={openCamera}
            />
        </ScrollView>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    Mainview: { flex: 1, },
    LeaveBtn: { justifyContent: 'center', alignItems: 'center' },
    activity: { fontSize: 40, color: 'black', fontFamily: 'Poppins_700Bold', marginHorizontal: 15, marginTop: 45 },
    MainCard: { marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', marginTop: 29 },
    userImage: { height: 50, width: 50, borderRadius: 50 },
    postedBy: { fontSize: 13, fontFamily: 'Poppins_700Bold' },
    postedByTime: { fontSize: 13, fontFamily: 'Poppins_400Regular', color: colors.grey },
    LoginButton: { marginTop: 50, backgroundColor: colors.blue, marginHorizontal: 30, padding: 10, borderRadius: 100 },
    LoginButtonText: { color: 'white', fontFamily: 'Poppins_700Bold' },



})