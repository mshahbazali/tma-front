import React,{useContext} from "react";
import { TouchableOpacity } from "react-native";
///***********Icon
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome5';
///Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FullList from "../screens/FullList";
import Search from "../screens/SearchTabs/Index";
import PostView from "../screens/PostView";
import Chatting from "../screens/chatting";
import CustomDrawer from "./CustomDrawer";
import colors from "../constant/colors";
import AppLoading from "expo-app-loading";
import { AuthContext } from "../Context/Auth";


const LoggedInStack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
} from "@expo-google-fonts/poppins";
import Activity from "../screens/Activity";
import Index from "../screens/setting/Index";
import About from "../screens/setting/About";
import TermAndCondition from "../screens/setting/TermAndCondition";
import EditProfile from "../screens/EditProfile";
import AddMembers from "../screens/workspace/AddMembers";
import CreateWorkspace from "../screens/workspace/CreateWorkspace";
import PrivacyPolicy from "../screens/setting/PrivacyPolicy";
import SelectPhoto from "../screens/workspace/SelectPhoto";
import Faq from "../screens/setting/Faq";
import ViewWorspace from "../screens/ViewWorkSpace";
import CreateTask from "../screens/workspace/CreateTask";
import ViewTaskDetail from "../screens/workspace/ViewTaskDetail";
import MyWorkspaceSearch from "../screens/SearchTabs/MyWorkspaceSearch";
import EditTask from '../screens/workspace/EditTask'
import EditWorkspace from "../screens/workspace/EditWorkspace";
import Deactivate from "../screens/setting/DeactivateAcount";





// const Tab = createBottomTabNavigator();

export const LoggedIn = ({ navigation }) => {
const {darkMode , customDarkMode , customLightMode} = useContext(AuthContext)

  return (
    <LoggedInStack.Navigator>

      {/* related home screens */}


      <LoggedInStack.Screen
        name="LoggedInDrawer"
        component={LoggedInDrawer}
        options={{ headerShown: false }}

      />
      <LoggedInStack.Screen
        name="postview"
        component={PostView}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="search"
        component={Search}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="myworkspacesearch"
        component={MyWorkspaceSearch}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="chatting"
        component={Chatting}
        options={{ headerShown: false }}
      />

      <LoggedInStack.Screen
        name="createtask"
        component={CreateTask}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="edittask"
        component={EditTask}
        options={{ headerShown: false }}
      />
      {/* settings   */}

      <LoggedInStack.Screen
        name="about"
        component={About}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="deactivate"
        component={Deactivate}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="termandcondition"
        component={TermAndCondition}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="privacypolicy"
        component={PrivacyPolicy}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="faq"
        component={Faq}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="addmembers"
        component={AddMembers}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="selectphoto"
        component={SelectPhoto}
        options={{ headerShown: false }}
      />

      <LoggedInStack.Screen
        name="viewworkspace"
        component={ViewWorspace}
        options={{ headerShown: false }}
      />


      <LoggedInStack.Screen
        name="ViewTaskDetail"
        component={ViewTaskDetail}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="editworkspace"
        component={EditTask}
        options={{ headerShown: false }}
      />


    </LoggedInStack.Navigator>
  );
};

export const LoggedInDrawer = () => {
  const { user, ipAddress ,  darkMode , customDarkMode , customLightMode } = useContext(AuthContext)
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
  return !fontsLoaded ? (
    <AppLoading />
  ) : (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: darkMode ? `rgba(255,255,255, 0.3)` : `rgba(255, 234, 0, 0.3)`,
        drawerActiveTintColor:darkMode ? 'white' : "black",
        drawerInactiveTintColor: darkMode ? 'white' : "black",
        drawerLabelStyle: {
          // marginLeft: -10,
          fontFamily: "Poppins_500Medium",
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        options={{ title: 'Home' }}
        name={'fullList'}
        component={FullList}
      />
      <Drawer.Screen
        options={{ title: 'Activity' }}
        name={'activity'}
        component={Activity}
      />
      <Drawer.Screen
        options={{ title: 'Settings' }}
        name={'settings'}
        component={Index}
      />
      <Drawer.Screen
        options={{ title: 'Edit Profile' }}
        name={'editprofile'}
        component={EditProfile}
      />
      <Drawer.Screen
        options={{ title: 'Create Workspace' }}
        name={'createworkspace'}
        component={CreateWorkspace}
      />




    </Drawer.Navigator>
  );
};
