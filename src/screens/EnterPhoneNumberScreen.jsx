/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signUp, signIn } from 'aws-amplify/auth';
import { normalize } from '../components/theme';
import CountryPicker from 'react-native-country-picker-modal';
import Loader from 'react-native-modal-loader';
import ProgressBar from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EnterPhoneNumberScreen = () => {
    const navigation = useNavigation();
    const [selectedPhoneCode, setSelectedPhoneCode] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [borderColor, setBorderColor] = useState('#979797');
    const [countryCode, setCountryCode] = useState('IN');
    const [country, setCountry] = useState(null);

    const onSelect = (cntry) => {
        setCountryCode(cntry.cca2);
        setSelectedPhoneCode(cntry.callingCode);
        setCountry(cntry);
    };

    const handleNextButtonPressed = () => {
        if (phoneNumber.length < 10) {
            setBorderColor('#eb4335');
            return;
        }
        setBorderColor('#979797');
        const calculatedPhoneNumber = selectedPhoneCode + phoneNumber;
        handleSignUp({
            username: phoneNumber, password: phoneNumber,
            phone_number: calculatedPhoneNumber,
        });
        const userPhoneNumber = selectedPhoneCode + phoneNumber;
        console.log(userPhoneNumber);
        AsyncStorage.setItem('phoneNumber', userPhoneNumber);
        setIsLoading(false);
        navigation.navigate('OTPConfirmation',
            { phoneNumber: phoneNumber, countryCode: selectedPhoneCode });
    };

    async function handleSignUp({ username, password, phone_number }) {
        setIsLoading(true);
        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username,
                password,
                options: {
                    userAttributes: {
                        phone_number,  // E.164 number convention
                    },
                    // optional
                    autoSignIn: true,  // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
                },
            });
            console.log(userId);
            console.log('isSignUpComplete: ', isSignUpComplete);
            console.log('nextStep: ', nextStep);
            setIsLoading(false);
            navigation.navigate('OTPConfirmation',
                { phoneNumber: phoneNumber, countryCode: selectedPhoneCode });
        } catch (error) {
            console.log(error.message);
            if (error.message === 'An account with the given phone_number already exists.') {
                handleSignIn({ username, password, phone_number });
            }
        }
    }

    async function handleSignIn({ username, password }) {
        try {
            setIsLoading(false);
            const { isSignedIn, nextStep } = await signIn({ username, password });
            console.log(isSignedIn);
            if (isSignedIn) {
                setIsLoading(false);
                navigation.navigate('BottomTab');
            }
            console.log(nextStep);
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    const buttonTextStyle = {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: 23.4,
        opacity: phoneNumber !== '' ? 1 : 0.5,
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ProgressBar progress={0.05} />
            <Loader loading={isLoading} color={'#9d4edd'} />
            <Text style={styles.titleTextStyle}>Number?</Text>
            <View style={[styles.phoneNumberInputContainer, { borderColor: borderColor }]}>
                <CountryPicker
                    {...{
                        countryCode,
                        onSelect,
                    }}
                    withCallingCode={true}
                    withFlag={true}
                    visible={false}
                    withCallingCodeButton={true}
                    withModal={true} />
                <TextInput placeholder="Number"
                    placeholderTextColor={'#979797'}
                    keyboardType="numeric"
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                    style={[styles.phoneNumberTextInputStyle, { borderColor: borderColor }]} />
            </View>
            {borderColor === '#eb4335' ?
                <Text style={styles.warningTextStyle}>Enter a valid phone number</Text>
                : null}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity onPress={() => handleNextButtonPressed()}
                    style={[styles.buttonContainer,
                    { backgroundColor: phoneNumber ? '#9d4edd' : '#e0e0e0' }]}
                    disabled={!phoneNumber}>
                    <Text style={buttonTextStyle}>Next</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    titleTextStyle: {
        marginTop: normalize(30),
        marginLeft: 16,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
    },
    phoneNumberInputContainer: {
        paddingVertical: normalize(1.7),
        paddingHorizontal: normalize(7),
        marginTop: normalize(25),
        marginHorizontal: normalize(17),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1.5,
        borderColor: '#979797',
        borderRadius: 5,
    },
    phoneNumberTextInputStyle: {
        flex: 1,
        marginLeft: normalize(10),
        paddingLeft: normalize(10),
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        borderLeftWidth: 1.5,
    },
    warningTextStyle: {
        marginTop: normalize(20),
        fontSize: normalize(12),
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#eb4335',
        textAlign: 'center',
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

export default EnterPhoneNumberScreen;
