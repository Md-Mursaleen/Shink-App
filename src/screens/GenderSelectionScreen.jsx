/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { genderSvg } from '../data/SvgImageData';
import { SvgXml } from 'react-native-svg';
import { normalize } from '../components/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from '../components/ProgressBar';

const GenderSelectionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { isUpdatingFromMyInfoScreen } = route.params || false;
    const [selectedOption, setSelectedOption] = useState(null);

    // Function to fetch user's gender
    const fetchUserGender = async () => {
        const GET_USER_GENDER_QUERY = `
          query GetUserGender($userId: String!) {
            getShinkUser(userId: $userId) {
              gender
            }
          }
        `;
        try {
            const response = await fetch('https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                },
                body: JSON.stringify({
                    query: GET_USER_GENDER_QUERY,
                    variables: { userId: '10' },
                }),
            });
            const data = await response.json();
            console.log('Raw API Response: ', data);
            if (data && data.data && data.data.getShinkUser !== null) {
                const userGender = data.data.getShinkUser.gender;
                setSelectedOption(userGender);
            } else {
                console.error('Invalid data format in the API response or user not found');
            }
        } catch (error) {
            console.error('Error while fetching user gender: ', error);
        }
    };

    const handleOptionButtonPressed = (option) => {
        setSelectedOption(option);
        if (option === 'Other') {
            navigation.navigate('FinalGenderSelection', {
                selectedOption: 'Other',
                isUpdatingFromMyInfoScreen: true,
            });
        }
    };

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    // Function to send updated gender to API
    const updateGender = async () => {
        const UPDATE_USER_GENDER_MUTATION = `
      mutation UpdateUserGender($userId: String!, $gender: String!) {
        updateShinkUser(input: { userId: $userId, gender: $gender }) {
          userId
          gender
        }
      }
    `;
        try {
            const response = await fetch('https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                },
                body: JSON.stringify({
                    query: UPDATE_USER_GENDER_MUTATION,
                    variables: { userId: '10', gender: selectedOption },
                }),
            });
            const data = await response.json();
            console.log('API Response: ', data);
            console.log('Updated User Data:', data);
            if (isUpdatingFromMyInfoScreen) {
                navigation.goBack(); // Navigate back to MyInfoScreen
            } else {
                AsyncStorage.setItem('gender', selectedOption);
                navigation.navigate('Sexuality', {
                    selectedOption,
                    isUpdatingFromMyInfoScreen: false,
                });
            }
        } catch (error) {
            console.error('Error while updating user gender: ', error);
        }
    };

    // Update the handleNextButtonPressed function to call updateGender
    const handleNextButtonPressed = () => {
        // if (selectedOption) {
        //     if (selectedOption === 'Other') {
        //         navigation.navigate('NextGenderSelection', { selectedOption });
        //     } else {
        //         AsyncStorage.setItem('gender', selectedOption);
        //         navigation.navigate('Sexuality', { selectedOption });
        //     }
        // }
        if (selectedOption) {
            if (selectedOption === 'Other') {
                console.log('isUpdatingFromMyInfoScreen: ', isUpdatingFromMyInfoScreen);
                navigation.navigate('FinalGenderSelection', {
                    selectedOption,
                    isUpdatingFromMyInfoScreen: false,
                });
            } else {
                updateGender();
            }
        }
    };

    const buttonTextStyle = {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: 23.4,
        opacity: selectedOption ? 1 : 0.5,
    };

    const renderOption = (option) => {
        return (
            <TouchableOpacity onPress={() => handleOptionButtonPressed(option)}
                style={styles.optionItemStyle}>
                <Text style={styles.optionItemTextStyle}>{option}</Text>
                {option === 'Other' ? (
                    <View style={{ marginLeft: 'auto' }}>
                        <Text style={{ color: '#000000' }}>{'>'}</Text>
                    </View>
                ) : (
                    <View style={styles.radioButtonContainer}>
                        <View style={styles.radioButtonSubContainer}>
                            {selectedOption === option &&
                                <View style={styles.innerCircleStyle} />}
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* <View style={styles.headerContainer}>
                <View style={styles.headerSubContainer}>
                    <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                        style={styles.previousButtonContainer}>
                        <Image source={require('../assets/images/left-arrow.png')}
                            style={styles.imageStyle} />
                    </TouchableOpacity>
                    <View style={[styles.lineStyle, { right: 0 }]} />
                </View>
            </View> */}
            <ProgressBar progress={0.45} />
            <SvgXml xml={genderSvg} style={styles.svgImageStyle} />
            <Text style={styles.titleTextStyle}>Gender?</Text>
            {renderOption('Man')}
            {renderOption('Woman')}
            {renderOption('Transgender')}
            {renderOption('Non binary')}
            {renderOption('Non-Gender Conformist')}
            {renderOption('Other')}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity onPress={() => handleNextButtonPressed()}
                    style={[styles.buttonContainer,
                    { backgroundColor: selectedOption ? '#9d4edd' : '#e0e0e0' }]}
                    disabled={!selectedOption}>
                    <Text style={buttonTextStyle}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: normalize(0),
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
    },
    headerContainer: {
        width: '100%',
        backgroundColor: '#f5f7f9',
    },
    headerSubContainer: {
        padding: normalize(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    lineStyle: {
        marginRight: 'auto',
        width: '40%',
        height: normalize(3),
        backgroundColor: '#9d4edd',
        opacity: 0.8,
    },
    imageStyle: {
        width: normalize(18),
        height: normalize(18),
        tintColor: '#000000',
    },
    previousButtonContainer: {
        padding: normalize(10),
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    buttonContainer: {
        padding: normalize(13),
        marginBottom: normalize(20),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonNextContainer: {
        marginLeft: 'auto',
        backgroundColor: 'grey',
    },
    genderSignImageStyle: {
        marginTop: normalize(70),
        marginBottom: normalize(0),
        width: normalize(42),
        height: normalize(42),
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    genderSigns: {
        marginTop: normalize(20),
        marginBottom: normalize(20),
        fontSize: 24,
        fontWeight: '400',
    },
    titleTextStyle: {
        marginTop: normalize(25),
        marginLeft: normalize(15),
        marginBottom: normalize(15),
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        lineHeight: 42,
    },
    optionItemStyle: {
        padding: normalize(12),
        marginLeft: normalize(15),
        marginVertical: normalize(6),
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#b3b3b3',
        borderRadius: 5,
    },
    optionItemTextStyle: {
        fontSize: 15,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#282c3f',
        lineHeight: 21,
    },
    radioButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    radioButtonSubContainer: {
        height: normalize(20),
        width: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'grey',
    },
    innerCircleStyle: {
        height: normalize(10),
        width: normalize(10),
        backgroundColor: 'grey',
        borderRadius: 6,
    },
    bottomButtonContainer: {
        paddingHorizontal: normalize(20),
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    svgImageStyle: {
        marginTop: normalize(15),
        alignSelf: 'center',
        resizeMode: 'contain',
    },
});

export default GenderSelectionScreen;
