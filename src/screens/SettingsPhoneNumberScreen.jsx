/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    View, Text, StyleSheet,
    TouchableOpacity, Image, TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';
import CountryPicker from 'react-native-country-picker-modal';

const SettingsPhoneNumberScreen = () => {
    const navigation = useNavigation();
    const [selectedPhoneCode, setSelectedPhoneCode] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState('7982928791');
    const [countryCode, setCountryCode] = useState('IN');
    const [country, setCountry] = useState(null);

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    const buttonTextStyle = {
        fontSize: 16.5,
        fontWeight: '500',
        color: '#ffffff',
        lineHeight: 23.4,
    };

    const onSelectCountryCode = (cntry) => {
        setCountryCode(cntry.cca2);
        setSelectedPhoneCode(cntry.callingCode);
        setCountry(cntry);
    };

    return (
        <View style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#4e40b3', '#4e40b3', '#4e40b3']}
                style={styles.navigationBarStyle}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>Personal Information</Text>
                </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.textStyle}>Mobile Number</Text>
            <View style={styles.textInputContainer}>
                <CountryPicker
                    {...{
                        countryCode,
                        onSelectCountryCode,
                    }}
                    withCallingCode={true}
                    withFlag={true}
                    visible={false}
                    withCallingCodeButton={true}
                    withModal={true} />
                <TextInput value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    style={styles.textInputStyle} />
            </View>
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    style={styles.buttonContainer}>
                    <Text style={buttonTextStyle}>Verify Number</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    navigationBarStyle: {
        paddingVertical: normalize(8),
        paddingHorizontal: normalize(16),
        width: '100%',
        height: normalize(56),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backImageStyle: {
        width: normalize(17),
        height: normalize(17),
        resizeMode: 'contain',
    },
    titleTextStyle: {
        marginLeft: normalize(13),
        fontSize: 23,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    textStyle: {
        marginTop: normalize(30),
        marginLeft: normalize(15),
        marginBottom: normalize(8),
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    textInputContainer: {
        paddingVertical: normalize(1),
        paddingHorizontal: normalize(7),
        marginRight: normalize(5),
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1.5,
        borderColor: '#cfd3d6',
        borderRadius: 8,
    },
    textInputStyle: {
        marginTop: normalize(3),
        marginLeft: normalize(8),
        fontSize: 15,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
        lineHeight: 21,
    },
    bottomButtonContainer: {
        paddingHorizontal: normalize(20),
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        paddingVertical: normalize(13.3),
        paddingHorizontal: normalize(83),
        marginBottom: normalize(35),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4e40b3',
        borderRadius: 8,
    },
});

export default SettingsPhoneNumberScreen;
