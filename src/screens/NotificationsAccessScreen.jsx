/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    Image, PermissionsAndroid, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import ProgressBar from '../components/ProgressBar';

const NotificationsAccessScreen = () => {
    const navigation = useNavigation();

    const handleAllowButtonPressed = async () => {
        if (Platform.OS === 'android') {
            // try {
            //     await PermissionsAndroid.request(
            //         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            //     );
            navigation.navigate('Likes');
            // } catch (error) {
            //     console.log(error);
            // }
        }
    };

    const buttonTextStyle = {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 23.4,
    };

    return (
        <View style={styles.container}>
            <ProgressBar progress={0.30} navigation={navigation} />
            <Image source={require('../assets/images/notifications-image.png')}
                style={styles.imageStyle} />
            <Text style={styles.titleTextStyle}>Notifications</Text>
            <Text style={styles.subTitleTextStyle}>
                Allow this, you must. We only notify when something special is afoot.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Likes')}
                style={[styles.buttonContainer, { backgroundColor: '#ffffff' }]}>
                <Text style={[buttonTextStyle, { color: '#282C3F' }]}>Not Now</Text>
            </TouchableOpacity>
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity onPress={() => handleAllowButtonPressed()}
                    style={[styles.buttonContainer, { backgroundColor: '#9d4edd' }]}>
                    <Text style={[buttonTextStyle, { color: '#ffffff' }]}>Allow</Text>
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
    imageStyle: {
        marginTop: normalize(10),
        width: normalize(56),
        height: normalize(56),
        alignSelf: 'center',
    },
    titleTextStyle: {
        marginTop: normalize(35),
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
        width: normalize(320),
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#354e66',
        textAlign: 'left',
        lineHeight: 21,
    },
    bottomButtonContainer: {
        paddingHorizontal: normalize(20),
        marginBottom: normalize(13),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        padding: normalize(13),
        marginTop: 'auto',
        marginBottom: normalize(15),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
});

export default NotificationsAccessScreen;
