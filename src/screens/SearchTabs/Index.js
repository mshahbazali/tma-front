import React, { useContext, useState, useEffect, } from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator , TouchableOpacity , ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SearchHeader from '../../components/header/SearchHeader';
import colors from '../../constant/colors';
import About from '../setting/About';
import TermAndCondition from '../setting/TermAndCondition';
import Groups from './Groups';
import People from './People';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { AuthContext } from '../../Context/Auth';
import Card from '../../components/card/Card'




const initialLayout = { width: Dimensions.get('window').width };

export default function TabViewExample() {
  const [value, setValue] = useState('');
  const navigation = useNavigation()
  const { user, ipAddress, darkMode, customDarkMode, customLightMode,setCurrentNewWorkspace, setCurrentWorkspace } = useContext(AuthContext)
  const [newWorkSpace, setNewWorkSpace] = useState()
  const [groupShow, setGroupShow] = useState(true)
  const [searchedWorkspace, setSearchedWorkspace] = useState([])
  // const [index, setIndex] =useState(0);
  // const [routes] = useState([
  //   { key: 'first', title: 'Group' },
  //   { key: 'second', title: 'People' },
  // ]);


  // const renderScene = SceneMap({
  //   first: Groups,
  //   second: People,
  // });

  // const renderTabBar = props => (
  //   <View
  //     style={styles.renderTabBarStyle}>

  //     <TabBar
  //       {...props}
  //       indicatorStyle={{ backgroundColor: colors.yellow }}
  //       style={styles.tabbarstyle}
  //       activeColor={{ color: 'black' }}
  //       inactiveColor={{ color: 'black' }}
  //       tabStyle={{ width: 150, paddingLeft: 'auto' }}
  //       // labelStyle ={{  }}

  //       bounces={true}
  //       scrollEnabled={true}
  //     />
  //   </View>

  // );

  const getNewWorkSpace = () => {
    const form = {
      userId: user?._id
    }
    axios.post(ipAddress + '/workspace/getNew', form)
      .then(function (response) {
        setNewWorkSpace(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  useEffect(() => {
    getNewWorkSpace()
  }, [])


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      getNewWorkSpace()
      setGroupShow(true)
      setSearchedWorkspace([])
      setValue("")

    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setGroupShow(true)
    setSearchedWorkspace([])
    getNewWorkSpace()
    setValue("")
  }, [])

  var requestFromMeAsk;
  var requestFromAdminAsk;
  var alreadyAdded;
  for (var i = 0; i < searchedWorkspace[0]?.requestedUsers.length; i++) {
    if (searchedWorkspace[0]?.requestedUsers[i] === user._id) {
      requestFromAdminAsk = true;
      break;
    }

  }
  for (var j = 0; j < searchedWorkspace[0]?.userRequests.length; j++) {
    if (searchedWorkspace[0]?.userRequests[j] === user._id) {
      requestFromMeAsk = true;
      break;
    }

  }

  for (var k = 0; k < searchedWorkspace[0]?.users.length; k++) {
    if (searchedWorkspace[0]?.users[k] === user._id) {
      alreadyAdded = true;
      break;
    }
  }
  const deleteWorkspace = (id) => {
    const form = {
      id: id
    }
    axios.post(ipAddress + '/workspace/delete', form)
      .then(function (response) {
        getNewWorkSpace()
        setGroupShow(true)
        setValue("")
        alert("Deleted")
      })
      .catch(function (error) {
        console.log("error");
      });
  }



  const leaveWorkspace = (workspaceId) => {
    const form = {
      userId: user._id,
      workspaceId: workspaceId
    }
    axios.post(ipAddress + '/workspace/leave', form)
      .then(function (response) {
        getNewWorkSpace()
        alert("Leaved Workspace")
      })
      .catch(function (error) {
        console.log("error");
      });
  }



  return (
    <>

      <SearchHeader
        placeholderTextColor={colors.grey}
        placeholder="Search"
        onChange={(e) => {
          if (e === "") {
            setGroupShow(true)
            setValue(e)
          } else {
            setValue(e)
            setGroupShow(false)
            const filteredWorkspace = newWorkSpace.filter(workspace => workspace.workSpaceName === e)
            setSearchedWorkspace(filteredWorkspace)
          }
        }}
        value={value}
        onClick={() => navigation.navigate('fullList')}
      />
      {/* <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={initialLayout}
      /> */}
      {!groupShow ?
        <ScrollView>
          {searchedWorkspace.length !== 0 ? <TouchableOpacity activeOpacity={0.9} onPress={() => {
            alreadyAdded  ? setCurrentWorkspace(searchedWorkspace[0]) : setCurrentNewWorkspace(searchedWorkspace[0])
           alreadyAdded ? navigation.navigate("viewworkspace") : navigation.navigate('postview')
          }}><Card
              image={searchedWorkspace[0]?.workSpaceImage ? searchedWorkspace[0].workSpaceImage : "https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"}
              count={searchedWorkspace[0]?.count}
              users={searchedWorkspace[0]?.users?.length > 9 ? "9+" : searchedWorkspace[0].users.length}
              teamname={searchedWorkspace[0]?.workSpaceName}
              createdDate={searchedWorkspace[0]?.createdDate}
              text={searchedWorkspace[0]?.about}
              title={alreadyAdded ? searchedWorkspace[0].adminId === user._id ? "Delete" : "Leave" : requestFromAdminAsk ? "Accept" : requestFromMeAsk ? "Reuqested" : "Join"}
              onClick={() => alreadyAdded ? searchedWorkspace[0].adminId === user._id ? deleteWorkspace(searchedWorkspace[0]._id) : leaveWorkspace(searchedWorkspace[0]._id) : requestFromAdminAsk ? requestAcceptByMe(user._id, searchedWorkspace[0]._id) : requestFromMeAsk ? null : add(user._id, searchedWorkspace[0]._id)}
            /></TouchableOpacity> : <View style={{ height: 450, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: darkMode ? customDarkMode.textColor : customLightMode.textColor, fontSize: 18, fontFamily: "Poppins_400Regular" }}>No Workspace Found with this name</Text></View>}
        </ScrollView> :
        newWorkSpace ?
          newWorkSpace?.length === 0 ?
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 20, color: "blue" }}>No Workspace found</Text>
            </View>
            : <Groups
              data={newWorkSpace} />
          : null}
    </>



  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  renderTabBarStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // borderBottomColor : 'red',
    // borderWidth : 10
  },
  tabbarstyle: {
    backgroundColor: '#fff',
    elevation: 0,
    // paddingTop: 25,

  }
});