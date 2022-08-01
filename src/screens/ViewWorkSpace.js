
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ImageBackground, StyleSheet, ScrollView, Image, Modal } from "react-native";
import { Ionicons, AntDesign, FontAwesome, Feather, Entypo, MaterialIcons } from '@expo/vector-icons';
import axios from "axios"
import AppLoading from "expo-app-loading";

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
import colors from "../constant/colors";
import YellowBtn from "../components/button/YellowBtn";
import AddWorkspaceInput from "../components/TextInput/AddWorkspaceInput";
import Header from "../components/header/Header";
import DoneBtn from "../components/button/DoneBtn";
import Inputfield from "../components/TextInput/TextInput";
import { useNavigation } from "@react-navigation/native";
import { accessCamera, accessGallery } from "../utils/ImagePicker";
import * as ImagePicker from 'expo-image-picker';
import WorkspaceCard from "../components/card/WorkspaceCard";
import { AuthContext } from "../Context/Auth";
const ViewWorkSpace = (props) => {

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
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation()
    const { setTaskId, currentWorkspace, setCurrentTask, user, setCurrentWorkspace, ipAddress , darkMode , customDarkMode , customLightMode } = useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(false);


    const getWorkspace = () => {
        const form = {
            id: currentWorkspace?._id
        }
        axios.post(ipAddress + '/workspace/current/get', form)
            .then(function (response) {
                setCurrentWorkspace(response.data)
            })
            .catch(function (error) {
                console.log("Error in get current");
            });
    }


    const deleteWorkspace = (id)=>{
        const form = {
            id:id
        }
        axios.post( ipAddress + '/workspace/delete', form)
            .then(function (response) {
                alert("Deleted Successfully")
                navigation.navigate('fullList')
            })
            .catch(function (error) {
                console.log("error");
            });
    }


    const threeDotsClick = () => {
        setModalVisible(!modalVisible)
    }





    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            getWorkspace()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);


    const recentWorkspace = (id) => {
        const form = {
            workspaceId: currentWorkspace?._id,
            userId: user._id
        }
        axios.post( ipAddress + '/workspace/setRecent', form)
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getWorkspace()
        recentWorkspace(currentWorkspace?._id)
    }, [])


    const complete = (taskCreatorId, index) => {
        const form = {
            userId: user._id,
            taskCreatorId: taskCreatorId,
            taskIndex: index.toString(),
            workspaceId: currentWorkspace?._id
        }
        axios.post(ipAddress + '/workspace/task/statusupdate', form)
            .then(function (response) {
                alert(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return !fontsLoaded ? <AppLoading /> : (

        <ScrollView style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
            <Header
                PressIconPlus={() => {
                    navigation.navigate('createtask')
                    setTaskId(currentWorkspace.tasks.length + 2000)
                }}
                plusShow={true}
                threeDotsClick={() => threeDotsClick()}
                admin={user?._id === currentWorkspace.adminId ? true : false} endHeading={'View WorkSpace'}
                headingStyle={{ fontSize: 20, color: darkMode ? customDarkMode.textColor : customLightMode.textColor, fontFamily: 'Poppins_700Bold' }} />


            <Text style={[styles.activity, { fontSize: 20 , color: darkMode ? customDarkMode.textColor : customLightMode.textColor}]} >Workspace Task Board</Text>

            {currentWorkspace.tasks.length !== 0 ? currentWorkspace?.tasks?.map((item, index) => {
                return (
                    <WorkspaceCard
                        key={index}
                        title={item.title}
                        discription={item.description}
                        duedate={item.timeline}
                        taskasign={item.taskCreatorName}
                        image={item.image}
                        avatar={item.taggedPersons}
                        taskCreatorId={item.taskCreatorId}
                        onClick={() => complete(item.taskCreatorId, index)}
                        onPress={() => {
                            navigation.navigate('ViewTaskDetail')
                            setCurrentTask(item)
                            setTaskId(index)
                        }}
                    />
                )
            })
                : <View style={{ height: 450, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: darkMode ? customDarkMode.textColor : customLightMode.textColor, fontSize: 18, fontFamily: "Poppins_400Regular" }}>No Task Found in this workspace</Text></View>}




            {/* modal */}


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('addmembers')
                            setCurrentWorkspace(currentWorkspace)
                        }}>
                            <Text style={styles.btn}>Add Members</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('editworkspace')
                        }} style={{ marginTop: 10 }}>
                            <Text style={styles.btn}>Edit Workspace</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                         onPress={()=>{
                            deleteWorkspace(currentWorkspace._id)
                         }}
                         style={{ marginTop: 10 }}
                         >
                            <Text style={styles.btn}>Delete Workspace</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>




        </ScrollView>

    )

}

export default ViewWorkSpace;

const styles = StyleSheet.create({
    Mainview: { flex: 1, },
    DoneBtn: { backgroundColor: colors.blue, marginHorizontal: 37, padding: 10, borderRadius: 100, height: 80, width: 80, alignItems: 'center', justifyContent: 'center' },
    DoneBtntext: { color: 'white', fontFamily: 'Poppins_500Medium', textAlign: 'center' },
    activity: { fontSize: 14, fontFamily: 'Poppins_700Bold', marginHorizontal: 15, marginVertical: 30 },

    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalView: {
        width: "100%",
        backgroundColor: "#FFD500",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    btn: {
        fontSize: 18,
        fontFamily: "Poppins_500Medium",
        color: "blue"
    }




})