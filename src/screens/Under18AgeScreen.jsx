/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { normalize } from '../components/theme';
import { useNavigation } from '@react-navigation/native';

const Under18AgeScreen = () => {
    const navigation = useNavigation();

    const handleSignout = () => {
        navigation.navigate('Login');
    };

    const buttonTextStyle = {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: 23.4,
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image source={require('../assets/images/18-plus-icon.png')}
                style={styles.iconStyle} />
            <View style={styles.contentContainer}>
                <Text style={styles.titleTextStyle}>Only over 18 years old</Text>
                <Text style={styles.subTitleTextStyle}>
                    Shink is intended for individuals who are 18 years of age or older. We
                    sincerely hope to have the opportunity to meet you when you turn 18.
                </Text>
                <Text style={styles.termsTextStyle}>
                    Read our terms and services
                </Text>
            </View>
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity onPress={() => handleSignout()}
                    style={styles.buttonContainer}>
                    <Text style={buttonTextStyle}>Log out</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: normalize(60),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
    },
    iconStyle: {
        bottom: normalize(10),
        width: 58,
        height: 58,
        resizeMode: 'contain',
    },
    contentContainer: {
        paddingHorizontal: normalize(15),
        alignItems: 'flex-start',
    },
    titleTextStyle: {
        marginTop: normalize(10),
        width: 320,
        fontSize: normalize(32),
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'left',
    },
    subTitleTextStyle: {
        marginTop: normalize(23),
        fontSize: normalize(14),
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        textAlign: 'left',
        lineHeight: 21,
    },
    termsTextStyle: {
        marginTop: normalize(32),
        alignSelf: 'center',
        fontSize: normalize(14),
        fontFamily: 'AvenirNext-Regular',
        color: '#0e88e9',
        textDecorationLine: 'underline',
        lineHeight: 21,
    },
    bottomButtonContainer: {
        paddingHorizontal: 20,
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        padding: 13,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9d4edd',
        borderRadius: 5,
    },
});
export default Under18AgeScreen;
