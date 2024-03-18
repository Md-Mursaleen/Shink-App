/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';

const PoliticsScreen = () => {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const NEW_API = 'https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql';
            const userid = '8';
            try {
                const response = await fetch(NEW_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                    },
                    body: JSON.stringify({
                        query: `
                            query GetShinkUser($userId: String!) {
                                getShinkUser(userId: $userId) {
                                   politics
                                }
                            }
                        `,
                        variables: { userId: userid },
                    }),
                });
                const data = await response.json();
                console.log('API Response: ', data);
                if (data && data.data && data.data.getShinkUser) {
                    const user = data.data.getShinkUser;
                }
            } catch (error) {
                console.error('Error while fetching user data: ', error);
            }
            setIsLoading(false);
        };
        fetchUserData();
    }, []);

    const updatePolitics = async () => {
        const UPDATE_USER_POLITICS_MUTATION = `
          mutation UpdateUserPolitics($userId: String!, $politics: String!) {
            updateShinkUser(input: { userId: $userId, politics: $politics }) {
              userId
              politics
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
                    query: UPDATE_USER_POLITICS_MUTATION,
                    variables: { userId: '8', politics: selectedOption },
                }),
            });
            const data = await response.json();
            console.log('API Response: ', data);
            console.log('Updated User Data: ', data);
        } catch (error) {
            console.error('Error while updating user politics: ', error);
        }
    };

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    const handleNextButtonPressed = async () => {
        if (selectedOption) {
            await updatePolitics();
            console.log('Selected Option: ', selectedOption);
            console.log('Option sent to backend successfully.');
            // Logic for navigating to the next screen or performing any other action
        } else {
            setSelectedOption('Skipped');
            console.log('No option selected. Selected Option set to "Skipped".');
            // Logic for navigating to the next screen or performing any other action
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.navigationBarStyle}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>Politics</Text>
                </TouchableOpacity>
            </LinearGradient>
            <ScrollView>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionTextStyle}>What is your political prefernce?</Text>
                    <View>
                        <OptionButton label="Democratic"
                            onPress={() => setSelectedOption('democratic')}
                            selected={selectedOption === 'democratic'} />
                        <OptionButton label="Authoritarian Politics"
                            onPress={() => setSelectedOption('AuthoritarianPolitics')}
                            selected={selectedOption === 'AuthoritarianPolitics'} />
                        <OptionButton label="Pluralist Politics"
                            onPress={() => setSelectedOption('PluralistPolitics')}
                            selected={selectedOption === 'PluralistPolitics'} />
                        <OptionButton label="Totalitarian Politics"
                            onPress={() => setSelectedOption('TotalitarianPolitics')}
                            selected={selectedOption === 'TotalitarianPolitics'} />
                        <OptionButton label="Conservative Politics"
                            onPress={() => setSelectedOption('conservativePolitics')}
                            selected={selectedOption === 'conservativePolitics'} />
                        <OptionButton label="Liberal Politics"
                            onPress={() => setSelectedOption('liberalPolitics')}
                            selected={selectedOption === 'liberalPolitics'} />
                        <OptionButton label="Socialist Politics"
                            onPress={() => setSelectedOption('socialistPolitics')}
                            selected={selectedOption === 'socialistPolitics'} />
                        <OptionButton label="FeministPolitics"
                            onPress={() => setSelectedOption('feministPolitics')}
                            selected={selectedOption === 'feministPolitics'} />
                        <OptionButton label="Environmental Politics"
                            onPress={() => setSelectedOption('environmentalPolitics')}
                            selected={selectedOption === 'environmentalPolitics'} />
                    </View>
                </View>
            </ScrollView>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.nextButtonContainer}>
                <TouchableOpacity onPress={() => handleNextButtonPressed()}>
                    <Text style={styles.nextButtonTextStyle}>Next</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const OptionButton = ({ label, selected, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress()}
            style={styles.optionButtonContainer}>
            <Text style={styles.optionButtonTextStyle}>{label}</Text>
            <View style={styles.radioButtonOuterContainer}>
                {selected && <View style={styles.radioButtonInnerContainer} />}
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    navigationBarStyle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backImageStyle: {
        width: 17,
        height: 17,
        resizeMode: 'contain',
    },
    titleTextStyle: {
        marginLeft: 13,
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    questionContainer: {
        paddingHorizontal: normalize(20),
        paddingTop: normalize(15),
        height: normalize(800),
    },
    questionTextStyle: {
        marginBottom: normalize(15),
        marginLeft: normalize(5),
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
    },
    optionButtonContainer: {
        paddingVertical: normalize(12),
        paddingHorizontal: normalize(20),
        marginBottom: normalize(10),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#b3b3b3',
        borderRadius: 5,
    },
    optionButtonTextStyle: {
        fontSize: 16.5,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#282c3f',
        lineHeight: 21,
    },
    radioButtonOuterContainer: {
        width: normalize(20),
        height: normalize(20),
        marginRight: normalize(5),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#9e5594',
        borderRadius: 10,
    },
    radioButtonInnerContainer: {
        width: normalize(10),
        height: normalize(10),
        backgroundColor: '#b3b3b3',
        borderRadius: 5,
    },
    nextButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginHorizontal: '5%', // Set margin horizontally to 5% on both sides
        marginBottom: normalize(20), // Adjust margin bottom if needed
        height: normalize(48),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        zIndex: 1,
    },
    nextButtonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        textAlign: 'center',
    },
});

export default PoliticsScreen;