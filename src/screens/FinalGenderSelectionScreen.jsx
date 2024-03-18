/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext, useEffect } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    TextInput, Image, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../contexts/AppContext';
import { normalize } from '../components/theme';

const FinalGenderSelectionScreen = ({ route }) => {
    const navigation = useNavigation();
    const { options, setOptions } = useContext(AppContext);
    const [genderInput, setGenderInput] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const { isUpdatingFromMyInfoScreen } = route.params || false;

    console.log(isUpdatingFromMyInfoScreen);

    const handleChangeButtonPressed = () => {
        setGenderInput('');
    };

    const handleSubmitButtonPressed = () => {
        // if (genderInput.trim() !== '') {
        //     setOptions([...options, genderInput]);
        //     setShowPopup(true);
        //     setGenderInput('');
        //     Keyboard.dismiss();
        //     setTimeout(() => {
        //         setShowPopup(false);
        //         setTimeout(() => {
        //             navigation.navigate('Sexuality');
        //         }, 1000);
        //     }, 3000);
        // }
        if (genderInput.trim() !== '') {
            setOptions([...options, genderInput]);
            setShowPopup(true);
            setGenderInput('');
            Keyboard.dismiss();
            setTimeout(() => {
                setShowPopup(false);
                if (isUpdatingFromMyInfoScreen) {
                    console.log('Coming from infoscreen?: ', isUpdatingFromMyInfoScreen);
                    navigation.navigate('MyInfo'); // Navigate back to MyInfoScreen
                } else {
                    setTimeout(() => {
                        navigation.navigate('Sexuality');
                    }, 1000); // Navigate to SexualityScreen
                }
            }, 4000);
        }
    };

    useEffect(() => {
        return () => {
            setTimeout(() => {
                setShowPopup(false);
            }, 1000);
        };
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.headerButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        style={styles.previousButtonContainer}>
                        <Image source={require('../assets/images/left-arrow.png')}
                            style={styles.imageStyle} />
                    </TouchableOpacity>
                    <View style={styles.lineStyle} />
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTextStyle}>Gender not listed?</Text>
                    <Text style={styles.subTextStyle}>
                        Please provide us with your gender if it’s not included,
                        and we will do our best to add it.
                    </Text>
                </View>
                <TextInput placeholder="Type your gender here"
                    value={genderInput}
                    onChangeText={(text) => setGenderInput(text)}
                    style={styles.textInputStyle} />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => handleChangeButtonPressed()}
                        style={styles.changeButtonContainer}>
                        <Text style={{ color: '#000000' }}>Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSubmitButtonPressed()}
                        style={[styles.submitButtonContainer,
                        { backgroundColor: genderInput.trim() !== '' ? '#9d4edd' : '#e0e0e0' }]}
                        disabled={genderInput.trim() === ''}>
                        <Text style={[styles.buttonTextStyle,
                        { opacity: genderInput.trim() !== '' ? 1 : 0.5 }]}>Submit</Text>
                    </TouchableOpacity>
                </View>
                {showPopup && (
                    <View style={[styles.popUpContainer,
                    { backgroundColor: '#f0e4fa' }]}>
                        <Text style={[styles.popUpTextStyle, { color: '#9d4edd' }]}>
                            Thank You For Submitting, We Will Review Your Gender soon.
                        </Text>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
    },
    imageStyle: {
        width: 18,
        height: 18,
        tintColor: '#000000',
    },
    popUpContainer: {
        position: 'absolute',
        bottom: 20,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        width: '90%',
        backgroundColor: 'green',
        borderRadius: 8,
    },
    popUpTextStyle: {
        color: '#ffffff',
        textAlign: 'center',
    },
    headerContainer: {
        marginTop: 50,
        marginBottom: 20,
        width: '100%',
        flexDirection: 'column',
    },
    headerTextStyle: {
        marginTop: normalize(30),
        marginLeft: normalize(15),
        marginBottom: normalize(15),
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        lineHeight: 42,
    },
    subTextStyle: {
        marginTop: normalize(5),
        marginBottom: 0,
        marginLeft: normalize(15),
        width: '90%',
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        textAlign: 'left',
        lineHeight: 16,
    },
    textInputStyle: {
        padding: 10,
        marginTop: 0,
        marginVertical: 5,
        marginRight: normalize(4),
        width: '90%',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
        borderWidth: 1,
        borderColor: '#979797',
        borderRadius: 5,
    },
    buttonsContainer: {
        marginTop: 10,
        marginBottom: 10,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    submitButtonContainer: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 16,
        paddingLeft: 16,
        marginLeft: 10,
        borderRadius: 5,
    },
    changeButtonContainer: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 16,
        paddingLeft: 16,
        marginLeft: 10,
        backgroundColor: 'transparent',
        borderRadius: 5,
    },
    headerButtonContainer: {
        position: 'absolute',
        padding: 5,
        top: 0,
        left: 0,
        right: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f7f9',
    },
    previousButtonContainer: {
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    lineStyle: {
        marginRight: 'auto',
        top: 18,
        width: '40%',
        height: 3,
        backgroundColor: '#9d4edd',
        opacity: 0.8,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: 23.4,
    },
});

export default FinalGenderSelectionScreen;
