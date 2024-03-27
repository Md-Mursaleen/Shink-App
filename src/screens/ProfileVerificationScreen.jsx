/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { cameraSvg } from '../data/SvgImageData';
import { RNCamera } from 'react-native-camera'; // Import RNCamera
import { normalize } from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';

const ProfileVerificationScreen = () => {
    const navigation = useNavigation();
    const [photoUri, setPhotoUri] = useState(null);
    const cameraRef = useRef(null); // Import useRef from 'react'

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    const handleCameraButtonPressed = async () => {
        if (cameraRef.current) {
            const permissionGranted = await requestCameraPermission();
            if (permissionGranted) {
                const options = { quality: 0.5, base64: true };
                const data = await cameraRef.current.takePictureAsync(options);
                console.log('Photo captured: ', data.uri);
                setPhotoUri(data.uri);
                navigation.navigate('FinalProfileVerification',
                    { photoUri: data.uri });
                console.log('Navigated to FinalProfileVerificationScreen');
            } else {
                Alert.alert('Permission Denied', 'Camera permission is required to capture photos.');
            }
        }
    };

    // Function to request camera permission
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'This app needs access to your camera.',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission granted');
                return true;
            } else {
                console.log('Camera permission denied');
                Alert.alert(
                    'Permission Denied',
                    'Camera permission is required to capture photos.',
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('OK Pressed'),
                            style: 'cancel',
                        },
                    ],
                    { cancelable: false }
                );
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    useEffect(() => {
        requestCameraPermission(); // Call requestCameraPermission when the component mounts
    }, []); //

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
                    <Text style={styles.titleTextStyle}>Verification</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={styles.cameraContainer}>
                <View style={styles.rectangleContainer}>
                    {/* Small rectangle inside the larger rectangle */}
                    <View style={styles.smallRectangleContainer} />
                    {/* Camera preview */}
                    <RNCamera ref={cameraRef}
                        type={RNCamera.Constants.Type.front}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        captureAudio={false}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        ratio={'520:328'}
                        style={styles.cameraPreviewStyle} />
                </View>
                <Text style={styles.textStyle}>Place your face within Rectangle</Text>
                <View style={styles.outerCircleContainer}>
                    <View style={styles.middleCircleContainer}>
                        <View style={styles.innerCircleContainer}>
                            {/* This is where cameraSvg is used */}
                            <TouchableOpacity onPress={() => handleCameraButtonPressed()}
                                style={styles.cameraButtonContainer}>
                                <SvgXml xml={cameraSvg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(15),
        width: '100%',
        height: normalize(55),
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
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    cameraContainer: {
        flex: 1,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    rectangleContainer: {
        position: 'relative',
        top: -20,
        width: 328,
        height: 520, // Adjust the height as needed
        borderWidth: 3,
        borderColor: '#4e40b3',
        borderRadius: 12,
        overflow: 'hidden', // Clip the camera preview inside the rectangle
    },
    smallRectangleContainer: {
        top: 80,
        width: '80%',
        height: 250,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#4e40b3',
        borderRadius: 12,
    },
    cameraPreviewStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%',
    },
    textStyle: {
        bottom: 8,
        width: 252,
        height: 21,
        fontSize: 14,
        fontWeight: '400',
        color: '#282c3f',
        textAlign: 'center',
    },
    outerCircleContainer: {
        width: 88,
        height: 88,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e9ff',
        borderRadius: 100,
    },
    middleCircleContainer: {
        width: 72,
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c9c1fe',
        borderRadius: 80,
    },
    innerCircleContainer: {
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4e40b3',
        borderRadius: 60,
    },
    captureButtonContainer: {
        position: 'absolute',
        bottom: 16, // Adjust as needed
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
});

export default ProfileVerificationScreen;
