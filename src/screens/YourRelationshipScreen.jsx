/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import ProgressBar from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const YourRelationshipScreen = ({ route }) => {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState(null);
    const { isUpdatingFromMyInfoScreen } = route.params || false;

    // Function to fetch user's relationship status
    const fetchUserRelationshipStatus = async () => {
        const GET_USER_RELATIONSHIPSTATUS_QUERY = `
          query GetUserRelationshipStatus($userId: String!) {
            getShinkUser(userId: $userId) {
              RelationshipStatus
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
                    query: GET_USER_RELATIONSHIPSTATUS_QUERY,
                    variables: { userId: '8' },
                }),
            });
            const data = await response.json();
            console.log('Raw API Response: ', data);
            if (data && data.data && data.data.getShinkUser !== null) {
                const userRelationshipStatus = data.data.getShinkUser.RelationshipStatus;
                setSelectedOption(userRelationshipStatus);
            } else {
                console.error('Invalid data format in the API response or user not found');
            }
        } catch (error) {
            console.error('Error while fetching user date preference gender: ', error);
        }
    };

    // Fetch user's relationship status when the component mounts
    useEffect(() => {
        fetchUserRelationshipStatus();
    }, []);

    const handleOptionButtonPressed = (option) => {
        setSelectedOption(option);
    };

    const updateRelationshipStatus = async () => {
        const UPDATE_USER_RELATIONSHIPSTATUS_MUTATION = `
            mutation UpdateUserRelationshipStatus($userId: String!, $RelationshipStatus: String!) {
                updateShinkUser(input: { userId: $userId, RelationshipStatus: $RelationshipStatus }) {
                    userId
                    RelationshipStatus
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
                    query: UPDATE_USER_RELATIONSHIPSTATUS_MUTATION,
                    variables: { userId: '8', RelationshipStatus: selectedOption },
                }),
            });
            const data = await response.json();
            console.log('API Response: ', data);
        } catch (error) {
            console.error('Error while updating user date preference gender: ', error);
        }
    };

    const handleNextButtonPressed = () => {
        if (selectedOption) {
            updateRelationshipStatus();
            AsyncStorage.setItem('relationshipStatus', selectedOption);
            if (isUpdatingFromMyInfoScreen) {
                // If updating from MyInfoScreen, navigate back to MyInfoScreen
                navigation.navigate('MyInfo');
            } else {
                // Otherwise, navigate to YourInterestScreen
                AsyncStorage.setItem('relationshipStatus', selectedOption);
                navigation.navigate('RelationshipPreference', { selectedOption });
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

    console.log(route);
    return (
        <View style={styles.container}>
            <ProgressBar progress={0.60} />
            <Text style={styles.titleTextStyle}>Status?</Text>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {renderOption('Single')}
                {renderOption('In a relationship')}
                {renderOption('Married')}
                {renderOption('Engaged')}
                {renderOption('Situationship')}
                {renderOption('Separated')}
                {renderOption('Polyamorous')}
                {renderOption('Divorced')}
                {renderOption("It's complicated")}
            </ScrollView>
            {/* <View style={styles.headerButtonContainer}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.previousButtonStyle}>
                    <Image source={require('../assets/images/left-arrow.png')}
                        style={styles.imageStyle} />
                </TouchableOpacity>
                <View style={[styles.lineStyle, { right: 0 }]} />
            </View> */}
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

    function renderOption(option) {
        return (
            <TouchableOpacity onPress={() => handleOptionButtonPressed(option)}
                style={styles.optionItemStyle}>
                <Text style={styles.optionItemTextStyle}>{option}</Text>
                <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButtonSubContainer}>
                        {selectedOption === option &&
                            <View style={styles.innerCircleStyle} />}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        paddingBottom: normalize(80),
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    headerButtonContainer: {
        position: 'absolute',
        padding: normalize(5),
        width: '100%',
        top: normalize(0),
        left: normalize(0),
        right: normalize(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f7f9',
    },
    previousButtonStyle: {
        padding: normalize(10),
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    imageStyle: {
        width: normalize(18),
        height: normalize(18),
        tintColor: '#000000',
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
    optionItemStyle: {
        padding: normalize(12),
        // marginLeft: normalize(15),
        marginVertical: normalize(6),
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#b3b3b3',
        borderRadius: 5,
    },
    radioButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    radioButtonSubContainer: {
        marginRight: normalize(10),
        width: normalize(20),
        height: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 12,

    },
    innerCircleStyle: {
        height: normalize(12),
        width: normalize(12),
        backgroundColor: 'grey',
        borderRadius: 6,
    },
    lineStyle: {
        top: normalize(18),
        marginRight: 'auto',
        width: '40%',
        height: normalize(3),
        backgroundColor: '#9d4edd',
        opacity: 0.8,
    },
    optionItemTextStyle: {
        fontSize: 15,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#282c3f',
        lineHeight: 21,
    },
});

export default YourRelationshipScreen;
