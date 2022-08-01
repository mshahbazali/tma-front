import React, { useContext, useEffect, useState, useSyncExternalStore } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity , ActivityIndicator } from "react-native"
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
import { Entypo } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import Header from "../../components/header/Header";
import YellowBtn from "../../components/button/YellowBtn";
import Card from "../../components/card/Card";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../../Context/Auth'
import axios from "axios";



const data = [
    {
        image: 'https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg?q=50&fit=contain&w=1500&h=750&dpr=1.5',
        count: 1,
        users: '+2',
        teamname: 'Group',
        duedate: '12/aug/20',
        text: 'Details will be mentioned here, user will be able to see the additional information upon click...',
    },
    {
        image: 'https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        count: 4,
        users: '+7',
        teamname: 'Group',
        duedate: 'Due Date',
        text: 'Details will be mentioned here, user will be able to see the additional information upon click...',
    },

]

const Groups = (props) => {
    const { user , setCurrentNewWorkspace , ipAddress , customDarkMode ,setCurrentWorkspace, customLightMode , darkMode } = useContext(AuthContext)
    const navigation = useNavigation()
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


    const requestAcceptByMe = (userId, workspaceId) => {
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


    const deleteWorkspace = (id) => {
        const form = {
            id: id
        }
        axios.post(ipAddress + '/workspace/delete', form)
            .then(function (response) {
                alert("Deleted")
            })
            .catch(function (error) {
                console.log("error");
            });
    }
   
    const leaveWorkspace = (workspaceId) => {
        const form = {
            userId: user._id,
            workspaceId:workspaceId
        }
        axios.post( ipAddress + '/workspace/leave', form)
            .then(function (response) {
                alert("Leaved Workspace")
            })
            .catch(function (error) {
                console.log("error");
            });
      }



    return !fontsLoaded ? <AppLoading /> : (
        <ScrollView style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
            <View>
                {props?.data ? props?.data?.map((item, index) => {
                    var requestFromMeAsk;
                    var requestFromAdminAsk;
                    var alreadyAdded;
                    for (var i = 0; i < item.requestedUsers.length; i++) {
                        if (item.requestedUsers[i] === user._id) {
                            requestFromAdminAsk = true;
                            break;
                        }

                    }
                    for (var j = 0; j < item.userRequests.length; j++) {
                        if (item.userRequests[j] === user._id) {
                            requestFromMeAsk = true;
                            break;
                        }

                    }

                    for(var k = 0 ; k < item.users.length ; k++){
                        if(item.users[k] === user._id){
                            alreadyAdded = true;
                            break;
                        }
                    }

                    return (
                        <TouchableOpacity key={i} activeOpacity={0.9} onPress={() => {
                           alreadyAdded ? setCurrentWorkspace(item) : setCurrentNewWorkspace(item)
                           alreadyAdded ? navigation.navigate('viewworkspace') : navigation.navigate('postview')
                            }}>
                            <Card
                                image={item?.workSpaceImage ? item.workSpaceImage : "https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"}
                                count={item?.count}
                                users={item?.users?.length > 9 ? "9+" : item.users.length}
                                teamname={item?.workSpaceName}
                                createdDate={item?.createdDate}
                                text={item?.about}
                                title={alreadyAdded ?  item.adminId === user._id ? "Delete" : "Leave" :   requestFromAdminAsk ? "Accept" : requestFromMeAsk ? "Reuqested" : "Join"}
                                onClick={() => alreadyAdded ? item?.adminId === user._id ?  deleteWorkspace(item._id) : leaveWorkspace(item?._id) : requestFromAdminAsk ? requestAcceptByMe(user._id , item._id) : requestFromMeAsk ? null : add(user._id , item._id)}
                            />
                        </TouchableOpacity>

                    )
                }) : <View style={{flex:1 , alignItems:"center",justifyContent:"center"}}>
                    <ActivityIndicator size="large" color="blue" /></View>}
            </View>

        </ScrollView>
    )
}

export default Groups;

const styles = StyleSheet.create({
    Mainview: { flex: 1, },
    headingStyle: { fontSize: 20,  fontFamily: 'Poppins_700Bold' },
    title: { fontSize: 14, marginBottom: 30, fontFamily: 'Poppins_700Bold', color: 'black' },
    declineStyle: { marginLeft: 10, borderWidth: 1, borderColor: colors.blue }


})