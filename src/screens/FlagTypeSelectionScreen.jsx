/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FlagTypeSelectionScreen = ({ route }) => {
    const navigation = useNavigation();
    const [greenFlagButtonPressed, setGreenFlagButtonPressed] = useState(false);
    const [redFlagButtonPressed, setRedFlagButtonPressed] = useState(false);
    const { setIsGreenFlagModalOpened, setIsRedFlagModalOpened, editing } = route?.params;

    useEffect(() => {
        if (redFlagButtonPressed === true) {
            setIsRedFlagModalOpened(true);
        }
        if (greenFlagButtonPressed === true) {
            setIsGreenFlagModalOpened(true);
        }

    }, [greenFlagButtonPressed, redFlagButtonPressed,
        setIsGreenFlagModalOpened, setIsRedFlagModalOpened]);

    const onGreenFlagButtonPressed = () => {
        setGreenFlagButtonPressed(true);
        navigation.goBack();
    };

    const onRedFlagButtonPressed = () => {
        setRedFlagButtonPressed(true);
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1 }}>
            <Image source={require('../assets/images/background-image.png')}
                style={styles.imageStyle} />
            <Ionicons name="arrow-back" size={24} color={'#ffffff'}
                onPress={() => navigation.goBack()} style={styles.backButtonStyle} />
            <Image source={require('../assets/images/user-image.png')}
                style={styles.userImageStyle} />
            {editing === true ? (
                <Text style={styles.editingTitleTextStyle}>
                    Would You Like To Modify The Red Flags And Green Flags By Selecting
                    The One That You Previously Selected?
                </Text>
            ) : (
                <>
                    <Text style={styles.titleTextStyle}>Red Flag and Green Flag</Text>
                    <Text style={[styles.descriptionTextStyle, { marginTop: normalize(300) }]}>Use flags wisely. We show them on
                        the profile so you and others can make informed decisions
                        before connecting with a new match.</Text>
                    <Text style={[styles.descriptionTextStyle, { marginTop: normalize(380) }]}>Green flag = Good :) Red flag = BAD! </Text>
                </>
            )}

            <View style={[styles.flagButtonsContainer,
            editing === true ? { marginTop: normalize(350) } : { marginTop: normalize(415) },
            ]}>
                <Pressable style={[styles.flagButtonContainer, { borderColor: '#34a853' }]}
                    onPress={() => onGreenFlagButtonPressed()}>
                    <View style={styles.flagButtonSubContainer}>
                        <Image source={require('../assets/images/green-flag.png')}
                            style={{ resizeMode: 'contain' }} />
                        <Text style={styles.textStyle}>Green Flags</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={25} color={'#cfd3d6'} />
                </Pressable>
                <Pressable style={[styles.flagButtonContainer, { borderColor: '#eb4335' }]}
                    onPress={() => onRedFlagButtonPressed()}>
                    <View style={styles.flagButtonSubContainer}>
                        <Image source={require('../assets/images/red-flag.png')}
                            style={{ resizeMode: 'contain' }} />
                        <Text style={styles.textStyle}>Red Flags</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={25} color={'#cfd3d6'} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backButtonStyle: {
        position: 'absolute',
        marginTop: '5%',
        marginLeft: 10,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    userImageStyle: {
        position: 'absolute',
        marginTop: normalize(155),
        width: 80,
        height: 80,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    editingTitleTextStyle: {
        position: 'absolute',
        marginTop: normalize(250),
        width: normalize(300),
        alignSelf: 'center',
        fontSize: 16.3,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 21,
    },
    titleTextStyle: {
        position: 'absolute',
        marginTop: normalize(255),
        marginLeft: normalize(20),
        fontSize: 23.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    flagButtonsContainer: {
        position: 'absolute',
        width: '91%',
        alignSelf: 'center',
    },
    flagButtonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginVertical: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 8,
    },
    flagButtonSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        marginLeft: 9,
        fontSize: 12.5,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    descriptionTextStyle: {
        position: 'absolute',
        marginLeft: normalize(20),
        width: normalize(320),
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 21,
    },
});

export default FlagTypeSelectionScreen;
