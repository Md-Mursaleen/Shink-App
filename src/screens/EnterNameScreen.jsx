/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import ProgressBar from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EnterNameScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');

    const handleNextButtonPressed = () => {
        AsyncStorage.setItem('name', name);
        navigation.navigate('EnterBirthday');
    };

    const buttonTextStyle = {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: 23.4,
        opacity: name !== '' ? 1 : 0.5,
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ProgressBar progress={0.15} />
            <Text style={styles.titleTextStyle}>Name?</Text>
            <TextInput underlineColorAndroid="transparent"
                placeholder="Name"
                placeholderTextColor={'#979797'}
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.textInputStyle} />
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity onPress={() => handleNextButtonPressed()}
                    style={[styles.buttonContainer,
                    { backgroundColor: name ? '#9d4edd' : '#e0e0e0' }]}
                    disabled={!name}>
                    <Text style={buttonTextStyle}>Next</Text>
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
    titleTextStyle: {
        marginTop: normalize(30),
        marginLeft: normalize(15),
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
    },
    textInputStyle: {
        paddingHorizontal: normalize(11),
        paddingVertical: normalize(11),
        marginTop: normalize(23),
        marginRight: normalize(5),
        width: '90%',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 24,
        borderWidth: 1.5,
        borderColor: '#979797',
        borderRadius: 5,
    },
    bottomButtonContainer: {
        paddingHorizontal: normalize(20),
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
        borderRadius: 5,
    },
});

export default EnterNameScreen;
