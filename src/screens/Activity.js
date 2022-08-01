import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, ImageEditor , ActivityIndicator , TouchableOpacity } from "react-native"
import colors from "../constant/colors";
import axios from "axios";
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
import Header from "../components/header/Header";
import YellowBtn from "../components/button/YellowBtn";
import { AuthContext } from "../Context/Auth";
import { useNavigation } from "@react-navigation/native";

const Activity = () => {
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
    const [notifications, setNotifications] = useState()
    const [workspace, setWorkSpace] = useState()


    const { user, ipAddress ,  darkMode , customDarkMode , customLightMode } = useContext(AuthContext)

    const navigation = useNavigation()

    const gotoWorkspace = (workspaceId) =>{
            const form = {
                id: workspaceId
            }
            axios.post(ipAddress + '/workspace/current/get', form)
                .then(function (response) {
                    setCurrentWorkspace(response.data)
                })
                .catch(function (error) {
                    console.log("Error in get current");
                });
        
        navigation.navigate('viewworkspace')
    }


    const getNotifications = () => {
        const form = {
            id: user._id
        }
        axios.post( ipAddress + '/user/notifications/get', form)
            .then(function (response) {
                setNotifications(response.data.notifications)
                setWorkSpace(response.data.workspace)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // The screen is focused
          getNotifications()
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);


    const acceptByAdmin = (userId, workspaceId, index) => {

        const indexString = index.toString()

        const form = {
            userId: userId,
            workSpaceId: workspaceId,
            digit: indexString
        }
        axios.post(ipAddress + '/workspace/request-accept-byAdmin', form)
            .then(function (response) {
                alert("Request Accepted")
                getNotifications()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const acceptByUser = (userId, workspaceId, index) => {

        const indexString = index.toString()

        const form = {
            userId: userId,
            workSpaceId: workspaceId,
            index: indexString
        }
        axios.post(ipAddress + '/workspace/request-accept-byUser', form)
            .then(function (response) {
                alert("Request Accepted")
                getNotifications()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return !fontsLoaded ? <AppLoading /> : (
        <ScrollView style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
            <Header headingStyle={{ fontSize: 20, color: darkMode ? customDarkMode.textColor : customLightMode.textColor, fontFamily: 'Poppins_700Bold' , backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor  }} />
            <Text style={{...styles.activity,color:darkMode ? customDarkMode.textColor : customLightMode.textColor}} >Activity</Text>
            <View>
                {notifications ? notifications.length === 0 ? <View style={{ alignItems: "center" }}>
                    <Text style={{color:darkMode ? customDarkMode.textColor : customLightMode.textColor}}>You have no notification</Text></View>: notifications?.map((item, index) => {
                    var accepted;
                    for (var i = 0; i < workspace?.length; i++) {
                        if (workspace[i] === item.workspaceId) {
                            accepted = true
                            break;
                        }
                    }

                    return (
                        <TouchableOpacity onPress={item.notificationType === "task" ? ()=> {
                            gotoWorkspace(item.workSpaceId)
                        }:null} style={styles.MainCard}>
                            <View style={{ marginRight: 10 }}>
                                <Image style={styles.userImage} source={{ uri: 'https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80', }} />
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{...styles.postedBy,color:darkMode ? customDarkMode.textColor : customLightMode.textColor}}>{item.notificationMsg}</Text>
                                {/* <Text style={styles.postedByTime}>{'15 hours ago'}</Text> */}
                            </View>
                            {item.notificationType === "workspaceReqByUser" || item.notificationType === "workspaceReqByAdmin" ? <View

                                style={styles.LeaveBtn}>
                                <YellowBtn
                                    onClick={() => {
                                        item.notificationType === "workspaceReqByUser" ? item.status === "false" ? acceptByAdmin(item.userId, item.workspaceId, index) : null : !accepted ? acceptByUser(item.userId, item.workspaceId, index) : null
                                    }}
                                    title={item.notificationType === "workspaceReqByUser" ? item.status === "false" ? "Accept" : "Accepted" : !accepted ? "Accept" : "Accepted"}
                                />
                            </View> : null}
                        </TouchableOpacity>
                    )
                }) : <ActivityIndicator color={"blue"} />}
            </View>


        </ScrollView>
    )
}

export default Activity;

const styles = StyleSheet.create({
    Mainview: { flex: 1,  },
    LeaveBtn: { justifyContent: 'center', alignItems: 'center' },
    activity: { fontSize: 40, fontFamily: 'Poppins_700Bold', marginHorizontal: 15, marginTop: 45 },
    MainCard: { marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', marginTop: 29 },
    userImage: { height: 50, width: 50, borderRadius: 50 },
    postedBy: { fontSize: 13, fontFamily: 'Poppins_700Bold' },
    postedByTime: { fontSize: 13, fontFamily: 'Poppins_400Regular', color: colors.grey },



})