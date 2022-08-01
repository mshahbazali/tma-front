import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native"
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
import { Entypo, MaterialIcons, Feather } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import Header from "../../components/header/Header";
import LoginButton from "../../components/button/LoginButton";
import Inputfield from "../../components/TextInput/TextInput";
import YellowBtn from "../../components/button/YellowBtn";
import { useNavigation } from "@react-navigation/native";
import {AuthContext} from '../../Context/Auth'
import axios from "axios";


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


]

const AddMembers = () => {
    const navigation = useNavigation()
    const [workspace, setWorkspace] = useState('')
    const {user , currentWorkspace , darkMode , customLightMode , customDarkMode , ipAddress} = useContext(AuthContext)
    const [ users , setUsers] = useState([])
    const [value, setValue] = useState('')
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


    const getWorkspace = () => {
        const form = {
            id: currentWorkspace?._id
        }
        axios.post(ipAddress + '/workspace/current/get', form)
            .then(function (response) {
                setWorkspace(response.data)
            })
            .catch(function (error) {
                console.log("Error in get current");
            });
    }



    const getUsers = () => {
        const form = {
            userId: user._id
        }
        axios.post( ipAddress + '/workspace/get-user/forsendRequest', form)
            .then(function (response) {
                setUsers(response.data)
            })
            .catch(function (error) {
                console.log("Error in get current");
            });
    }


    const requestByAdmin = (id)=>{
        const form = {
            workSpaceId:currentWorkspace._id,
            requestedUserId:id
        }
        axios.post(ipAddress + '/workspace/request-by-admin', form)
        .then(function (response) {
            alert(response.data)
            getUsers(currentWorkspace?._id)
        })
        .catch(function (error) {
            console.log("Error in get current");
        });
    }


    useEffect(() => {
        getWorkspace()
        getUsers(currentWorkspace?._id)
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            getUsers(currentWorkspace?._id)
            getWorkspace()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);



    return !fontsLoaded ? <AppLoading /> : (
        <ScrollView style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
            <Header plusShow={false} endHeading={'Add Members'} headingStyle={{ fontSize: 20, color: darkMode ? customDarkMode.textColor : customLightMode.textColor, fontFamily: 'Poppins_700Bold' }} />
            {/* <View>
                <Text style={styles.activity} >Email</Text>
                <View style={{}}>
                    <Inputfield
                        placeholderTextColor={colors.grey}
                        placeholder="Email"
                        onChange={(e) => setValue(e)}
                        value={value}
                        textStyle={styles.input}

                    />
                </View>
            </View> */}

            <View>
                <Text style={styles.activity} >Search People</Text>
                <View style={{}}>
                    <Inputfield
                        placeholderTextColor={colors.grey}
                        placeholder="Search People"
                        onChange={(e) => setValue(e)}
                        value={value}
                        textStyle={{...styles.input,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}

                    />
                </View>
            </View>
            {/* <View style={[styles.MainCard, { marginTop: 40, marginBottom: -20 }]}>
                <View style={{ marginRight: 10 }}>
                    <Image style={styles.userImage} source={{ uri: Activity[0].image }} />
                </View>
                <View style={{ width: '63%' }}>
                    <Text style={[styles.postedBy, { fontFamily: 'Poppins_400Regular' }]}>{'Dale'}</Text>
                </View>

                <TouchableOpacity onPress={() => alert('Already add')}>
                    <MaterialIcons name="done" style={{ padding: 5, borderRadius: 50, backgroundColor: colors.blue, color: 'white' }} size={24} color="black" />
                </TouchableOpacity>
            </View> */}

            <View>
                {/* <Text style={styles.activity} >Recent People</Text> */}



                {users ? users.length === 0 ? <View><Text>No User Found</Text></View>: users.map((item, index) => {
                    
                        var alreadyAdded= false
                        var requestSent = false
                        var requestCome = false

                        var currentWorkspace = workspace;
                        for(var i = 0 ; i < currentWorkspace?.users?.length ; i++){
                            if(item._id.toString() === currentWorkspace?.users[i]){
                                alreadyAdded = true
                                break;
                            }
                        }
                        for(var j = 0 ; j < currentWorkspace?.userRequests?.length ; j++){
                            if(item._id.toString() === currentWorkspace?.userRequests[j]){
                                requestCome = true
                                break;
                            }
                        }
                        for(var k = 0 ; k < currentWorkspace?.requestedUsers?.length ; k++){
                            if(item._id.toString() === currentWorkspace?.requestedUsers[k]){
                                requestSent = true
                                break;
                            }
                        }

                    
                    return (



                        <View style={styles.MainCard}>
                            <View style={{ marginRight: 10 }}>
                                <Image style={styles.userImage} source={{ uri: item.img ? item.img : "https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80" }} />
                            </View>
                            <View style={{ width:alreadyAdded ? "63%" : requestCome ? "45%" : requestSent ? "45%" : "55%" }}>
                                <Text style={[styles.postedBy, { fontFamily: 'Poppins_400Regular' }]}>{item.username}</Text>
                            </View>
                            {alreadyAdded ?
                                <TouchableOpacity onPress={() => alert('Already add')}>
                                    <MaterialIcons name="done" style={{ padding: 5, borderRadius: 50, backgroundColor: colors.blue, color: 'white' }} size={24} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity >
                                    <View style={styles.LeaveBtn}>
                                        <YellowBtn
                                         textStyle={{ color: colors.blue }}
                                          style={{ backgroundColor: 'white', borderColor: colors.blue, borderWidth: 1, paddingHorizontal: 30 }}
                                           title={requestCome === true ? "Accept" : requestSent === true ? "Requested" : "Add"} 
                                           onClick={() => requestCome === true ? console.log("requestCome") : requestSent === true ? console.log("request sent") : requestByAdmin(item._id)}
                                           />
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                    )
                }):null}
            </View>
            {/* <TouchableOpacity style={[styles.LeaveBtn, { marginVertical: 20 }]} onPress={() => navigation.navigate('selectphoto')}>
                <Feather name="arrow-right" style={{ padding: 5, borderRadius: 50, backgroundColor: colors.blue, color: 'white' }} size={25} color="black" />
                <Text style={{ color: 'black', fontSize: 14, marginTop: 5, fontFamily: 'Poppins_700Bold' }}>Done</Text>
            </TouchableOpacity> */}

        </ScrollView>
    )
}

export default AddMembers;

const styles = StyleSheet.create({
    Mainview: { flex: 1, },
    LeaveBtn: { justifyContent: 'center', alignItems: 'center' },
    activity: { fontSize: 25,fontFamily: 'Poppins_700Bold', marginHorizontal: 15, marginTop: 45 },
    MainCard: { marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', marginTop: 29 , paddingRight:10 },
    userImage: { height: 50, width: 50, borderRadius: 50 },
    postedBy: { fontSize: 13, fontFamily: 'Poppins_700Bold' },
    postedByTime: { fontSize: 13, fontFamily: 'Poppins_400Regular', color: colors.grey },
    input: {
        fontSize: 12, fontFamily: 'Poppins_500Medium', color: colors.grey, marginTop: 5, marginHorizontal: 18, paddingVertical: 0, padding: 0,
        flexDirection: 'row',
        marginHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
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



})