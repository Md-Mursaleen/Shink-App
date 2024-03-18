/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import { SvgXml } from 'react-native-svg';
import { emailSvgIcon } from '../data/SvgImageData';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsNameScreen = () => {
    const navigation = useNavigation();
    const userId = AsyncStorage.getItem('userId');
    const name = AsyncStorage.getItem('name');

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.navigationBarStyle}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>Name</Text>
                </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.textStyle}>User ID</Text>
            <View style={styles.userIdContainer}>
                <Text style={styles.userIdTextStyle}>abcdefghijklmnopqrstuvwxyz</Text>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.nameTextStyle}>Sana</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.bottomTextStyle}>
                    Kindly forward your name and user ID to this email address
                    if you wish to modify your name.
                </Text>
                <View style={styles.bottomSubContainer}>
                    <SvgXml xml={emailSvgIcon} />
                    <Text style={styles.bottomSubTextStyle}>Support@shink.app</Text>
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
        height: normalize(50),
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
    userIdContainer: {
        paddingHorizontal: normalize(16),
        paddingVertical: normalize(12),
        marginLeft: normalize(15),
        width: normalize(330),
        height: normalize(50),
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        borderColor: '#cfd3d6',
        borderWidth: 1,
        borderRadius: 8,
        gap: 12,
    },
    userIdTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#979797',
        lineHeight: 16,
    },
    nameContainer: {
        paddingVertical: normalize(16),
        marginLeft: normalize(15),
        marginTop: normalize(18),
        width: normalize(330),
        height: normalize(64),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderColor: '#cfd3d6',
        borderWidth: 1,
        borderRadius: 12,
        gap: 11,
    },
    nameTextStyle: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 32,
    },
    bottomContainer: {
        padding: normalize(15),
        marginTop: 'auto',
        marginBottom: normalize(6),
        borderTopWidth: 1,
        borderTopColor: '#cfd3d6',
    },
    bottomTextStyle: {
        marginLeft: normalize(5),
        width: normalize(315),
        fontSize: 13.3,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    bottomSubContainer: {
        marginTop: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSubTextStyle: {
        marginLeft: normalize(10),
        fontSize: 17,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        textAlign: 'center',
        lineHeight: 21,
    },
});

export default SettingsNameScreen;
