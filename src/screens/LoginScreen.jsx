/* eslint-disable prettier/prettier */
/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import { getCurrentUser, signInWithRedirect, signOut } from 'aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [customState, setCustomState] = useState(null);

    useEffect(() => {
        const unsubscribe = Hub.listen('auth', ({ payload }) => {
            switch (payload.event) {
                case 'signInWithRedirect':
                    getCurrUser();
                    break;
                case 'signInWithRedirect_failure':
                    setError('An error has ocurred during the OAuth flow.');
                    break;
                case 'customOAuthState':
                    setCustomState(payload.data); // this is the customState provided on signInWithRedirect function
                    break;
            }
        });
        getCurrUser();
        return unsubscribe;
    }, []);

    const getUserStatus = async (userId) => {
        let queryParams = new URLSearchParams({
            query: `
                query GetShinkUser($userId: String!) {
                    getShinkUser(userId: $userId ) {
                        userId
                    }
                }
            `,
            variables: JSON.stringify({
                userId: userId,
            }),
        });
        try {
            // Make a GET request to retrieve user status
            const response = await fetch(`https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                },
            });
            if (response.ok) {
                console.log('User status retrieved successfully');
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to retrieve user status. Status: ', response.status);
                const errorMessage = await response.text();
                console.error('Error Message: ', errorMessage);
            }
        } catch (error) {
            console.error('Error while retrieving user status: ', error);
        }
    };

    const getCurrUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            AsyncStorage.setItem('userId', currentUser.userId);
            const userStatus = getUserStatus(currentUser.userId);
            userStatus && userStatus.then((data) => {
                if (data.data.getShinkUser === null) {
                    navigation.navigate('EnterPhoneNumber');
                } else {
                    navigation.navigate('BottomTab');
                }
            });
        } catch (error) {
            console.log('Not signed in');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/shink-logo.png')}
                style={styles.shinkLogoImageStyle} />
            <Text style={styles.titleTextStyle}>Date Safe</Text>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Tap Continue to receive an SMS confirmation to assist you with Juber.
                    We require your mobile number for verification.
                </Text>
            </View>
            <View style={styles.SignInOptionsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('EnterPhoneNumber')}
                    style={styles.SignInOptionContainer}>
                    <Image source={require('../assets/phone-logo.png')}
                        style={styles.SignInLogoImageStyle} />
                    <Text style={styles.SignInOptionTextStyle}>Sign in with Phone Number</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => signInWithRedirect({
                    provider: 'Google',
                })}
                    style={styles.SignInOptionContainer}>
                    <Image source={require('../assets/google-logo.png')}
                        style={styles.SignInLogoImageStyle} />
                    <Text style={styles.SignInOptionTextStyle}>Sign in with Google</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.SignInOptionContainer}
                    onPress={() => signInWithRedirect({
                        provider: 'Facebook',
                    })}>
                    <Image source={require('../assets/facebook-logo.png')}
                        style={styles.SignInLogoImageStyle} />
                    <Text style={styles.SignInOptionTextStyle}>Sign in with Facebook</Text>
                </TouchableOpacity> */}
            </View>
            <View style={styles.bottomTextContainer}>
                <Text style={styles.bottomTextStyle}>
                    By choosing “Sign In” or “Create Account” you agree to our {''}
                    <Text style={styles.subTextStyle}>Terms of Service</Text>.
                    Learn about how we handle your data in our {''}
                    <Text style={styles.subBottomTextStyle}>Privacy Policy</Text> and {''}
                    <Text style={styles.subBottomTextStyle}>Cookies Policy</Text>.
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    shinkLogoImageStyle: {
        marginTop: normalize(60),
        width: normalize(218),
        height: normalize(218),
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    titleTextStyle: {
        marginTop: normalize(30),
        fontSize: normalize(28),
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#7b337e',
        textAlign: 'center',
        lineHeight: 40,
    },
    SignInOptionsContainer: {
        // marginTop: normalize(70),
        width: '100%',
        alignItems: 'center',
    },
    SignInOptionContainer: {
        paddingVertical: normalize(12),
        paddingHorizontal: 16,
        marginTop: normalize(12),
        width: normalize(340),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eef1f8',
        borderRadius: normalize(5),
    },
    SignInLogoImageStyle: {
        marginRight: normalize(12.5),
        width: normalize(22),
        height: normalize(22),
    },
    SignInOptionTextStyle: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#757575',
        lineHeight: 22,
    },
    bottomTextContainer: {
        marginTop: normalize(15),
        marginBottom: normalize(35),
        marginRight: 15,
        alignSelf: 'center',
    },
    bottomTextStyle: {
        width: normalize(320),
        fontSize: normalize(12),
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#959595',
        textAlign: 'justify',
        lineHeight: 18,
    },
    subBottomTextStyle: {
        fontSize: normalize(12),
        fontWeight: '500',
        fontFamily: 'AvenirNext-Bold',
        color: '#59a0ff',
        textDecorationLine: 'underline',
        lineHeight: 18,
        overflow: 'hidden',
    },
    textContainer: {
        marginTop: 'auto',
        marginRight: 15,
        alignSelf: 'center',
    },
    textStyle: {
        width: normalize(320),
        fontSize: normalize(14),
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        textAlign: 'justify',
        lineHeight: 21,
    },
});

export default LoginScreen;
