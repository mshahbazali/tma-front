import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import FormData from 'form-data';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Header from '../../components/header/Header';
import LoginButton from '../../components/button/LoginButton';
import colors from '../../constant/colors';
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
import AppLoading from 'expo-app-loading';
import { AuthContext } from '../../Context/Auth';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
const Otp = () => {
    const { setIsAuthenticated, user, setUser, ipAddress, darkMode, customLightMode, customDarkMode } = useContext(AuthContext)

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

    const [visible, setVisible] = useState(false);
    const [notificationerror, setNotificationError] = useState(false);
    const cellCount = 4;
    const [timerCount, setTimer] = useState(10);
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otploading, setOtpLoading] = useState(false);
    const navigation = useNavigation()
    const ref = useBlurOnFulfill({ value, cellCount });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    useEffect(() => {
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval);
                return lastTimerCount - 1;
            });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval);
    }, [timerCount]);
    useEffect(() => {
        if (value.length === 4) {
            setError(false);
        }
    }, [value]);

    const verify = () => {
        const form = {
            otp: value
        };
        axios.post(ipAddress + '/verify', form)
            .then(function (response) {
                if (response.status == 204) {
                    alert("Please Fill valid OTP!")
                } else if (response.status == 203) {
                    alert("Please fill valid information")
                } else if (response.status == 202) {
                    navigation.navigate('loginform')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const resendOtp = () => {
        const form = {
            id: user.email
        }
        axios.post(ipAddress + '/resend', form)
            .then(function (response) {
                alert("OTP sent again")
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return !fontsLoaded ? <AppLoading /> : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ ...styles.container, backgroundColor: darkMode ? customDarkMode.backgroundColor : customLightMode.backgroundColor }}>
                <Header />
                <View style={styles.main}>
                    <Text style={{ ...styles.text, color: darkMode ? customDarkMode.textColor : customLightMode.textColor }}>please enter the verfication code</Text>

                    <View style={styles.otpSection}>
                        <CodeField
                            autoFocus={true}
                            ref={ref}
                            {...props}
                            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                            value={value}
                            textInputStyle={
                                {
                                    // shadowColor: 'black',
                                    // shadowOpacity: 0.26,
                                    // shadowOffset: {width: 0, height: 2},
                                    // shadowRadius: 8,
                                    // width: 50,
                                    // height: 50,
                                    // padding: 5,
                                    // fontSize: 45,
                                    // borderRadius: 5,
                                }
                            }
                            onChangeText={setValue}
                            cellCount={cellCount}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <View
                                    key={index}
                                    onLayout={getCellOnLayoutHandler(index)}
                                    style={[
                                        styles.cell,
                                        isFocused && styles.focusCell,
                                        error === true && styles.errorBorder,
                                    ]}>
                                    <Text
                                        style={{
                                            fontSize: 45,
                                            // fontWeight: '600',
                                            color: customLightMode.textColor,
                                            fontFamily: 'Montserrat-Black',

                                            textAlign: 'center',
                                        }}
                                        allowFontScaling={false}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>

                    {otploading ? (
                        <ActivityIndicator
                            // color="#00ff00"
                            color={'red'}
                            size="large"
                        />
                    ) : value.length === 4 && timerCount > 0 ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                            <Text style={{ ...styles.complete, color: darkMode ? customDarkMode.textColor : customLightMode.textColor }}>Complete </Text>
                            <FontAwesome name="check" color={'red'} size={18} />
                        </View>
                    ) : timerCount <= 0 ? (
                        <TouchableOpacity onPress={() => resendOtp()}>
                            <Text style={{ ...styles.tryAgain, color: darkMode ? customDarkMode.textColor : customLightMode.textColor }}>Tap to Send Otp Again</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={{ ...styles.tryAgain, color: darkMode ? customDarkMode.textColor : customLightMode.textColor }}>Try Again in {timerCount}</Text>
                    )}
                </View>
                <LoginButton onPress={() => verify()} title={'Check Otp'} textStyle={styles.LoginButtonText} style={styles.LoginButton} />

            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins_700Bold',
        letterSpacing: 0.09,

    },

    // Otp code

    otpSection: {
        marginVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cell: {
        // backgroundColor: 'red',
        fontWeight: '600',
        color: 'red',
        fontFamily: 'Poppins_700Bold',
        fontSize: 56,
        textAlign: 'center',
        height: 102,
        width: 77,
        borderRadius: 10,
        marginHorizontal: 3,
        justifyContent: 'center',
        backgroundColor: '#FCFCFC'
    },
    focusCell: {
        borderColor: '#000',
        color: 'red',
    },
    errorBorder: {
        borderWidth: 1,
        borderColor: 'red',
    },

    tryAgain: {
        textAlign: 'center',
        marginHorizontal: 10,
        fontFamily: 'Poppins_700Bold',
        letterSpacing: 0.09,
    },
    complete: {
        marginHorizontal: 10,
        fontFamily: 'Poppins_700Bold',
        letterSpacing: 0.09,
        fontSize: 14,
    },
    enabledButton: {
        backgroundColor: 'red',
    },
    enabledButtonText: {
        color: 'white',
    },
    LoginButton: { marginVertical: 15, backgroundColor: colors.blue, marginHorizontal: 37, padding: 10, borderRadius: 100 },
    LoginButtonText: { color: 'white', fontFamily: 'Poppins_500Medium' },
    // disabledButton: {
    //   backgroundColor: colors.disabledButton,
    // },
    // disabledButtonText: {
    //   color: colors.darktext,
    // },
    // fawad code wiill merge it latter
});
export default Otp;
