import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView, ImageBackground, Modal, FlatList, TouchableOpacity } from "react-native"
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
import { Entypo, Ionicons, Octicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import Header from "../../components/header/Header";
import YellowBtn from "../../components/button/YellowBtn";
import { url } from "../../constant/url";
import { useNavigation } from "@react-navigation/native";
import LoginButton from "../../components/button/LoginButton";
import { AuthContext } from "../../Context/Auth";
import axios from "axios"
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import TaggedPersons from "./TaggedPersons";

const ViewTaskDetail = () => {
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

    const { user, currentTask, ipAddress, currentWorkspace, taskId , darkMode , customDarkMode , customLightMode } = useContext(AuthContext)

    const [value, setValue] = useState('')
    const bgImage = 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80'
    const [avatar, setAvatar] = useState([])
    const [taskCreator, setTaskCreator] = useState()
    const [modalVisible, setModalVisible] = useState(false);



    const images = [
        'https://www.w3schools.com/w3images/avatar6.png',
        'https://www.w3schools.com/w3images/avatar6.png',
        'https://www.w3schools.com/w3images/avatar6.png',
        'https://www.w3schools.com/w3images/avatar6.png',
    ]

    var tagged;
    var completed;

    const getTaskCreator = () => {
        const form = {
            id: currentTask.taskCreatorId
        }
        axios.post( ipAddress + '/single/get-user', form)
            .then(function (response) {
                setTaskCreator(response.data.username)

            })
            .catch(function (error) {
                console.log(error);
            });

    }



    const navigation = useNavigation()

    const complete = () => {
        const form = {
            userId: user._id,
            taskCreatorId: currentTask.taskCreatorId,
            taskIndex: taskId.toString(),
            workspaceId: currentWorkspace._id
        }
        axios.post( ipAddress + '/workspace/task/statusupdate', form)
            .then(function (response) {
                alert(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const deleteTask = ()=>{
        const form = {
            taskId:currentTask.taskId,
            workSpaceId:currentWorkspace._id
        }
        axios.post( ipAddress + '/workspace/task/delete', form)
            .then(function (response) {
                alert(response.data)
                navigation.navigate('viewworkspace')
            })
            .catch(function (error) {
                console.log("error");
            });
    }



    useEffect(() => {
        getTaskCreator()
    }, [])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            getTaskCreator()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);


    return !fontsLoaded ? <AppLoading /> : (
        <ImageBackground source={{ uri: bgImage }} style={{ flex: 1, width: '100%', height: '100%' }}>

            {/* <Header endHeading={'You'} headingStyle={{ fontSize: 20, color: 'black', fontFamily: 'Poppins_700Bold' }} />  */}
            {/* <Text style={styles.activity} >Activity</Text>  */}
            <View style={{ height: '30%', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: "row", width: "100%", alignItems:"center" , marginTop:40 }}>
                    <View style={{ width: "50%" }}>
                        <TouchableOpacity style={{ width: 60 }} onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={50} color="white"  />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "50%", alignItems: "flex-end" }}>
                        {currentTask.taskCreatorId === user._id ? 
                        <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)} style={{ width: 40 }} >
                            <Entypo name="dots-three-vertical" size={30} color="white" />

                        </TouchableOpacity> : null}
                    </View>
                </View>

                <View style={styles.leavebtnView}>
                    <Text style={styles.duedate}>{'Task Detail'}</Text>
                </View>
                <View style={{ width: "100%", alignItems: "flex-end", paddingRight: 10, marginTop: 5 }}>
                    <Text style={{ fontSize: 18, fontFamily: "Poppins_600SemiBold", color: "white" }}>Created by: </Text>
                    <Text style={{ fontSize: 18, fontFamily: "Poppins_600SemiBold", color: "white" }}>{taskCreator} </Text>
                </View>

                <Text>{''}</Text>


            </View>
            <ScrollView style={{ backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor, height: '70%', paddingHorizontal: 30, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                {/* <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: url }} style={{ height: 40, width: 40, borderRadius: 50 }} />
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, paddingHorizontal: 10 }}>Sia - Group Admin</Text>
                </View> */}

                <Text style={{ fontSize: 20, fontFamily: 'Poppins_700Bold', color: darkMode ? customDarkMode.textColor : customLightMode.textColor, marginTop: 30 }}>{currentTask.title}</Text>

                <Text style={{ fontSize: 14, fontFamily: 'Poppins_400Regular', color: colors.grey, marginTop: 15 }}>{currentTask.description}</Text>
                <Text style={{ fontSize: 18, fontFamily: 'Poppins_700Bold', color: darkMode ? customDarkMode.textColor : customLightMode.textColor, marginVertical: 15 }}>{'Tagged Person'}</Text>

                <View>
                    {currentTask.taggedPersons.length !== 0 ? currentTask?.taggedPersons?.map((v, i) => {
                        if (v.id === user._id) {
                            tagged = true
                        }
                        if (v.status === "Completed") {
                            completed = true
                        }
                        return (
                            <TaggedPersons
                                key={i}
                                data={v}
                            />
                        )
                    }) : null}
                </View>

                <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
                    <View style={{ width: "50%" }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins_400Regular', color: darkMode ? customDarkMode.textColor : customLightMode.textColor, marginTop: 20 }}>{'Created Date'}</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_400Regular', color: colors.grey }}>{currentTask.createdDate}</Text>
                    </View>
                    <View style={{ width: "50%", alignItems: "center" }}>
                        <View>
                            <Text style={{ fontSize: 16, fontFamily: 'Poppins_400Regular', color: darkMode ? customDarkMode.textColor : customLightMode.textColor, marginTop: 20 }}>{'Deadline'}</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'Poppins_400Regular', color: colors.grey }}>{currentTask.timeline}</Text>
                        </View>
                    </View>
                </View>

                {tagged ? <LoginButton onPress={!completed ? () => complete() : null} title={completed ? "Completed" : "Complete"} textStyle={styles.LoginButtonText} style={styles.LoginButton} /> : null}



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
                            <TouchableOpacity onPress={()=>{
                                navigation.navigate('edittask')
                            }} style={{ marginTop: 10 ,alignItems:"center", padding:5,borderRadius:30 }}>
                                <Text style={styles.btn}>Edit Task</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    deleteTask(currentWorkspace._id)
                                }}
                                style={{ marginTop: 10 , alignItems:"center", padding:5,borderRadius:30 }}
                            >
                                <Text style={{...styles.btn,color:"blue"}}>Delete Task</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


            </ScrollView>
        </ImageBackground>

    )
}

export default ViewTaskDetail;

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
    duedate: { fontSize: 30, fontFamily: 'Poppins_700Bold', borderRadius: 10, color: 'white' },
    LoginButton: { marginBottom: 20, backgroundColor: colors.blue, marginTop: 30, padding: 10, borderRadius: 100 },
    LoginButtonText: { color: 'white', fontFamily: 'Poppins_700Bold' },

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