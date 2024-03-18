/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
// import { confirmSignUp } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import theme, { normalize } from '../components/theme';
import ProgressBar from '../components/ProgressBar';
import OTPTextInput from 'react-native-otp-textinput';
import Loader from 'react-native-modal-loader';

export default function OTPScreen({ route }) {
    const navigation = useNavigation();
    const { phoneNumber, countryCode } = route.params;
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOTPTrue, setIsOTPTrue] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        console.log(otp);
    }, [otp]);

    async function handleSignUpConfirmation() {
        navigation.navigate('EnterName');
    }

    // async function handleSignUpConfirmation() {
    //     setIsLoading(true);
    //     const username = countryCode + phoneNumber;
    //     try {
    //         const { isSignUpComplete, nextStep } = await confirmSignUp({
    //             username: username,
    //             confirmationCode: otp
    //         });
    //         if (isSignUpComplete) {
    //             console.log('Sign up complete');
    //             setIsAuthenticated(true);
    //             setIsLoading(false);
    //             setIsOTPTrue(true);
    //             navigation.navigate('LocationAccess');
    //         } else {
    //             console.log('Next step...', nextStep);
    //         }
    //     } catch (error) {
    //         setIsLoading(false);
    //         setIsOTPTrue(false);
    //         console.log('Error while confirming sign up: ', error);
    //         setErrorMessage(error.message);
    //     }
    // }

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [timer]);

    const formatTimer = (time) => {
        return time.toString().padStart(2, '0');
    };

    const resendOTP = () => {
        setTimer(30);
    };

    const buttonTextStyle = {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: 23.4,
        opacity: otp !== '' ? 1 : 0.5,
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ProgressBar progress={0.1} />
            {/* <Loader loading={isLoading} color={'#9d4edd'} /> */}
            <Text style={styles.titleTextStyle}>OTP?</Text>
            <Text style={[styles.subTitleTextStyle, { color: '#979797' }]}>OTP sent to <Text
                style={[styles.subTitleTextStyle, { color: '#9d4edd' }]}>{countryCode}-{phoneNumber}</Text></Text>
            <View style={{ marginHorizontal: normalize(8) }}>
                <OTPTextInput
                    handleTextChange={e => setOtp(e)}
                    textInputStyle={[styles.textInputStyle, {
                        backgroundColor: isOTPTrue ? '#eef1f8' : '#000000',
                    }]}
                    tintColor={isOTPTrue ? '#9d4edd' : '#eb4335'}
                    offTintColor={'transparent'}
                    inputCount={6} />
            </View>
            {isOTPTrue ? null : <Text style={styles.Warning}>{errorMessage}</Text>}
            {timer > 0
                ? <Text style={[styles.resendOTPTextStyle, { marginLeft: normalize(15), color: '#979797' }]}>
                    Resend OTP in <Text style={[styles.resendOTPTextStyle,
                    { marginLeft: normalize(5), color: '#9d4edd' }]}>00:{formatTimer(timer)}</Text></Text>
                : <View style={{
                    marginHorizontal: normalize(55), display: 'flex', flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <Text style={[styles.textStyle, {
                        fontFamily: 'AvenirNext-Regular', color: '#979797',
                    }]}>
                        Didn't received OTP?</Text>
                    <TouchableOpacity onPress={() => resendOTP()}>
                        <Text style={[styles.textStyle,
                        {
                            fontSize: normalize(14), fontFamily: 'AvenirNext-Regular',
                            color: '#354e66',
                        }]}>RESEND OTP</Text>
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity onPress={() => handleSignUpConfirmation()}
                    style={[styles.buttonContainer,
                    { backgroundColor: otp ? '#9d4edd' : '#e0e0e0' }]}
                    disabled={!otp}>
                    <Text style={buttonTextStyle}>Next</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    titleTextStyle: {
        marginTop: normalize(30),
        marginLeft: normalize(15),
        fontSize: 32.5,
        fontWeight: 'bold',
        color: '#000000',
        lineHeight: 42,
    },
    subTitleTextStyle: {
        marginTop: normalize(25),
        marginBottom: normalize(17),
        marginLeft: normalize(15),
        fontSize: normalize(13.8),
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        lineHeight: 21,
    },
    textInputStyle: {
        width: normalize(45),
        height: normalize(45),
        fontSize: normalize(20),
        fontFamily: 'AvenirNext-Regular',
        color: '#171724',
        borderWidth: normalize(2),
        borderBottomWidth: normalize(2),
        borderRadius: normalize(10),
    },
    warningTextStyle: {
        marginTop: normalize(20),
        fontSize: normalize(12),
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#eb4335',
        textAlign: 'center',
    },
    resendOTPTextStyle: {
        marginTop: normalize(28),
        marginBottom: normalize(20),
        fontSize: normalize(14),
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        lineHeight: 21,
    },
    textStyle: {
        marginTop: normalize(28),
        marginBottom: normalize(20),
        fontWeight: '400',
    },
    bottomButtonContainer: {
        paddingHorizontal: normalize(20),
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        padding: normalize(13),
        marginBottom: normalize(20),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
});
