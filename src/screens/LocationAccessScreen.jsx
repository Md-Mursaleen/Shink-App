/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Alert,
    Image, PermissionsAndroid, KeyboardAvoidingView,
} from 'react-native';
import { normalize } from '../components/theme';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import ProgressBar from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationAccessScreen = () => {
    const navigation = useNavigation();
    const handleNextButtonPressed = async (type) => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            ]);
            if (
                granted['android.permission.ACCESS_FINE_LOCATION'] ===
                PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.ACCESS_COARSE_LOCATION'] ===
                PermissionsAndroid.RESULTS.GRANTED
            ) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log('Your Location Data: ', position);
                        AsyncStorage.setItem('location', JSON.stringify(position));
                        const location = String(position);
                        navigation.navigate('NotificationsAccess', { location: location });
                    },
                    (error) => {
                        console.log('Location Error: ', error);
                        Alert.alert('Error getting location');
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                console.log('Location permission denied');
                Alert.alert('Shink needs your location to connect you to nearby Shinkers');
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You have the access to the camera');
            } else {
                console.log('camera access denied');
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const buttonTextStyle = {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: 23.4,
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ProgressBar progress={0.25} />
            <Image source={require('../assets/images/location-image.png')}
                style={styles.imageStyle} />
            <Text style={styles.titleTextStyle}>Location?</Text>
            <Text style={styles.subTitleTextStyle}>The next pop-up - allow it. We need it to Shink you with nearby humans.</Text>
            <Text style={[styles.subTitleTextStyle, { marginTop: normalize(35) }]}>We do not share your exact location.</Text>
            <Text style={[styles.subTitleTextStyle, { marginTop: normalize(35) }]}>Safety first!</Text>
            {/* <Text style={styles.subTitleTextStyle}>
                We use your location to connect you to nearby Shinkers
            </Text> */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity onPress={() => handleNextButtonPressed()}
                    style={styles.buttonContainer}>
                    <Text style={buttonTextStyle}>Allow</Text>
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
    imageStyle: {
        marginTop: normalize(10),
        width: normalize(56),
        height: normalize(56),
        alignSelf: 'center',
    },
    titleTextStyle: {
        marginTop: normalize(30),
        marginLeft: normalize(15),
        fontSize: normalize(32),
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'left',
    },
    subTitleTextStyle: {
        marginTop: normalize(14),
        marginLeft: normalize(15),
        fontSize: normalize(14),
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#354e66',
        textAlign: 'left',
        lineHeight: 21,
    },
    bottomButtonContainer: {
        paddingHorizontal: normalize(20),
        marginBottom: normalize(8),
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
        backgroundColor: '#9d4edd',
        borderRadius: 5,
    },
});
export default LocationAccessScreen;
