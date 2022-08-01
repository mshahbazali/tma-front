import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image, ImageBackground, ActivityIndicator } from "react-native";
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

// icons
import { Ionicons, Entypo, Octicons, AntDesign } from '@expo/vector-icons';
import Inputfield from "../components/TextInput/TextInput";
import Card from "../components/card/Card";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from './../Context/Auth'
import axios from "axios"


const FullList = (props) => {
    const navigation = useNavigation()
    const { user, setCurrentWorkspace, ipAddress , customLightMode , customDarkMode , darkMode } = useContext(AuthContext)
    const [myWorkSpace, setMyWorkSpace] = useState([])
    const [recentWorkspaces, setRecentWorkspaces] = useState([])
    const [search, setSearch] = useState("")
    const [filteredWorkspace, setFilteredWorkspace] = useState()


    var form = {
        userId: user?._id
    }
    const getWorkSpace =async () => {
       user ? axios.post(ipAddress + '/workspace/myWorkspace/get', form)
            .then(function (response) {
                setMyWorkSpace(response.data)
            })
            .catch(function (error) {
                console.log(error);
            }) : null
    }

    const getRecentWorkspace = () => {
      user ?  axios.post(ipAddress + '/workspace/get/recent', form)
            .then(function (response) {
                setRecentWorkspaces(response.data)
            })
            .catch(function (error) {
                console.log("error");
            }):null
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            setAllShow(true)
            getWorkSpace()
            getRecentWorkspace()

        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);


    const [allShow, setAllShow] = useState(true)
    useEffect(() => {
       getWorkSpace()
       getRecentWorkspace()
    }, [])



    const deleteWorkspace = (id) => {
        const form = {
            id: id
        }
        axios.post(ipAddress + '/workspace/delete', form)
            .then(function (response) {
                getWorkSpace()
                getRecentWorkspace()
                console.log("response",response.data)
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
                getWorkSpace()
                getRecentWorkspace()
            })
            .catch(function (error) {
                console.log("error");
            });
    }
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

    return !fontsLoaded ? <ActivityIndicator /> : (
        <ScrollView style={{backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>

            <View style={{ paddingBottom: 5 }}>
                <View style={{...styles.MainView, backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
                    <View style={styles.Drawer}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Ionicons name="reorder-three" size={40} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
                        </TouchableOpacity>
                        <View style={styles.iconView}>

                            <Text style={{...styles.trello,color:darkMode ? customDarkMode.yellow : customLightMode.yellow}}>TMA</Text>
                            <Octicons name="dot" size={20} style={styles.icon} color={colors.yellow} />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('search')}>

                        <AntDesign
                            name="search1"
                            size={24}
                            color={darkMode ? customDarkMode.textColor : customLightMode.textColor}
                            style={{ paddingHorizontal: 20 }}
                        />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('myworkspacesearch')
                }}>
                    <Inputfield
                        placeholderTextColor={'gray'}
                        placeholder="Enter a name of your workspace"
                        onChange={(e) => {
                            setSearch(e)
                            const filtered = myWorkSpace?.filter(workspace => workspace.workSpaceName === e)
                            setFilteredWorkspace(filtered)
                            if (e !== "") {
                                setAllShow(false)
                            } else {
                                setAllShow(true)
                            }
                        }}
                        value={search}
                        textStyle={{...styles.input,backgroundColor:darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor , color:darkMode ? customDarkMode.textColor : customLightMode.textColor}}
                    />
                </TouchableOpacity>
            </View>


            {allShow ? <View>
                <View>
                    <Text style={{ fontSize: 20, color: darkMode ? customDarkMode.textColor : customLightMode.textColor, marginTop: 22, fontFamily: 'Poppins_800ExtraBold', marginHorizontal: 15, marginBottom: 20 }}>Recent Workspaces</Text>

                    <ScrollView horizontal={true}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginHorizontal: 15 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft:-12 }}>
                                {recentWorkspaces ? recentWorkspaces.length === 0 ?
                                    <View style={{ alignItems: "center", width: "100%" }}>
                                        <Text style={{color: darkMode ? customDarkMode.blue : customLightMode.blue, fontSize: 18, fontFamily: "Poppins_400Regular" }}>No Recent Workspace</Text></View>
                                    : recentWorkspaces.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                style={{ borderWidth:1 , borderColor:customDarkMode.textColor ,  height: 200, width: 155, marginLeft:10}}
                                            onPress={() => {
                                                setAllShow(true)
                                                navigation.navigate("viewworkspace")
                                                setCurrentWorkspace(item)
                                            }}>
                                                <ImageBackground key={index} source={{ uri: item?.workSpaceImage ? item?.workSpaceImage : "https://www.incimages.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg" }} style={{ flex: 1, justifyContent: 'space-between'  }}>
                                                    <Text>.</Text>
                                                    <Text style={{ color: 'white', backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.textColor, fontFamily: 'Poppins_700Bold', marginRight: 20, textAlign: 'center', paddingVertical: 10 }}>{item?.workSpaceName}</Text>

                                                </ImageBackground>
                                            </TouchableOpacity>
                                        )
                                    }) : <ActivityIndicator size="large" color="blue" />}
                            </View>
                        </View>
                    </ScrollView>

                </View>


                <View>
                    <Text style={{ fontSize: 20, color: darkMode ? customDarkMode.textColor : customLightMode.textColor, marginTop: 22, fontFamily: 'Poppins_800ExtraBold', marginHorizontal: 15, marginBottom: 20 }}>All Workspaces</Text>

                    {myWorkSpace ? myWorkSpace.length === 0 ?
                        <View style={{ height: 450, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: darkMode ? customDarkMode.textColor : customLightMode.textColor, fontSize: 18, fontFamily: "Poppins_400Regular" }}>You have no workspace</Text></View> :
                        myWorkSpace.map((item, index) => {
                            var adminIdMatched = false
                            if(item?.adminId === user._id){
                                adminIdMatched = true
                            }

                            return (
                                <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => {
                                    setCurrentWorkspace(item)
                                    navigation.navigate("viewworkspace")
                                }}>
                                    <Card
                                        image={item?.workSpaceImage ? item.workSpaceImage : "https://www.incimages.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg"}
                                        count="1"
                                        users={item?.users.length}
                                        teamname={item?.workSpaceName}
                                        createdDate={item?.createdDate}
                                        text={item?.about}
                                        title={adminIdMatched ? 'Delete' : "Leave"}
                                        onClick={() => {
                                           adminIdMatched ? deleteWorkspace(item._id) : leaveWorkspace(item._id)
                                        }}
                                        chatting={() => navigation.navigate('chatting')}
                                    />
                                </TouchableOpacity>
                            )
                        }) : <ActivityIndicator size="large" color="blue" />}
                </View>
            </View> :
                <View>
                    {filteredWorkspace ? filteredWorkspace.length === 0 ? <View style={{ height: 450, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: darkMode ? customDarkMode.textColor : customLightMode.textColor, fontSize: 18, fontFamily: "Poppins_400Regular" }}>No Workspace Found with this name</Text></View> :
                        <View>
                            {filteredWorkspace?.map((item, index) => {
                                  var adminIdMatched = false
                                  if(item.adminId === user._id){
                                      adminIdMatched = true
                                  }
                                return (
                                    <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => {
                                        setSearch("")
                                        navigation.navigate("viewworkspace")
                                        setCurrentWorkspace(item)
                                    }}>
                                        <Card
                                            image={item?.workSpaceImage ? item.workSpaceImage : "https://www.incimages.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg"}
                                            count="1"
                                            users={item?.users.length}
                                            teamname={item?.workSpaceName}
                                            createdDate={item.createdDate}
                                            text={item?.about}
                                            title={'Delete'}
                                            onClick={() => {
                                                adminIdMatched ? deleteWorkspace(item._id) : leaveWorkspace(item._id)
                                             }}
                                            chatting={() => navigation.navigate('chatting')}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        : null}
                </View>
            }

            {/* <View>
                <Text style={{ fontSize: 20, color: 'black', marginTop: 22, fontFamily: 'Poppins_800ExtraBold', marginHorizontal: 15, marginBottom: 20 }}>Recently Viewed</Text>


                {data.map((item, index) => {
                    return (
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('postview')}>

                            <Card
                                image={item.image}
                                count={item.count}
                                users={item.users}
                                teamname={item.teamname}
                                duedate={item.duedate}
                                text={item.text}
                                title={'Leave'}
                            />
                        </TouchableOpacity>
                    )
                })}
            </View> */}

        </ScrollView>


    )
}

export default FullList;

const styles = StyleSheet.create({
    MainView: { flexDirection: 'row', paddingTop: 40, paddingBottom: 0, justifyContent: 'space-between', alignItems: 'center' },
    Drawer: { flexDirection: 'row', alignItems: 'center' },
    trello: { fontSize: 29, fontFamily: 'Poppins_700Bold', },
    input: {
        fontSize: 12, fontFamily: 'Poppins_500Medium',  marginTop: 5, marginHorizontal: 18, paddingVertical: 0, padding: 0,
        flexDirection: 'row',
        marginHorizontal: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        // marginTop: 40,
        //shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconView: { flexDirection: 'row', width: 200 },
    icon: { paddingHorizontal: 5, marginTop: 20 }
});