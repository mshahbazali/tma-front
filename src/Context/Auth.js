import React, { createContext, useCallback, useEffect, useState } from 'react';

export const AuthContext = createContext({});
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DeviceInfo from 'react-native-device-info';
// 
// export var uniqueId = DeviceInfo.getUniqueId();

export const AuthProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState()
  const [userEmail, setUserEmail] = useState()
  const [currentWorkspace, setCurrentWorkspace] = useState("")
  const [currentNewWorkspace, setCurrentNewWorkspace] = useState()
  const [currentTask, setCurrentTask] = useState("")
  const [taskId, setTaskId] = useState()
  const [darkMode, setDarkMode] = useState(false)
  const [workspaceId, setWorkspaceId] = useState(false)
  const [customLightMode, setCustomLightMode] = useState({
    backgroundColor: "#fff",
    textColor: "black",
    gray: "9F9F9F",
    blue: '#395AFF',
    creamColor: '#F3FFFD',
    yellow: '#FFD500',
  })
  const [customDarkMode, setCustomDarkMode] = useState({
    backgroundColor: "#292929",
    textColor: "#E4E4E4",
    gray: "9F9F9F",
    blue: '#395AFF',
    creamColor: '#F3FFFD',
    yellow: "#FFD500",
  })




  const ipAddress = "https://tma-backend.herokuapp.com"
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        setIsAuthenticated,
        currentWorkspace,
        setCurrentWorkspace,
        currentNewWorkspace,
        setCurrentNewWorkspace,
        taskId,
        setTaskId,
        ipAddress,
        currentTask,
        setCurrentTask,
        userEmail,
        setUserEmail,
        darkMode,
        setDarkMode,
        customLightMode,
        customDarkMode,
        workspaceId,
        setWorkspaceId
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
