import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
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
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker'
import { AuthContext } from "../../Context/Auth";


const Header = (props) => {
    const {darkMode , customDarkMode , customLightMode} = useContext(AuthContext)
    const navigation = useNavigation()
    const [selectedLanguage, setSelectedLanguage] = useState();
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
    return !fontsLoaded ? <AppLoading /> : (
        <View style={[{ flexDirection: 'row', paddingTop: 40, justifyContent: 'space-between', alignItems: 'center', backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor  }, props.style]}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={30} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
                <Text style={{ fontSize: 12, color: darkMode ? customDarkMode.textColor : customLightMode.textColor, marginRight: 25, fontFamily: 'Poppins_500Medium' }}>back</Text>
            </TouchableOpacity>
            

            <View>
                {props.admin ?
                    <View style={{ flexDirection: 'row' , marginRight : 10 ,alignItems : 'center' }}>
                        <TouchableOpacity onPress={props.PressIconPlus}>
                        <AntDesign style={{ marginHorizontal: 8 }} name="pluscircleo" size={24} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.threeDotsClick}>
                            <Entypo name="dots-three-vertical" size={20} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
                        </TouchableOpacity>
                    </View>

                    :
                    props.plusShow ? <TouchableOpacity onPress={props.PressIconPlus}>
                        <AntDesign style={{ marginHorizontal: 8 }} name="pluscircleo" size={24} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
                        </TouchableOpacity> : <TouchableOpacity onPress={props.onPress}>
                        <Text style={[{ fontSize: 12, color: darkMode ? customDarkMode.textColor : customLightMode.textColor, marginRight: 18, fontFamily: 'Poppins_700Bold', color: colors.grey }, props.headingStyle]}>{props.endHeading}</Text>
                    </TouchableOpacity>
                }


            </View>

        </View>
    )
}

export default Header;