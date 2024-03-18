/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Image } from 'react-native';
import { normalize } from '../components/theme';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InitialScreen() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    async function clearLocalStorage() {
        try {
            await AsyncStorage.clear();
            console.log('Local storage cleared successfully');
        } catch (error) {
            console.error('Error while clearing local storage: ', error);
        }
    }

    useEffect(() => {
        // signOut();
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            navigation.navigate('BottomTab');
        } catch (error) {
            navigation.navigate('Login');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/shink-logo.png')}
                style={styles.shinkLogoImageStyle} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    shinkLogoImageStyle: {
        width: normalize(218),
        height: normalize(218),
        alignSelf: 'center',
        resizeMode: 'contain',
    },
});
