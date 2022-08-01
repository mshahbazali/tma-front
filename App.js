import React from 'react';
import { Text, StyleSheet, View, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar'; // automatically switches bar style based on theme!
import Button from './src/components/button'
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  useFonts,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';
import Header from './src/components/header/Header';
import Login from './src/screens/authentication/Login';
import LoginForm from './src/screens/authentication/LoginForm';
import SignUp from './src/screens/authentication/SignUp';
import RecoverAcc from './src/screens/authentication/RecoverAcc';
import FullList from './src/screens/FullList';
import Activity from './src/screens/Activity';
import TermAndCondition from './src/screens/setting/TermAndCondition';
import About from './src/screens/setting/About';
import PrivacyPolicy from './src/screens/setting/PrivacyPolicy';
import Index from './src/screens/SearchTabs/Index';
import Groups from './src/screens/SearchTabs/Groups';
import PostView from './src/screens/PostView';
import EditProfile from './src/screens/EditProfile';
import AppNavigationContainer from './src/navigation/NavigationContainer';
import { AuthProvider } from './src/Context/Auth';
import 'react-native-gesture-handler';


export default function App() {


  


  return (
    <AuthProvider>
      <AppNavigationContainer />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});