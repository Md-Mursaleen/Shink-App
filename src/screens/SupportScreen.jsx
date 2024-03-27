/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import { SvgXml } from 'react-native-svg';
import { emailSvgIcon } from '../data/SvgImageData';
import LinearGradient from 'react-native-linear-gradient';

const SupportScreen = () => {
    const navigation = useNavigation();

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
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
                    <Text style={styles.titleTextStyle}>Support</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={styles.contentContainer}>
                <Text style={styles.bottomTextStyle}>
                    Please mail us at
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
    contentContainer: {
        flex: 1,
        marginBottom: normalize(30),
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomTextStyle: {
        fontSize: 13.3,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    bottomSubContainer: {
        marginTop: normalize(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSubTextStyle: {
        marginLeft: normalize(10),
        fontSize: 16.5,
        fontWeight: '700',
        color: '#4e40b3',
        textAlign: 'center',
        lineHeight: 21,
    },
});

export default SupportScreen;
