import React, { useState, useEffect, useContext } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from '../../Context/Auth';


//import AppIntroSlider to use it
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

import LoginButton from '../../components/button/LoginButton';
import colors from '../../constant/colors';
import LoginForm from '../authentication/LoginForm';
import Login from '../authentication/Login';


const Guide = () => {

    const { darkMode, customDarkMode, customLightMode } = useContext(AuthContext)

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
    const [showRealApp, setShowRealApp] = useState(false);
    const [changeIndex, setChangeIndex] = useState(0);



    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem("trello_token");
            if (value !== null) {
                // We have data!!
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        _retrieveData
    })

    const onNext = () => {

        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: '16%', marginTop: '-18%' }}>
                {/* <LoginButton title={'Next'} textStyle={styles.LoginButtonText} style={styles.LoginButton} /> */}
                <View style={[styles.LoginButton, styles.LoginButtonText]}>
                    <Text style={[{ textAlign: 'center', fontSize: 20, marginBottom: -2 }, styles.LoginButtonText]}>{'Next'}</Text>
                </View>
            </View>
        );
    };

    const onDone = () => {

        return (

            <Text style={[{ textAlign: 'center', fontSize: 20, marginBottom: -2 }, styles.LoginButtonText]}>{'Next'}</Text>

        );
    };

    const onSkip = () => {
        setShowRealApp(true);
    };

    const RenderItem = ({ item }) => {

        return (

            <View
            // style={{
            //     backgroundColor: '#fff',
            //     alignItems: 'center',
            // }}>
            >
                <Image style={styles.introImageStyle} source={item.image} />
                <Text style={{ ...styles.introTitleStyle, color: darkMode ? customDarkMode.textColor : customLightMode.textColor }}>{item.title}</Text>
                <Text style={styles.introTextStyle}>{item.text}</Text>

            </View>
        );
    };

    return !fontsLoaded ? <AppLoading /> : (
        <>
            {showRealApp ? (
                <Login />
            ) : (
                <View style={{ flex: 1, backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
                    <View style={{ ...styles.Header, backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>

                        <Text style={{ color: darkMode ? customDarkMode.backgroundColor: 'white' }}>Next</Text>
                        <View style={{ flexDirection: 'row' }}>

                            {slides.map((item, ind) => {
                                return (
                                    <Entypo key={ind} name="dot-single" style={{ padding: -10, margin: -10 }} size={40} color={item.index === changeIndex ? colors.creamColor : colors.blue} />
                                )
                            })
                            }
                        </View>
                        {changeIndex === 2 ?
                            <TouchableOpacity>
                                <Text style={[styles.skip, { color : darkMode ? customDarkMode.backgroundColor: 'white'}]}>Skip</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => setShowRealApp(true)}>
                                <Text style={[styles.skip]}>Skip</Text>
                            </TouchableOpacity>

                        }
                    </View>
                    <AppIntroSlider
                        data={slides}
                        renderItem={RenderItem}
                        onDone={onDone}
                        // renderDoneButton={onDone}
                        // renderNextButton={onNext}
                        showSkipButton={false}
                        showDoneButton={false}
                        dotStyle={{ borderColor: 'grey' }}
                        activeDotStyle={{backgroundColor : darkMode ? customDarkMode.backgroundColor : 'white'}}
                        renderNextButton={onNext}
                        // nextLabel={(e) => console.log(e)}
                        onSkip={() => setShowRealApp(false)}
                        dotClickEnabled={false}
                        onSlideChange={(e) => setChangeIndex(e)}
                    />
                    {changeIndex === 2 &&

                        <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '85%', left: '20%' }}>
                            <LoginButton onPress={onSkip} title={'Done'} textStyle={styles.LoginButtonText} style={styles.LoginButton} />
                        </View>
                    }

                </View>
            )}
        </>
    );
};

export default Guide;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        // justifyContent: 'center',
    },
    titleStyle: {
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    paragraphStyle: {
        padding: 20,
        textAlign: 'center',
        fontSize: 16,

    },
    introImageStyle: {
        // width: '85%',
        height: '60%',
        marginHorizontal: 25,
        borderRadius: 30
    },
    introTextStyle: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        // paddingVertical: 30,
        color: '#9F9F9F',
        fontFamily: 'Poppins_400Regular',


    },
    introTitleStyle: {
        fontSize: 40,
        color: 'black',
        textAlign: 'center',
        // fontWeight: 'bold',
        fontFamily: 'Poppins_700Bold',
        marginTop: 52

    },
    LoginButton: { borderWidth: 2, borderColor: colors.blue, marginHorizontal: 37, padding: 10, borderRadius: 100, width: 150 },
    LoginButtonText: { color: colors.blue, fontFamily: 'Poppins_500Medium' },
    Header: { backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 30, marginVertical: 20, marginTop: 60, },
    skip: { fontSize: 12, fontFamily: 'Poppins_700Bold', color: colors.grey }
});

const slides = [
    {
        key: 's1',
        title: 'Create Panels',
        text: 'Share your progress, updates, and work',
        image: {
            uri:
                'https://images.unsplash.com/photo-1619608135352-868e8313e121?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRhYmxlJTIwbGFtcHxlbnwwfHwwfHw%3D&w=1000&q=80',
        },
        backgroundColor: '#20d2bb',
        index: 0
    },
    {
        key: 's2',
        title: 'Explore',
        text: 'Tickets, Comments, Attachments, Panels, and much more...',
        image: {
            uri:
                'https://images.unsplash.com/photo-1619608135352-868e8313e121?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRhYmxlJTIwbGFtcHxlbnwwfHwwfHw%3D&w=1000&q=80',
        },
        backgroundColor: '#febe29',
        index: 1

    },
    {
        key: 's3',
        title: 'Work in teams',
        text: 'Easily add or create your team',
        image: {
            uri:
                'https://images.unsplash.com/photo-1619608135352-868e8313e121?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRhYmxlJTIwbGFtcHxlbnwwfHwwfHw%3D&w=1000&q=80',
        },
        backgroundColor: '#febe29',
        index: 2
    },

];