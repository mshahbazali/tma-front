
import React, { useContext, useEffect, useReducer, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ImageBackground, StyleSheet, ScrollView, Image } from "react-native";
import { Ionicons, AntDesign, FontAwesome, Feather, Entypo, MaterialIcons } from '@expo/vector-icons';

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
import colors from "../../constant/colors";
import YellowBtn from "../../components/button/YellowBtn";
import AddWorkspaceInput from "../../components/TextInput/AddWorkspaceInput";
import Header from "../../components/header/Header";
import DoneBtn from "../../components/button/DoneBtn";
import Inputfield from "../../components/TextInput/TextInput";
import { useNavigation } from "@react-navigation/native";
import { ImagePickerModal } from '../../components/Modals/ImagePickerModal'
import { accessCamera, accessGallery } from "../../utils/ImagePicker";
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LoginButton from "../../components/button/LoginButton";
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { AuthContext } from "../../Context/Auth";
import axios from "axios"



const EditTask = (props) => {

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
    const { user, currentWorkspace, taskId, ipAddress, currentTask , setCurrentTask , darkMode , customDarkMode , customLightMode } = useContext(AuthContext)
    const date = new Date()
    const [time, setTime] = useState(new Date());
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [title, setTitle] = useState(currentTask.title)
    const [description, setDescription] = useState(currentTask.description)
    const createdDate = months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear()
    const [timePicker, setTimePicker] = useState(false);
    const [deadline, setDeadline] = useState(currentTask.timeline)
    const navigation = useNavigation()


    const [selectedTeams, setSelectedTeams] = useState(currentTask.taggedPersons)
    const [workspaceUsers, setWorkspaceUsers] = useState()

    const hideDatePicker = () => {
        setTimePicker(false)
    };

    const handleConfirm = (date) => {
        // setTime(date);
        setDeadline(months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear())
        hideDatePicker();
    };


    function onMultiChange() {
        return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
    }


    const users = currentWorkspace.users
    const getWorkSpaceUsers = () => {
        const form = {
            workspaceUsers: users
        }
        axios.post( ipAddress + '/workspace/getUsers-fortag', form)
            .then(function (response) {
                var userss = []
                for (var i = 0; i < response.data.length; i++) {
                    var form = {
                        item: response.data[i].username,
                        id: response.data[i]._id,
                        img: response.data[i].img,
                        status: "Pending"
                    }
                    if (form.id !== user._id) {
                        userss.push(form)
                    }
                }
                setWorkspaceUsers(userss)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            getWorkSpaceUsers()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let startTime = hours + ':' + minutes + ' ' + ampm;


    const editTask = () => {
        const form = {
            title: title,
            description: description,
            timeline: deadline,
            status: false,
            createdTime: startTime,
            createdDate: createdDate,
            taskCreatorId: user._id,
            workSpaceId: currentWorkspace._id,
            taggedPersons: selectedTeams,
            taskId: currentTask.taskId
        }
        axios.post(ipAddress + '/workspace/edit-task', form)
            .then(function (response) {
                alert(response.data)
                navigation.goBack()
                setCurrentTask(form)
            })
            .catch(function (error) {
                console.log("error");
            });
    }


    return !fontsLoaded ? <AppLoading /> : (

        <ScrollView style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>



            <DateTimePickerModal
                isVisible={timePicker}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />


            <Header endHeading="Edit Task" headingStyle={{ fontSize: 20, color: darkMode ? customDarkMode.textColor : customLightMode.textColor, fontFamily: 'Poppins_700Bold' }} />

            <View style={{ paddingBottom: 2 }}>
                <Text style={{...styles.activity,color:darkMode ? customDarkMode.textColor : customLightMode.textColor}} >Task title</Text>
                <View style={{}}>
                    <Inputfield
                        placeholderTextColor={'gray'}
                        placeholder="Task Title"
                        onChange={(e) => setTitle(e)}
                        value={title}
                        textStyle={{...styles.input,color:darkMode ? customDarkMode.textColor : customLightMode.textColor , backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}
                    />
                </View>
            </View>


            <View style={{ paddingBottom: 5 }}>
                <Text style={{...styles.activity,color:darkMode ? customDarkMode.textColor : customLightMode.textColor , backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }} >Task Discription</Text>
                <View style={{}}>
                    <Inputfield
                        placeholderTextColor={'gray'}
                        placeholder="e.g : I want the best work from you guys!"
                        onChange={(e) => setDescription(e)}
                        value={description}
                        textStyle={{...styles.input,color:darkMode ? customDarkMode.textColor : customLightMode.textColor,height:150 , backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}
                        numberOfLines={20}
                        textAlignVertical={'top'}
                        multiline={true}
                    />
                </View>
            </View>
            {workspaceUsers ? <View style={{ paddingBottom: 2, alignItems: "center" }}>
                <View style={{ width: "100%" }}>
                    <Text style={{...styles.activity,color:darkMode ? customDarkMode.textColor : customLightMode.textColor}} >Tag Person</Text>
                </View>
                <View />
                <SelectBox
                    label=""
                    options={workspaceUsers}
                    selectedValues={selectedTeams}
                    onMultiSelect={onMultiChange()}
                    onTapClose={onMultiChange()}
                    isMulti
                    toggleIconColor={darkMode ? customDarkMode.textColor : customLightMode.textColor}
                    searchIconColor={darkMode ? customDarkMode.textColor : customLightMode.textColor}
                    arrowIconColor={darkMode ? customDarkMode.textColor : customLightMode.textColor}
                    multiListEmptyLabelStyle={{color:darkMode ? customDarkMode.textColor : customLightMode.textColor}}
                    listEmptyLabelStyle={{color: darkMode ? customDarkMode.textColor : customLightMode.textColor , marginTop:5}}
                    inputFilterStyle={{color: darkMode ? customDarkMode.textColor : customLightMode.textColor }}                  
                    optionContainerStyle={{color: darkMode ? customDarkMode.textColor : customLightMode.textColor }}                  
                    selectedItemStyle={{ backgroundColor: "blue" }}
                    width="90%"
                />
            </View> : null}

            {/* Image picker  */}

            <Text style={{...styles.activity,color:darkMode ? customDarkMode.textColor : customLightMode.textColor}} >Deadline</Text>


            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginBottom: 20,
                }}>
                <TouchableOpacity
                    onPress={() => {
                        setTimePicker(true);
                    }}
                    style={{
                        width: 150,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        paddingVertical: 5,
                        backgroundColor: colors.greyinput,
                    }}>
                    <Text
                        style={{
                            fontFamily: 'Poppins_500Medium',
                            letterSpacing: -0.575,
                            padding: 10,
                            fontSize: 15,
                            color: darkMode ? customDarkMode.textColor : customLightMode.textColor,
                        }}>
                        {deadline}
                    </Text>
                    <AntDesign
                        name="caretdown"
                        size={12}
                        color={darkMode ? customDarkMode.textColor : customLightMode.textColor}
                    />
                </TouchableOpacity>
            </View>

            {/* done btn  */}
            <LoginButton onPress={() => editTask()} title={'Edit Task'} textStyle={styles.LoginButtonText} style={styles.LoginButton} />


        </ScrollView>
    )

}

export default EditTask;

const styles = StyleSheet.create({
    Mainview: { flex: 1,  },
    DoneBtn: { backgroundColor: colors.blue, marginHorizontal: 37, padding: 10, borderRadius: 100, height: 80, width: 80, alignItems: 'center', justifyContent: 'center' },
    DoneBtntext: { color: 'white', fontFamily: 'Poppins_500Medium', textAlign: 'center' },
    activity: { fontSize: 14,  fontFamily: 'Poppins_700Bold', marginHorizontal: 15, marginTop: 30 },
    input: {
        fontSize: 12, fontFamily: 'Poppins_500Medium', marginTop: 5, marginHorizontal: 18, paddingVertical: 0, padding: 0,
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
    LeaveBtn: { justifyContent: 'center', alignItems: 'center' },
    LoginButton: { marginBottom: 20, backgroundColor: colors.blue, marginHorizontal: 30, padding: 10, borderRadius: 100 },
    LoginButtonText: { color: 'white', fontFamily: 'Poppins_700Bold' },


})