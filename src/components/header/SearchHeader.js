import React , {useContext} from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Ionicons, Octicons } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/native";


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
import { AuthContext } from "../../Context/Auth";
const SearchHeader = (props) => {
    const navigation = useNavigation()
    const {darkMode , customDarkMode , customLightMode} = useContext(AuthContext)

    
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
        <View style={{ flexDirection: 'row', paddingTop: 40,paddingBottom:20, alignItems: 'center' , backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor  }}>
            <TouchableOpacity onPress={props.onClick}>

            <Ionicons name="chevron-back" size={30} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
            </TouchableOpacity>

            <TextInput
                value={props.value}
                underlineColorAndroid="transparent"
                multiline={props.multiline}
                style={[styles.text, props.textStyle]}
                placeholder={props.placeholder}
                onChangeText={props.onChange}
                onChange={props.onChange}
                keyboardType={props.keyboardType}
                placeholderTextColor={props.placeholderTextColor}
                onSubmitEditing={props.onSubmitEditing}
                secureTextEntry={props.secureTextEntry}
                defaultValue={props.defaultValue}
                maxLength={props.maxLength}
                autoFocus={props.autoFocus}
                editable={props.editable}
                numberOfLines={props.numberOfLines}
                textAlignVertical={props.textAlignVertical}
            />
        </View>
    )
}

export default SearchHeader;

const styles = StyleSheet.create({
    text: { padding: 0, width: '80%', margin: 0, fontSize: 14, color: colors.grey, marginLeft: 5, marginRight: 10, fontFamily: 'Poppins_500Medium' }
})