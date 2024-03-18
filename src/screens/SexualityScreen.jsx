/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import ProgressBar from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SexualityScreen = ({ route }) => {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState(null);
    const { isUpdatingFromMyInfoScreen } = route.params || false;

    // Function to fetch user's sexuality
    const fetchUserSexuality = async () => {
        const GET_USER_SEXUALITY_QUERY = `
          query GetUserSexuality($userId: String!) {
            getShinkUser(userId: $userId) {
              sexuality
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
                    query: GET_USER_SEXUALITY_QUERY,
                    variables: { userId: '10' },
                }),
            });
            const data = await response.json();
            console.log('Raw API Response: ', data);
            if (data && data.data && data.data.getShinkUser !== null) {
                const userSexuality = data.data.getShinkUser.sexuality;
                setSelectedOption(userSexuality);
            } else {
                console.error('Invalid data format in the API response or user not found');
            }
        } catch (error) {
            console.error('Error while fetching user sexuality: ', error);
        }
    };

    // Fetch user's sexuality when the component mounts
    useEffect(() => {
        fetchUserSexuality();
    }, []);

    // Function to send updated sexuality to API
    const updateSexuality = async () => {
        const UPDATE_USER_SEXUALITY_MUTATION = `
          mutation UpdateUserSexuality($userId: String!, $sexuality: String!) {
            updateShinkUser(input: { userId: $userId, sexuality: $sexuality }) {
              userId
              sexuality
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
                    query: UPDATE_USER_SEXUALITY_MUTATION,
                    variables: { userId: '10', sexuality: selectedOption },
                }),
            });
            const data = await response.json();
            console.log('API Response: ', data);
            if (isUpdatingFromMyInfoScreen) {
                navigation.navigate('MyInfo');
            } else {
                navigation.navigate('DatePreference');
            }
        } catch (error) {
            console.error('Error while updating user sexuality: ', error);
        }
    };

    const handleOptionButtonPressed = (option) => {
        setSelectedOption(option);
    };

    const handleNextButtonPressed = () => {
        if (selectedOption) {
            // Call the function to update sexuality
            updateSexuality();
            AsyncStorage.setItem('sexuality', selectedOption);
            // Navigate based on the existing logic
            if (isUpdatingFromMyInfoScreen) {
                // If updating from MyInfoScreen, navigate back to MyInfoScreen
                navigation.navigate('MyInfo');
            } else {
                // Otherwise, navigate to DatePreference
                AsyncStorage.setItem('sexuality', selectedOption);
                navigation.navigate('DatePreference');
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
            <ProgressBar progress={0.50} />
            <Text style={styles.titleTextStyle}>Sexuality?</Text>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {renderOption('Heterosexual')}
                {renderOption('Homosexual')}
                {renderOption('Pansexual')}
            </ScrollView>
            {/* <View style={styles.headerButtonContainer}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.previousButtonContainer}>
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
        padding: normalize(0),
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        paddingBottom: normalize(80), // Adjust as needed
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleTextStyle: {
        marginTop: normalize(25),
        marginLeft: normalize(16),
        marginBottom: normalize(15),
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        lineHeight: 42,
    },
    headerButtonContainer: {
        position: 'absolute',
        padding: normalize(5),
        top: normalize(0),
        left: normalize(0),
        right: normalize(20),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f7f9',
    },
    previousButtonContainer: {
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
        padding: normalize(12),
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
        height: normalize(10),
        width: normalize(10),
        backgroundColor: 'grey',
        borderRadius: 6,
    },
    lineStyle: {
        marginRight: 'auto',
        top: normalize(18),
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

export default SexualityScreen;
