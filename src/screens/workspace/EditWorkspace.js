
import React, { useContext, useState } from "react";
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
import Header from "../../components/header/Header";
import Inputfield from "../../components/TextInput/TextInput";
import { useNavigation } from "@react-navigation/native";
import { ImagePickerModal } from '../../components/Modals/ImagePickerModal'
import { accessCamera, accessGallery } from "../../utils/ImagePicker";
import * as ImagePicker from 'expo-image-picker';
import { useCode } from "react-native-reanimated";
import LoginButton from "../../components/button/LoginButton";
import { AuthContext } from "../../Context/Auth";
import axios from "axios";
const EditWorkspace = (props) => {

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
  const {user , ipAddress , setCurrentWorkspace , currentWorkspace , darkMode , customDarkMode , customLightMode } = useContext(AuthContext)
  const [workspacename, setWorkspacename] = useState(currentWorkspace.workSpaceName)
  const [workspaceabout, setWorkspaceabout] = useState(currentWorkspace.about)
  const [workspaceImg, setWorkspaceImg] = useState(currentWorkspace.workSpaceImage)
  const [mughees, setMughees] = useState()
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation()


  const Delete = id => {
    setWorkspaceImg("")
  }

  const edit = ()=>{
    const form = {
      workSpaceName: workspacename,
      about: workspaceabout,
      workSpaceImage: workspaceImg,
      workspaceId:currentWorkspace._id
  }
  axios.post(ipAddress+'/workspace/edit', form)
      .then(function (response) {
          alert(response.data)
          navigation.navigate('viewworkspace')
      })
      .catch(function (error) {
          console.log(error);
      });
  }



  const openGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      setMughees({ image: result.uri })

      let base64Img = `data:image/jpg;base64,${result.base64}`

      //Add your cloud name
      let apiUrl = 'https://api.cloudinary.com/v1_1/trellobymughees/image/upload';

      let data = {
        "file": base64Img,
        "upload_preset": "workspaceImages",
      }

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(async r => {
        setVisible(false)
        let data = await r.json()
        setWorkspaceImg(data.secure_url)
        return data.secure_url
      }).catch(err => console.log(err))
    }
  };

  const openCamera = async () => {
    // No permissions request is necessary for launching the image library
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();


    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      setMughees({ image: result.uri })

      let base64Img = `data:image/jpg;base64,${result.base64}`

      //Add your cloud name
      let apiUrl = 'https://api.cloudinary.com/v1_1/trellobymughees/image/upload';

      let data = {
        "file": base64Img,
        "upload_preset": "workspaceImages",
      }

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(async r => {
        setVisible(false)
        let data = await r.json()
        setWorkspaceImg(data.secure_url)
        return data.secure_url
      }).catch(err => console.log(err))
    }
  };
  return !fontsLoaded ? <AppLoading /> : (

    <ScrollView style={{...styles.Mainview,backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
      <Header endHeading="Edit Workspace" headingStyle={{ fontSize: 20, color:darkMode ? customDarkMode.textColor : customLightMode.textColor, fontFamily: 'Poppins_700Bold' }} />

      <View style={{ paddingBottom: 2 }}>
        <Text style={{...styles.activity,color:darkMode ? customDarkMode.textColor : customLightMode.textColor}} >Add Workspace Name</Text>
        <View style={{}}>
          <Inputfield
            placeholderTextColor={'gray'}
            placeholder="TEAM 1 - PERSONAL"
            onChange={(e) => setWorkspacename(e)}
            value={workspacename}
            textStyle={{...styles.input,color:darkMode ? customDarkMode.textColor : customLightMode.textColor , backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}

          />
        </View>
      </View>

      <View style={{ paddingBottom: 5 }}>
        <Text style={{...styles.activity,color:darkMode ? customDarkMode.textColor : customLightMode.textColor}} >Add Workspace 'About' Information</Text>
        <View style={{}}>
          <Inputfield
            placeholderTextColor={'gray'}
            placeholder="e.g : This is workspace for our company to share task for our new brands"
            textStyle={{...styles.input,color:darkMode ? customDarkMode.textColor : customLightMode.textColor,height:150 , backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}
            numberOfLines={20}
            textAlignVertical={'top'}
            multiline={true}
            value={workspaceabout}
            onChange={(e)=> setWorkspaceabout(e)}
          />
        </View>
      </View>

      {/* Image picker  */}


      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!workspaceImg ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setVisible(true)}
            style={{
              alignItems: 'center',
              marginVertical: 20,
              borderWidth: 1, borderRadius: 5, padding: 10,
              borderStyle: 'dotted'
            }}>
            <MaterialIcons name="photo-camera" size={70} color={darkMode ? customDarkMode.textColor : customLightMode.textColor} />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              alignItems: 'center',
              marginVertical: 20, 
              borderRadius: 5,
              padding: 10,
            }}>

            <TouchableOpacity
              onPress={() => Delete()}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 5,
              }}>
              <Image
                source={{ uri: workspaceImg }}
                style={{
                  alignItems: 'center',
                  height: 100,
                  width: 100,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderColor: 'white',
                  borderRadius: 5,
                  // marginRight: 10,
                }}
              />
              <TouchableOpacity onPress={() => Delete()}>
                <Entypo
                  style={{
                    position: 'absolute',
                    right:-8,
                    top: -8,
                    backgroundColor: darkMode ? customDarkMode.textColor : customLightMode.textColor,
                    borderRadius: 100,
                  }}
                  name="circle-with-cross"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
      </View>



      {/* done btn  */}


      <LoginButton onPress={() => edit()} title={'Edit Workspace'} textStyle={styles.LoginButtonText} style={styles.LoginButton} />


      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={openGallery}
        onCameraPress={openCamera}
      />

    </ScrollView>
  )

}

export default EditWorkspace;

const styles = StyleSheet.create({
  Mainview: { flex: 1, backgroundColor: '#fff' },
  DoneBtn: { backgroundColor: colors.blue, marginHorizontal: 37, padding: 10, borderRadius: 100, height: 80, width: 80, alignItems: 'center', justifyContent: 'center' },
  DoneBtntext: { color: 'white', fontFamily: 'Poppins_500Medium', textAlign: 'center' },
  activity: { fontSize: 14,  fontFamily: 'Poppins_700Bold', marginHorizontal: 15, marginTop: 45 },
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