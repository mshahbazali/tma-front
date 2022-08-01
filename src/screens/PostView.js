import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity } from "react-native"
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
import { Entypo, Ionicons, Octicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import Header from "../components/header/Header";
import YellowBtn from "../components/button/YellowBtn";
import { url } from "../constant/url";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Context/Auth";
import axios from "axios";



const PostView = () => {
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
    const [fav, setFav] = useState(false)
    const { currentNewWorkspace, user , ipAddress , darkMode , customDarkMode , customLightMode } = useContext(AuthContext)
    const bgImage = currentNewWorkspace.workSpaceImage ? currentNewWorkspace.workSpaceImage : 'https://f.hubspotusercontent40.net/hubfs/9253440/Google%20Drive%20Integration/Delivery%20URL%20-%20BetterUp%20-%20importance%20of%20teamwork%20%5BARTICLE%5D-3.jpeg'
    const discription = 'Get added to Team/Workspace from here. Details of the group will appear here (About Page). Get added to Workspace from here. Details of the group will appear here (About Page). Get added to Workspace from here. Details of the group will appear here (About Page).'
    const favStatus = () => {
        setFav(!fav)
    }

    const navigation = useNavigation()



    const requestAcceptByMe = (userId, workspaceId) => {
        const form = {
            userId: userId,
            workSpaceId: workspaceId,
        }
        axios.post(ipAddress+'/workspace/request-accept-byUser', form)
            .then(function (response) {
                alert("Request Accepted")
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    const add = (userId, workspaceId) => {
        const form = {
            userId: userId,
            workspaceId: workspaceId,
        }
        axios.post(ipAddress+'/workspace/request-by-user', form)
            .then(function (response) {
                alert("Request Sent")
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    var requestFromMeAsk;
    var requestFromAdminAsk;
    for (var i = 0; i < currentNewWorkspace.requestedUsers.length; i++) {
        if (currentNewWorkspace.requestedUsers[i] === user._id) {
            requestFromAdminAsk = true;
            break;
        }

    }
    for (var j = 0; j < currentNewWorkspace.userRequests.length; j++) {
        if (currentNewWorkspace.userRequests[j] === user._id) {
            requestFromMeAsk = true;
            break;
        }

    }



    return !fontsLoaded ? <AppLoading /> : (
        <ImageBackground source={{ uri: bgImage }} style={{ flex: 1, width: '100%', height: '100%' }}>

            <View style={{ height: '50%', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={50} color={ darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor } style={{ marginTop: 40 }} />
                </TouchableOpacity>

                <View style={styles.leavebtnView}>
                    <View style={styles.LeaveText}>
                        <Text style={styles.teamname}>{currentNewWorkspace.users.length} Members</Text>
                    </View>
                    <Text style={styles.duedate}>{'Subject to Approval'}</Text>
                </View>
            </View>
            <ScrollView style={{ backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor, height: '50%', paddingHorizontal: 30, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: url }} style={{ height: 40, width: 40, borderRadius: 50 }} />
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, paddingHorizontal: 10 }}>{currentNewWorkspace.admin} - Group Admin</Text>
                </View>
    
                <Text style={{ fontSize: 14, fontFamily: 'Poppins_400Regular', color: colors.grey, marginTop: 30 }}>{currentNewWorkspace.about}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                    <YellowBtn
                        style={{ width: '100%' }}
                        title={requestFromAdminAsk ? "Accept" : requestFromMeAsk ? "Reuqested" : "Join"}
                        onClick={() => requestFromAdminAsk ? requestAcceptByMe(user._id, currentNewWorkspace._id) : requestFromMeAsk ? null : add(user._id, currentNewWorkspace._id)}
                    />
                </View>
            </ScrollView>
        </ImageBackground>
        

    )
}

export default PostView;

const styles = StyleSheet.create({
    Mainview: { flex: 1, },
    LeaveBtn: { justifyContent: 'center', alignItems: 'center' },
    activity: { fontSize: 40,  fontFamily: 'Poppins_700Bold', marginHorizontal: 15, marginTop: 45 },
    MainCard: { marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', marginTop: 29 },
    userImage: { height: 50, width: 50, borderRadius: 50 },
    postedBy: { fontSize: 13, fontFamily: 'Poppins_700Bold' },
    postedByTime: { fontSize: 13, fontFamily: 'Poppins_400Regular', color: colors.grey },
    leavebtnView: { flexDirection: 'row', justifyContent: 'space-between', margin: 10 },
    teamname: { fontSize: 14, fontFamily: 'Poppins_700Bold', paddingHorizontal: 10, borderRadius: 10, color: 'white' },
    duedate: { fontSize: 12, fontFamily: 'Poppins_700Bold', borderRadius: 10, color: colors.yellow },



})