import React from 'react';
//Import Navigation
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/authentication/Login';
import LoginForm from '../screens/authentication/LoginForm';
import SignUp from '../screens/authentication/SignUp';
import Guide from '../screens/IntroSlider/Guide';
import RecoverAcc from '../screens/authentication/RecoverAcc';
import Otp from '../screens/authentication/Otp';
import ForgotOtp from '../screens/authentication/ForgotOtp';
import ChangePassword from '../screens/authentication/ChangePassword';

const AuthStack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="guide"
        component={Guide}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="loginform"
        component={LoginForm}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="signupform"
        component={SignUp}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name="recoveracc"
        component={RecoverAcc}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name="otp"
        component={Otp}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="forgototp"
        component={ForgotOtp}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="changepassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />




    </AuthStack.Navigator>
  );
};
