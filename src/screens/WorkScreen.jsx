/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';

const WorkScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedWork, setSelectedWork] = useState('');

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
                                   work
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

    const updateWork = async () => {
        const UPDATE_USER_WORK_MUTATION = `
          mutation UpdateUserDrinking($userId: String!, $work: String!) {
            updateShinkUser(input: { userId: $userId, work: $work }) {
              userId
              work
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
                    query: UPDATE_USER_WORK_MUTATION,
                    variables: { userId: '8', work: selectedWork },
                }),
            });
            const data = await response.json();
            console.log('API Response: ', data);
            console.log('Updated User Data: ', data);
        } catch (error) {
            console.error('Error while updating user work: ', error);
        }
    };

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    const handleNextButtonPressed = async () => {
        if (selectedWork !== '') {
            await updateWork();
            console.log('Selected work: ', selectedWork);
            console.log('Selected work sent to backend successfully');
            // Logic for navigating to the next screen or performing any other action
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.navigationBarStyle}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>Work</Text>
                </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.subTitleTextStyle}>Add your work</Text>
            <TextInput placeholder="Designation"
                placeholderTextColor={'#979797'}
                value={selectedWork}
                onChangeText={(value) => setSelectedWork(value)}
                style={styles.textInputStyle} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    navigationBarStyle: {
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(20),
        width: '100%',
        height: normalize(55),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backImageStyle: {
        width: normalize(17),
        height: normalize(17),
        resizeMode: 'contain',
    },
    titleTextStyle: {
        marginLeft: normalize(13),
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    subTitleTextStyle: {
        marginTop: normalize(15),
        marginBottom: normalize(15),
        marginLeft: normalize(15),
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
    },
    textInputStyle: {
        paddingHorizontal: normalize(11),
        paddingVertical: normalize(10),
        marginRight: normalize(5),
        width: '90%',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 24,
        borderWidth: 1,
        borderColor: '#979797',
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

export default WorkScreen;
