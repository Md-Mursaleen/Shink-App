/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { normalize } from '../components/theme';
import { SvgXml } from 'react-native-svg';
import { notifySvgImage } from '../data/SvgImageData';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox'; // Import CheckBox from @react-native-community/checkbox

const EditBirthDateScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { success } = route.params || {};
    const [selectedOption, setSelectedOption] = useState(null);
    const [isChecked, setIsChecked] = useState(false); // State for the CheckBox
    const [buttonColor, setButtonColor] = useState('#e0e0e0'); // State for button color
    const { isUpdatingFromMyInfoScreen } = route.params || false;
    const [isLoading, setIsLoading] = useState(true);
    const [birthDate, setBirthDate] = useState(null); // State to store birth date from backend
    const [presentAge, setPresentAge] = useState(null);
    const [birthdayAgreementFlag, setBirthdayAgreementFlag] = useState(false); // Flag to track agreement


    useEffect(() => {
        // Update button color based on navigation bar gradient colors
        setButtonColor('#c680b2');
    }, []);

    useEffect(() => {
        console.log('Success value received:', success);
    }, [success]);

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
                                    birthDate
                                    name
                                    userId
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
                    setBirthDate(user.birthDate); // Set birth date from backend response
                    calculateAge(user.birthDate); // Calculate present age
                    console.log('Birth Date: ', user.birthDate); // Log out the birth date
                    console.log('Present Age: ', presentAge); // Log out the calculated present age
                }
            } catch (error) {
                console.error('Error while fetching user data: ', error);
            }
            setIsLoading(false);
        };
        fetchUserData();
    }, []);

    // Function to calculate present age based on birth date
    const calculateAge = (birthdate) => {
        if (birthdate) {
            const birthDateObj = new Date(birthdate);
            const today = new Date();
            const age = today.getFullYear() - birthDateObj.getFullYear();
            const month = today.getMonth() - birthDateObj.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
                setPresentAge(age - 1);
            } else {
                setPresentAge(age);
            }
        } else {
            setPresentAge(null); // If birth date is not provided, set present age to null
        }
    };

    const handleOptionButtonPressed = (option) => {
        setSelectedOption(option);
        if (option === 'Other') {
            navigation.navigate('FinalGenderSelection', {
                selectedOption: 'Other',
                isUpdatingFromMyInfoScreen: true
            });
        }
    };

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    const handleCheckboxChange = (newValue) => {
        setIsChecked(newValue);
        setButtonColor(newValue ? '#c680b2' : '#e0e0e0');
        // Set the flag to true when the checkbox is checked
        if (newValue) {
            // Set the flag to true
            setBirthdayAgreementFlag(true);
            console.log('BIRTHDAY_AGREEMENT_FLAG set to true');
        }
    };

    const handleNextButtonPressed = () => {
        navigation.navigate('EditBirthDateNext');
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
                    <Text style={styles.titleTextStyle}>Birthday?</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={styles.infoContainer}>
                {/* <Text style={styles.birthDateTitleTextStyle}>24 Years</Text>
                <Text style={styles.birthDateSubTitleTextStyle}>23 June 2002</Text> */}
                {birthDate ? (
                    <>
                        <Text style={styles.birthDateTitleTextStyle}>{presentAge ? `${presentAge} Years` : ''}</Text>
                        <Text style={styles.birthDateSubTitleTextStyle}>{birthDate}</Text>
                    </>
                ) : (
                    <Text style={styles.birthDateSubTitleTextStyle}>Date of Birth not received from Backend</Text>
                )}
            </View>
            {/* Conditional rendering based on success */}
            {success ? (
                <View style={styles.confirmationContentContainer}>
                    <View style={styles.confirmationTextContainer}>
                        <Text style={{ textAlign: 'center' }}>Thank you for Submitting.</Text>{'\n'}
                        <Text style={{ textAlign: 'center' }}>We'll look into it soon.</Text>
                    </View>
                </View>
            ) : (
                <>
                    <View style={styles.checkboxContainer}>
                        <CheckBox disabled={false}
                            value={isChecked}
                            onValueChange={(newValue) => {
                                setIsChecked(newValue);
                                setButtonColor(newValue ? '#c680b2' : '#e0e0e0'); // Update button color based on checkbox state
                            }}
                            tintColors={{ true: '#c680b2', false: '#7b337e' }} />
                        <Text style={styles.checkboxTextStyle}>
                            In order to change your date of birth, you will first have to verify your date of birth through the Government ID. We do not sell your document to any third party. Please verify if you wish to modify your date of birth in accordance with your government identification number.
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditions')}
                        style={styles.termsContainer}>
                        <Text style={styles.termsTextStyle}>Read our Terms & Conditions</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomButtonContainer}>
                        <TouchableOpacity onPress={() => handleNextButtonPressed()}
                            disabled={!selectedOption && !isChecked}>
                            <LinearGradient start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#c680b2', '#9e5594', '#7b337e']}
                                style={[
                                    styles.buttonContainer,
                                    {
                                        backgroundColor: selectedOption || isChecked ? buttonColor : '#e0e0e0',
                                        width: '100%', // Set button width to 100%
                                        borderRadius: 10, // Add border radius of 10
                                        opacity: isChecked ? 1 : 0.5, // Adjust opacity based on checkbox state
                                    }
                                ]}>
                                <Text style={styles.buttonTextStyle}>Verify Your Identity By Email</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            {/* Notify text */}
            {success && (
                <View style={styles.notifyContainer}>
                    <View style={styles.notifySubContainer}>
                        <SvgXml xml={notifySvgImage}
                            width={normalize(20)} height={normalize(21)} />
                        <Text style={styles.notifyTextStyle}>We Will Notify You Soon</Text>
                    </View>
                </View>

            )}
        </View>
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
    bottomButtonContainer: {
        paddingHorizontal: 20,
        marginTop: 'auto',
        width: '100%',
        flexDirection: 'column',
    },
    buttonContainer: {
        padding: normalize(13),
        marginBottom: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 23.4,
    },
    infoContainer: {
        paddingVertical: 16,
        paddingHorizontal: 0,
        marginTop: '8%', // Adjust top margin as needed
        width: 328,
        height: 96,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 12,
        gap: 11,
    },
    birthDateTitleTextStyle: {
        fontSize: 23,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        textAlign: 'center',
        lineHeight: 32,
    },
    birthDateSubTitleTextStyle: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        textAlign: 'center',
        lineHeight: 21,
    },
    checkboxContainer: {
        padding: 6,
        marginTop: '80%',
        marginHorizontal: 20,
        flexDirection: 'row',
    },
    checkboxTextStyle: {
        width: normalize(300),
        fontSize: 13.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 21,
    },
    termsContainer: {
        marginTop: normalize(10),
        alignItems: 'center',
    },
    termsTextStyle: {
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#0e88e9',
        textDecorationLine: 'underline',
    },
    notifyContainer: {
        padding: normalize(20),
        paddingTop: normalize(12),
        paddingBottom: normalize(12),
        paddingLeft: normalize(16),
        paddingRight: normalize(16),
        marginTop: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 10,
    },
    notifySubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(8),
    },
    notifyTextStyle: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
    },
    confirmationContentContainer: {
        padding: normalize(20),
        paddingTop: normalize(12),
        paddingBottom: normalize(12),
        paddingLeft: normalize(16),
        paddingRight: normalize(16),
        marginTop: '50%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0e4fa', // Light purple
        borderRadius: 10,
    },
    confirmationTextContainer: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#9d4edd', // Purple
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default EditBirthDateScreen;
