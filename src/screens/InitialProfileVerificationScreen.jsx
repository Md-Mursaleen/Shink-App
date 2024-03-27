/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { notificationSvg, hamburgerSvg, shinkSvg } from '../data/SvgImageData';
import { normalize } from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';

const InitialProfileVerificationScreen = () => {
    const navigation = useNavigation();
    const [photoUri, setPhotoUri] = useState(null);

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    const handleVerifyPressed = async () => {
        navigation.navigate('ProfileVerification');
    };

    return (
        <View style={styles.container}>
            {/* Navigation bar */}
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#4e40b3', '#4e40b3', '#4e40b3']} // Changed color
                style={styles.navigationBarStyle}>
                <View style={styles.navigationBarContent}>
                    {/* Left side */}
                    {/* Replace "Shink" text with shinkSvg */}
                    <SvgXml xml={shinkSvg}
                        style={{ color: '#eafafb' }} />
                    {/* Right side */}
                    <View style={styles.rightContentContainer}>
                        {/* Notification icon */}
                        <SvgXml xml={notificationSvg}
                            style={styles.iconStyle} />
                        {/* Hamburger icon */}
                        <SvgXml xml={hamburgerSvg}
                            style={styles.iconStyle} />
                    </View>
                </View>
            </LinearGradient>
            {/* Big title: Verify */}
            <View style={styles.textContainer}>
                <Text style={styles.titleTextStyle}>Verify</Text>
                <Text style={styles.subTitleTextStyle}>your profile</Text>
            </View>
            {/* Text: Verifying helps */}
            <Text style={styles.informationTextStyle}>Verifying your profile helps,</Text>
            {/* Body of text */}
            <Text style={styles.bodyTextStyle}>
                Ensures User Safety {'\n'}
                Promotes Secure Interactions {'\n'}
                Strengthens Community Trust
            </Text>
            {/* Centered image */}
            <View style={{ alignItems: 'center' }}>
                <Image source={require('../assets/images/shink-verification.png')}
                    style={styles.logoImageStyle} />
                {/* Button-like text */}
                <TouchableOpacity>
                    <Text style={styles.termsAndConditionsTextStyle}>
                        Read our terms conditions</Text>
                </TouchableOpacity>
            </View>
            {/* Verify button */}
            <TouchableOpacity onPress={() => handleVerifyPressed()}
                style={styles.verifyButtonContainer}>
                <Text style={styles.verifyButtonTextStyle}>Verify your profile</Text>
            </TouchableOpacity>
            {/* Button for "What Can You Do?" */}
            <TouchableOpacity style={styles.whatCanYouDoButtonContainer}>
                <Text style={styles.whatCanYouDoButtonTextStyle}>What can you do ?</Text>
            </TouchableOpacity>
            {/* Bottom container to ensure buttons remain at the bottom */}
            <View style={styles.bottomContainer} />
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
    navigationBarContent: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rightContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        marginHorizontal: normalize(10),
        width: normalize(24),
        height: normalize(24),
    },
    textContainer: {
        marginTop: normalize(80), // Adjusting for the space taken by the navigation bar
        alignItems: 'center',
    },
    titleTextStyle: {
        fontSize: 50,
        fontWeight: '900',
        color: '#4e40B3', // Changed text color
    },
    subTitleTextStyle: {
        fontSize: 40,
        fontWeight: '400',
        color: '#4e40B3', // Changed text color
    },
    informationTextStyle: {
        marginTop: normalize(20),
        fontSize: 12.5,
        fontWeight: '300',
        color: '#363636', // Changed text color
        textAlign: 'center',
    },
    bodyTextStyle: {
        marginTop: normalize(10),
        fontSize: 15,
        fontWeight: '300',
        color: '#363636', // Changed text color
        textAlign: 'center',
    },
    logoImageStyle: {
        top: normalize(20),
        left: normalize(20),
        width: normalize(170), // Set the width as per your requirement
        height: normalize(130), // Set the height as per your requirement
    },
    termsAndConditionsTextStyle: {
        marginTop: 20, // Adjust this value as needed to properly position the text
        width: 500,
        height: 21,
        fontSize: 14.5,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        textAlign: 'center',
        color: '#4292ff',
        lineHeight: 21,
        textDecorationLine: 'underline',
    },
    verifyButtonContainer: {
        position: 'absolute', // Positioning the button
        bottom: 50, // Adjusting the position from the bottom
        left: 20, // Adjusting the position from the left
        right: 20, // Adjusting the position from the right
        top: 575,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20, // Pushing it up a bit
        width: 328,
        height: 48,
        alignSelf: 'center',
        backgroundColor: '#4e40b3', // Changed color
        borderRadius: 8,
    },
    verifyButtonTextStyle: {
        fontSize: 18,
        fontWeight: '400',
        color: '#ffffff',
        textAlign: 'center',
    },
    whatCanYouDoButtonContainer: {
        position: 'absolute', // Positioning the button
        bottom: 20, // Adjusting the position from the bottom
        left: 20, // Adjusting the position from the left
        right: 20, // Adjusting the position from the right
        top: 653,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 328,
        height: 48,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 3,
        borderColor: '#4e40b3', // Changed border color
        borderRadius: 8,
    },
    whatCanYouDoButtonTextStyle: {
        fontSize: 18,
        fontWeight: '400',
        color: '#4e40b3', // Changed text color
        textAlign: 'center',
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});

export default InitialProfileVerificationScreen;
