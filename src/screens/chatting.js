import React, { useState, useContext, useRef } from "react";
import { Text, View, StyleSheet,  ScrollView, ImageBackground, TouchableOpacity, FlatList, TextInput } from "react-native"
import colors from "../constant/colors";
import { AuthContext } from "../Context/Auth";
import { io } from "socket.io-client";
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
import { Entypo, Foundation, AntDesign, FontAwesome } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import Header from "../components/header/Header";

import { url } from "../constant/url";

const Chatting = () => {
    const ref = useRef()
    const { darkMode, customDarkMode, customLightMode, workspaceId, user, ipAddress } = useContext(AuthContext)

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
    const [messageData, setMessageData] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [message, setMessage] = useState()
    const documents = [
        {
            ServiceIcon: Entypo,
            name: 'camera',
            title: 'Image'
        },
        {
            ServiceIcon: AntDesign,
            name: 'pdffile1',
            title: 'Image'
        },
        {
            ServiceIcon: Foundation,
            name: 'ticket',
            title: 'Ticket'
        },
    ]

    const socket = io(ipAddress + "/")
    socket.emit("get-messages-history", workspaceId)
    socket.on("output-messages", (res) => {
        setMessageData(res);
    })
    const sendMessage = () => {
        const data = {
            user_name: user.username,
            user_id: user._id,
            workspace_id: workspaceId,
            text: message
        }
        if (message == undefined) {
        } else {
            socket.emit("sendMessage", data)
            socket.on("message", (res) => { })
            setMessage(undefined)

        }
    }
    return !fontsLoaded ? <AppLoading /> : (
        <View style={{ ...styles.Mainview, backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
            <Header
                // endHeading={'Edit Profile'}
                headingStyle={{ fontSize: 20, color: 'black', fontFamily: 'Poppins_700Bold' }}
            />
            <ImageBackground style={styles.ImageBg} source={{ uri: url }}>
                <View style={styles.ImageBgChild}>

                    <View style={styles.firstSection}>
                        <Text style={[styles.newmessgaetext, { fontSize: 22, backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }]}>Team Name</Text>
                        <TouchableOpacity style={styles.message}>
                            <Text style={styles.count}>{'6'}</Text>
                            <Text style={{ ...styles.newmessgaetext, backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>Messages</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>

                {/* <View style={{ borderWidth: 1 }}> */}
                <ScrollView ref={ref}
                    onContentSizeChange={() => ref.current.scrollToEnd({ animated: true })}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ backgroundColor: colors.yellow, padding: 7, paddingBottom: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            <AntDesign name="caretdown" size={12} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
                        </View>
                    </View>
                    {messageData.map((item, index) => {
                        return (
                            <View key={index}>
                                {item.time && <Text style={{ fontSize: 14, textAlign: 'center', fontFamily: 'Poppins_400Regular', marginTop: 20, color: colors.grey }}>{item.time}</Text>}
                                <>
                                    <View style={{ flexDirection: 'row', justifyContent: item.user_id == user._id ? 'flex-end' : 'flex-start', alignItems: 'center', marginTop: 30, marginRight: 10 }}>
                                        {
                                            item.user_id !== user._id ?
                                                <Text style={{ maxWidth: '70%', fontSize: 16, fontFamily: 'Poppins_500Medium', padding: 8, paddingVertical: 10, color: "black" }}>{item.user_name}</Text> : null
                                        }
                                        <Text style={{ maxWidth: '70%', fontSize: 16, fontFamily: 'Poppins_500Medium', backgroundColor: item.user_id == user._id ? colors.creamColor : 'white', padding: 8, paddingVertical: 10, }}>{item.text}</Text>
                                    </View>
                                    {item.img2 &&
                                        <View style={{ marginBottom: 10 }}>
                                            <ImageBackground source={{ uri: item.img2 }} imageStyle={{ borderRadius: 6 }} style={{ height: 250, width: 200, marginHorizontal: 80, justifyContent: 'space-between' }}>
                                                <Text></Text>
                                                <Text style={{ fontFamily: 'Poppins_500Medium', color: 'white', padding: 12, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>Attachment.pdf</Text>
                                            </ImageBackground>
                                            {/* <Image source={{ uri: item.img2 }} style={{ height: 250, width: 200, marginHorizontal: 80 }} /> */}

                                        </View>
                                    }
                                </>

                            </View>
                        )
                    })}
                </ScrollView>
                {/* </View> */}
                <View style={{ borderTopWidth: 1, borderColor: '#eeeeee' }}>
                    {modalVisible &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {documents.map((item, ind) => {
                                return (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderBottomWidth: 1, borderColor: '#E5E5E5', padding: 3, paddingVertical: 8, width: '50%', borderRadius: 1 }}>
                                            <item.ServiceIcon name={item.name} size={24} color={colors.blue} />
                                            <Text style={{
                                                fontSize: 16, fontFamily: 'Poppins_500Medium', paddingTop: 2, paddingHorizontal: 5, shadowColor: "#175676",
                                                shadowOffset: {
                                                    width: 20,
                                                    height: 20
                                                },
                                                shadowRadius: 20,
                                            }}>{item.title}</Text>
                                        </View>
                                    </View>

                                )
                            })}

                        </View>

                    }

                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, }}>
                        <TouchableOpacity onPress={sendMessage}>
                            <FontAwesome name="send" size={18} color={colors.blue} style={{ paddingHorizontal: 5 }} />
                        </TouchableOpacity>
                        <TextInput value={message} placeholder="Write a message" placeholderTextColor={colors.grey} style={{ fontFamily: 'Poppins_500Medium', color: darkMode ? customDarkMode.textColor : customLightMode.textColor, fontSize: 14, width: '70%', padding: 10 }} onChangeText={(text) => setMessage(text)} />
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '22%', paddingHorizontal: 5 }}>
                            <AntDesign name="plus" size={25} style={{ marginLeft: 5 }} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
                            <Entypo name="attachment" size={20} style={{ paddingRight: 5 }} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
                        </TouchableOpacity>
                    </View>
                </View>


            </View>

        </View>
    )
}

export default Chatting;

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
    ImageBg: { borderRadius: 10, paddingVertical: 20 },
    firstSection: { flexDirection: 'row', justifyContent: 'space-between' },
    message: { flexDirection: 'row', alignItems: 'center' },
    count: { fontSize: 12, fontFamily: 'Poppins_700Bold', paddingHorizontal: 10, borderRadius: 10 },
    newmessgaetext: { fontSize: 12, fontFamily: 'Poppins_700Bold', paddingHorizontal: 10, borderRadius: 10, color: 'white' },
    totalUserView: { width: 30, borderRadius: 50, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center' },
    totalUser: { fontSize: 12, fontFamily: 'Poppins_700Bold', borderRadius: 10, color: 'black' },
})