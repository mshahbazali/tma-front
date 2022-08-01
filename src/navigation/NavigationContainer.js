import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from '../navigation/Appnavigation';
import { AuthContext } from '../Context/Auth';
import { LoggedIn, LoggedInDrawer } from './LoggedInNavigation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavigationContainer = () => {
  const { isAuthenticated, setUser, setIsAuthenticated, ipAddress } = useContext(AuthContext);
  const getToken = async () => {
    var token = await AsyncStorage.getItem('trello_token')
    axios.get(ipAddress + '/single/get-user/me', {
      headers: {
        token: token
      }
    }).then((res) => {
      setUser(res.data)
      if (token !== null) {
        setIsAuthenticated(token)
      }
    }).catch((err) => {
      console.log("err");
    })
  }
  useEffect(()=>{
    getToken()
    },[])
  return (
    <NavigationContainer>
      {isAuthenticated !== false ? <LoggedIn /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
export default AppNavigationContainer;
