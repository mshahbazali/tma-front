import React, { useEffect, useContext, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, ImageBackground, StyleSheet } from "react-native";
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import { AuthContext } from '../../Context/Auth'
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
import colors from "../../constant/colors";
import YellowBtn from "../button/YellowBtn";
import AvatarInline from "../../screens/workspace/AvatarInline";

const WorkspaceCard = (props) => {

    const { ipAddress, user , darkMode , customDarkMode , customLightMode } = useContext(AuthContext)
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


    var tagged;
    var completed;
    const [taskCreator, setTaskCreator] = useState()

    const getTaskCreator = () => {
        const form = {
            id: props.taskCreatorId
        }
        axios.post(ipAddress +'/single/get-user', form)
            .then(function (response) {
                setTaskCreator(response.data.username)

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    useEffect(() => {
        getTaskCreator()
    }, [])


    return !fontsLoaded ? <AppLoading /> : (
        <TouchableOpacity onPress={props.onPress} style={styles.MainView}>
            <View style={styles.cardView}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ width: '100%' }}>
                        <Text style={[styles.text, { color: darkMode ? customDarkMode.textColor : customLightMode.textColor, fontSize: 16, marginTop: 10 }]}>{props.title}</Text>
                        <Text style={styles.text}>{props.discription}</Text>
                        <Text style={styles.text}>{`Task Assign : ${taskCreator}`}</Text>
                        <Text style={styles.text}>{`Deadline : ${props.duedate}`}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "row", width: "50%", marginTop: 10, paddingLeft: 20, marginBottom: 10 }}>
                        {props.avatar.length !== 0 ? props.avatar?.map((v, i) => {
                            if (v.id === user._id) {
                                tagged = true
                            }
                            if (v.status === "Completed") {
                                completed = true
                            }
                            return (
                                <AvatarInline
                                    key={i}
                                    data={v}
                                />
                            )
                        }) : null}
                    </View>
                    <View style={{ width: "50%" }}>
                        {tagged ? <YellowBtn
                            title={completed ? "Completed" : "Complete"}
                            onClick={!completed ? props.onClick : null}
                        /> : null}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default WorkspaceCard;

const styles = StyleSheet.create({
    MainView: {
        marginHorizontal: 12, 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        marginBottom: 20
        // padding: 10
    },
    cardView: {
        borderWidth: 1,
        borderColor: '#d7d7d7',
        padding: 8,
        borderRadius:5

    },
    ImageBg: { height: 200, borderRadius: 10, },
    ImageBgChild: { justifyContent: 'space-between', flex: 1 },
    firstSection: { flexDirection: 'row', justifyContent: 'space-between', margin: 10 },
    message: { flexDirection: 'row', alignItems: 'center' },
    count: { fontSize: 12, fontFamily: 'Poppins_700Bold', backgroundColor: 'white', paddingHorizontal: 10, borderRadius: 10 },
    newmessgaetext: { fontSize: 12, fontFamily: 'Poppins_700Bold', paddingHorizontal: 10, borderRadius: 10, color: 'white' },
    totalUserView: { height: 30, width: 30, borderRadius: 50, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center' },
    leavebtnView: { flexDirection: 'row', justifyContent: 'space-between', margin: 10 },
    teamname: { fontSize: 14, fontFamily: 'Poppins_700Bold', paddingHorizontal: 10, borderRadius: 10, color: 'white' },
    duedate: { fontSize: 12, fontFamily: 'Poppins_700Bold', borderRadius: 10, color: colors.yellow },
    LeaveBtn: { justifyContent: 'center', alignItems: 'center', marginTop: -25 },
    LeaveBtnChild: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 50, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center' },
    text: { fontSize: 12, fontFamily: 'Poppins_400Regular', borderRadius: 10, color: colors.grey, marginTop: 4, marginHorizontal: 5 },
    iconView: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, marginTop: 26 },

})